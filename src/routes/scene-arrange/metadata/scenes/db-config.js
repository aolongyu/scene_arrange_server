const DataBaseClient = require("../../../../utils/db");

const DB_NAME = "scene-arrange";
const DB_COLLECTION = "scene-arrange-metadata-scenes";

const getDBCollection = async () => {
  const dbc = new DataBaseClient();
  await dbc.connect();
  const database = dbc.db(DB_NAME);
  const collection = database.collection(DB_COLLECTION);
  return collection;
};

module.exports = {
  getDBCollection,
};
