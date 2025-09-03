const {
  resolveToolFunctionDefinitions,
} = require("./resolveToolFunctionDefinitions");
const { resolveToolApiDefinitions } = require("./resolveToolApiDefinitions");

const TOOL_TYPE = {
  FUNCTION: "function",
  API: "api",
};

const splitToolsByType = (tools = [], type) => {
  return tools.filter((tool) => tool.type === type);
};

const resolveToolDefinitions = async (toolBaseInfos = []) => {
  try {
    const Resolver = {
      [TOOL_TYPE.FUNCTION]: resolveToolFunctionDefinitions,
      [TOOL_TYPE.API]: resolveToolApiDefinitions,
    };

    const resolver = (type) => {
      if (!Resolver[type]) {
        throw new Error(`Resolver not found for type: ${type}`);
      }
      return Resolver[type].call(null, splitToolsByType(toolBaseInfos, type));
    };

    return [
      ...(await resolver(TOOL_TYPE.FUNCTION)),
      ...(await resolver(TOOL_TYPE.API)),
    ];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  resolveToolDefinitions,
};
