const { v4 } = require("uuid");
const { getDBCollection } = require("./db-config");

const setFunction = async (req, res, next) => {
  try {
    const { functionName, functionDescription, functionParameters } = req.body;

    const dbCollection = await getDBCollection();
    const result = await dbCollection.insertOne({
      functionKey: `function-${v4().slice(0, 8)}`,
      functionName,
      functionDescription,
      functionParameters,
      yn: 1,
      createTime: new Date().toISOString(),
      updateTime: new Date().toISOString(),
    });

    res.json(result);
  } catch (error) {
    console.error("Error setting function:", error);
    next(error);
  }
};

module.exports = setFunction;
