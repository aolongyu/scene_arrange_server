const resolveToolFunctionDefinitions = async (toolBaseInfos = []) => {
  try {
    return toolBaseInfos.map((def) => ({
      type: "function",
      function: {
        name: def.function.name,
        description: def.function.description,
        parameters: def.function.parameters,
      },
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  resolveToolFunctionDefinitions,
};
