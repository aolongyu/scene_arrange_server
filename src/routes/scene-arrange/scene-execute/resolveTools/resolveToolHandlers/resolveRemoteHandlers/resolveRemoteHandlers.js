/**
 * 解析远程工具处理函数
 */

const {
  resolveApiRemoteHandlers,
} = require("./resolveApiRemoteHandlers/resolveApiRemoteHandlers");
const {
  resolveModuleFileRemoteHandlers,
} = require("./resolveModuleFileRemoteHandlers/resolveModuleFileRemoteHandlers");
const {
  resolveMcpToolRemoteHandlers,
} = require("./resolveMcpToolRemoteHandlers/resolveMcpToolRemoteHandlers");

const REMOTE_HANDLER_TYPE = {
  API: "function-remote-api",
  MODULE_FILE: "function-remote-modulefile",
  MCP_TOOL: "function-remote-mcptool",
};

const splitToolsByType = (tools = [], type) => {
  return tools.filter((tool) => tool.type.startsWith(type));
};

const resolveRemoteHandlers = async (toolRemoteBaseInfos = []) => {
  try {
    const Resolver = {
      [REMOTE_HANDLER_TYPE.API]: resolveApiRemoteHandlers,
      [REMOTE_HANDLER_TYPE.MODULE_FILE]: resolveModuleFileRemoteHandlers,
      [REMOTE_HANDLER_TYPE.MCP_TOOL]: resolveMcpToolRemoteHandlers,
    };

    const resolver = (type) => {
      if (!Resolver[type]) {
        throw new Error(`Resolver not found for type: ${type}`);
      }
      return Resolver[type].call(
        null,
        splitToolsByType(toolRemoteBaseInfos, type)
      );
    };

    return [
      ...(await resolver(REMOTE_HANDLER_TYPE.API)),
      ...(await resolver(REMOTE_HANDLER_TYPE.MODULE_FILE)),
      ...(await resolver(REMOTE_HANDLER_TYPE.MCP_TOOL)),
    ];
  } catch (error) {
    console.error("Error resolving remote handlers:", error);
    throw error;
  }
};

module.exports = {
  resolveRemoteHandlers,
};
