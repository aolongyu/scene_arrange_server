const {
  resolveDefinitions: resolveFunctionDefinitions,
} = require("./resolveFuncton");
const { resolveDefinitions: resolveApiDefinitions } = require("./resolveApi");

const TOOL_TYPE = {
  FUNCTION: "function",
  API: "api",
};

const getToolsByType = (tools = [], type) => {
  return tools.filter((tool) => tool.type === type);
};

const getToolDefinitions = async (tools = []) => {
  const Resolver = {
    [TOOL_TYPE.FUNCTION]: resolveFunctionDefinitions,
    [TOOL_TYPE.API]: resolveApiDefinitions,
  };

  const resolver = (type) => {
    if (!Resolver[type]) {
      throw new Error(`Resolver not found for type: ${type}`);
    }
    return Resolver[type].call(null, getToolsByType(tools, type));
  };

  return [
    ...(await resolver(TOOL_TYPE.FUNCTION)),
    ...(await resolver(TOOL_TYPE.API)),
  ];
};

const getToolHandlers = async (toolDefinitions = {}) => {
  return toolDefinitions.map((tool) => tool.handler);
};

module.exports = {
  getToolDefinitions,
  getToolHandlers,
};
