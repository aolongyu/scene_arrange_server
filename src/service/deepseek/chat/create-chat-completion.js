/**
 * 对话补全
 * doc: https://api-docs.deepseek.com/zh-cn/api/create-chat-completion
 * api: https://api.deepseek.com/chat/completions
 */

const { openai, openaiBeta } = require("../openai.js");
const { log } = require("../../../utils/log");

const createService = (_openai) => {
  return async (messages, options = {}) => {
    try {
      // const completion = {
      //   id: "123",
      //   object: "chat.completion",
      //   created: 1756454213,
      //   model: "deepseek-chat",
      //   choices: [],
      // };
      log("call messages", messages);
      log("call options", options);

      const completion = await _openai.chat.completions.create({
        messages,
        model: "deepseek-chat",
        ...options,
      });

      log("completion", completion);

      return completion;
    } catch (error) {
      throw error;
    }
  };
};

module.exports = {
  createChatCompletion: createService(openai),
  createChatCompletionBeta: createService(openaiBeta),
};
