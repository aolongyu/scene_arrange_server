// 使用MongoDB存储数据

const { MongoClient, ServerApiVersion } = require("mongodb");

const URI = "mongodb://localhost:27017";

class DataBaseClient {
  constructor() {
    return this.init();
  }

  init() {
    return new MongoClient(URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }
}

module.exports = DataBaseClient;
