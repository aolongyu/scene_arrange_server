const {
  resolveLocalHandlers,
} = require("./resolveLocalHandlers/resolveLocalHandlers");
const {
  resolveRemoteHandlers,
} = require("./resolveRemoteHandlers/resolveRemoteHandlers");

const HANDLER_TYPE = {
  LOCAL: "function-local",
  REMOTE: "function-remote",
};

const splitToolsByType = (tools = [], type) => {
  return tools.filter((tool) => tool.type.startsWith(type));
};

// 解析工具处理器
const resolveToolHandlers = async (toolBaseInfos = []) => {
  try {
    const Resolver = {
      [HANDLER_TYPE.LOCAL]: resolveLocalHandlers,
      [HANDLER_TYPE.REMOTE]: resolveRemoteHandlers,
    };

    const resolver = (type) => {
      if (!Resolver[type]) {
        throw new Error(`Resolver not found for type: ${type}`);
      }
      return Resolver[type].call(null, splitToolsByType(toolBaseInfos, type));
    };

    return [
      ...(await resolver(HANDLER_TYPE.LOCAL)),
      ...(await resolver(HANDLER_TYPE.REMOTE)),
    ];
  } catch (error) {
    console.error("Error resolving tool handlers:", error);
    throw error;
  }
};

module.exports = {
  resolveToolHandlers,
};
