const { getDBCollection } = require("./db-config");

const getScenes = async (sceneKey) => {
  try {
    const dbCollection = await getDBCollection();

    const filter = { yn: 1 };
    if (sceneKey) {
      filter.sceneKey = sceneKey;
    }

    const cursor = dbCollection.find(filter, {
      sceneKey: 1,
      sceneName: 1,
      sceneDescription: 1,
      sceneFunctions: 1,
      createTime: 1,
      updateTime: 1,
    });
    const sceneData = await cursor.toArray();
    return sceneData;
  } catch (error) {
    console.error("Error getting scene data:", error);
    throw error;
  }
};

module.exports = {
  getScenes,
};
