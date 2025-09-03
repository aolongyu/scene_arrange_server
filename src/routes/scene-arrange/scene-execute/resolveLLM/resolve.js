const SystemMessages = require("./system-message-config");
const callCore = require("./call-core");

const resolveLLM = async (tools, handlers) => {
  try {
    const messages = [...SystemMessages];
    messages.push({
      role: "user",
      content: "4和5求和，8和10求和，前面两结果相乘，结果是多少？",
    });
    const llmResult = await callCore(messages, { tools, handlers });
    return llmResult;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  resolveLLM,
};
