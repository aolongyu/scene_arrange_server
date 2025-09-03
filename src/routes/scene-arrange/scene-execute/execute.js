const { log } = require("../../../utils/log");
const { resolveTools } = require("./resolveTools/resolveTools");
const { resolveScene } = require("./resolveScene/resolveScene");
const { resolveLLM } = require("./resolveLLM/resolveLLM");

const execute = async (req, res, next) => {
  try {
    const { sceneKey } = req.body;
    // 获取场景数据
    const [sceneData] = await resolveScene(sceneKey);
    // log("sceneData", sceneData, JSON.stringify(sceneData));

    // 获取工具定义及其处理函数
    const tools = await resolveTools(sceneData);
    // log("tools", tools, JSON.stringify(tools));

    // // LLM 调度
    const llmResult = await resolveLLM({
      tools: tools.map((tool) => tool.definition),
      handlers: tools.map((tool) => tool.handler),
    });
    log("llmResult", llmResult, JSON.stringify(llmResult));

    res.json(llmResult);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = execute;
