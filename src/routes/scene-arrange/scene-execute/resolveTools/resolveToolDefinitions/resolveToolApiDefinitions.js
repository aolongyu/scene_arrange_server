const resolveToolApiDefinitions = async (toolBaseInfos = []) => {
  try {
    return [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  resolveToolApiDefinitions,
};
