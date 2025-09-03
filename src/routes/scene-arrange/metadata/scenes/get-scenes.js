const { getScenes: getSceneData } = require("./get-scenes-logic");

const getScenes = async (req, res, next) => {
  try {
    const { sceneKey } = req.query;
    const sceneData = await getSceneData(sceneKey);
    res.json(sceneData);
  } catch (error) {
    console.error("Error getting scenes:", error);
    next(error);
  }
};

module.exports = getScenes;
