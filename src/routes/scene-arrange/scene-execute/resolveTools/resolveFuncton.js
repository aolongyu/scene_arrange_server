const { getDBCollection } = require("../../metadata/functions/db-config");

const getToolDefinition = async (tool) => {
  const dbCollection = await getDBCollection();
  const toolDefinition = await dbCollection.findOne({
    functionKey: tool.key,
  });
  return toolDefinition;
};

const resolveDefinitions = async (tools = []) => {
  const toolPromises = tools.map((tool) => getToolDefinition(tool));
  const toolDefinitions = await Promise.all(toolPromises);
  return toolDefinitions.map((def) => ({
    type: "function",
    function: {
      name: def.functionName,
      description: def.functionDescription,
      parameters: def.functionParameters,
    },
  }));
};

module.exports = {
  resolveDefinitions,
};
