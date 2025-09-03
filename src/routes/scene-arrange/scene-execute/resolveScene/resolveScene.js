const { getScenes } = require("../../metadata/scenes/get-scenes-logic");

const resolveScene = async (sceneKey) => {
  try {
    if (!sceneKey) {
      throw new Error("Scene key is required");
    }

    const sceneData = await getScenes(sceneKey);
    return sceneData;
  } catch (error) {
    console.error("Error getting scene data:", error);
    throw error;
  }
};

module.exports = {
  resolveScene,
};
