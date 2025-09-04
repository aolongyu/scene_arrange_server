const resolveToolFunctionDefinitions = async (toolInfos = []) => {
  try {
    return toolInfos.map((info) => ({
      type: "function",
      function: {
        name: info.function.name,
        description: info.function.description,
        parameters: info.function.parameters,
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
