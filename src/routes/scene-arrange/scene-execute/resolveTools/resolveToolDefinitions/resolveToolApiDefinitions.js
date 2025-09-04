const resolveToolApiDefinitions = async (toolInfos = []) => {
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
