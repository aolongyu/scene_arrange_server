const { v4 } = require("uuid");
const { getDBCollection } = require("./db-config");

const setScene = async (req, res, next) => {
  try {
    const { sceneName, sceneDescription, sceneFunctions } = req.body;

    const dbCollection = await getDBCollection();
    const result = await dbCollection.insertOne({
      sceneKey: `scene-${v4().slice(0, 8)}`,
      sceneName,
      sceneDescription,
      sceneFunctions: JSON.stringify(sceneFunctions),
      yn: 1,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
    });

    res.json(result);
  } catch (error) {
    console.error("Error setting scene:", error);
    next(error);
  }
};

module.exports = setScene;
