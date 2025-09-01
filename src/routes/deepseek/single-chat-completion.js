/**
 * deepseek 单一对话
 */

const { createChatCompletion } = require("../../service/deepseek/chat");

module.exports = async (req, res, next) => {
  try {
    // 获取参数
    const { content } = req.body;
    // 调用AI接口
    const completion = await createChatCompletion([{ role: "user", content }], {
      temperature: 0.7,
    });
    // 返回结果
    res.json(completion);
  } catch (error) {
    next(error);
  }
};
