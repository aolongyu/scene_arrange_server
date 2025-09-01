/**
 * 串行调用函数
 */

const { createChatCompletion } = require("../../service/deepseek/chat");
const { tools, handlers } = require("./functions/index");

const initMessages = () => {
  return [
    {
      role: "system",
      content:
        "你是一个有用的函数调用助手，用户会提供可用函数集合和调用顺序，你会按照用户需求，返回最终结果；注意：你是一个助手，你不需要解释，你只需要按照要求调用函数并返回结果！",
    },
    {
      role: "user",
      content:
        "我有两个数字，一个是3，一个是4，我需要你先调用sum函数，然后将sum函数结果作为第一个参数，2作为第二个参数调用multip函数，并返回最终结果",
    },
    {
      role: "assistant",
      content: "3.5",
    },
  ];
};

const runToolCall = async (toolCall) => {
  const handler = handlers.find(
    (handler) => handler.name === toolCall.function.name
  );
  if (!handler) {
    throw new Error(
      `Handler not found for tool call: ${toolCall.function.name}`
    );
  }
  const args = JSON.parse(toolCall.function.arguments);
  const result = await handler(args);
  return result;
};

const fetchChatCompletion = async (messages) => {
  const completion = await createChatCompletion(messages, {
    temperature: 0,
    tools,
    tool_choice: "auto",
  });
  return completion;
};

module.exports = async (req, res, next) => {
  try {
    const { content } = req.body;

    const messages = initMessages();
    messages.push({ role: "user", content });

    // 初次调用
    let completion = await fetchChatCompletion(messages);
    messages.push(completion.choices[0].message);

    // 循环调用
    while (completion.choices[0].message.tool_calls?.length) {
      // 本地工具调用
      for (
        let i = 0;
        i < completion.choices[0].message.tool_calls.length;
        i++
      ) {
        const toolCall = completion.choices[0].message.tool_calls[i];
        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: `${await runToolCall(toolCall)}`,
        });
      }
      completion = await fetchChatCompletion(messages);
      messages.push(completion.choices[0].message);
    }

    console.log("messages", messages);

    res.json(completion);
  } catch (error) {
    next(error);
  }
};
