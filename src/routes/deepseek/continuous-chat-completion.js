/**
 * deepseek 连续对话
 */

const { createChatCompletion } = require("../../service/deepseek/chat");
const DataBaseClient = require("../../utils/db");

const DB_NAME = "continuous-chat-completion--db-name";
const DB_COLLECTION = "continuous-chat-completion--db-collection";

module.exports = async (req, res, next) => {
  try {
    // 连接数据库服务
    const dbc = new DataBaseClient();
    await dbc.connect();
    const database = dbc.db(DB_NAME);
    await database.createCollection(DB_COLLECTION);
    const collection = database.collection(DB_COLLECTION);

    // 获取请求参数
    const { content, sessionId } = req.body;

    // 获取历史对话
    const cursor = collection.find({ sessionId }, { role: 1, content: 1 });
    const histories = await cursor.toArray();
    console.log("histories", histories);

    // 合并会话
    const messages = [...histories, { role: "user", content }];

    // 调用AI接口
    const completion = await createChatCompletion(messages, {
      temperature: 0.7,
    });

    // 添加历史会话
    const result = await collection.insertMany([
      {
        sessionId,
        role: "user",
        content: content,
      },
      {
        sessionId,
        role: "assistant",
        content: completion.choices[0].message.content,
      },
    ]);

    console.log(`${result.insertedCount} 个新文档已创建，ID 为:`);
    Object.keys(result.insertedIds).forEach((id, index) => {
      console.log(`文档 ${index + 1}: ${id}`);
    });

    console.log("log: completion", completion);

    res.json(completion);
  } catch (error) {
    next(error);
  }
};
