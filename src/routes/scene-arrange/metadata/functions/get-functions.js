const { getDBCollection } = require("./db-config");

const getFunctions = async (req, res, next) => {
  try {
    const dbCollection = await getDBCollection();

    const { functionKey } = req.query;

    const filter = { yn: 1 };
    if (functionKey) {
      filter.functionKey = functionKey;
    }

    const cursor = dbCollection.find(filter, {
      functionKey: 1,
      functionName: 1,
      functionDescription: 1,
      functionParameters: 1,
      createTime: 1,
      updateTime: 1,
    });
    const functions = await cursor.toArray();
    res.json(functions);
  } catch (error) {
    console.error("Error getting functions:", error);
    next(error);
  }
};

module.exports = getFunctions;
