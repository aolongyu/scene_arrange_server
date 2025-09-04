const PresetPrompt = require("./preset-prompt");
const callCore = require("./call-core");

const resolveLLM = async ({ tools, handlers, sceneData }) => {
  try {
    const messages = [...PresetPrompt];
    messages.push({
      role: "user",
      content:
        "场景图结构为：" +
        JSON.stringify(sceneData.sceneExecutionGraph, null, 2),
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
