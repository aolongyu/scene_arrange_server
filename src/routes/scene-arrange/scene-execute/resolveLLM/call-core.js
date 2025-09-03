const { createChatCompletion } = require("../../../../service/deepseek/chat");

const runToolCall = async (toolCall, handlers) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchChatCompletion = async (messages, tools) => {
  const completion = await createChatCompletion(messages, {
    temperature: 0,
    tools,
    tool_choice: "auto",
  });
  return completion;
};

const callCore = async (messages, { tools, handlers }) => {
  try {
    // 初次调用
    let completion = await fetchChatCompletion(messages, tools);
    messages.push(completion.choices[0].message);
    console.log(456, messages);

    // 循环调用
    while (completion.choices[0].message.tool_calls?.length) {
      // 本地工具调用
      const toolCalls = completion.choices[0].message.tool_calls;
      const toolCallResults = await Promise.all(
        toolCalls.map(async (toolCall) => {
          return await runToolCall(toolCall, handlers);
        })
      );
      messages.push(
        ...toolCallResults.map((result) => ({
          role: "tool",
          tool_call_id: result.id,
          content: `${result}`,
        }))
      );

      completion = await fetchChatCompletion(messages, tools);
      messages.push(completion.choices[0].message);
    }

    return completion;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = callCore;
