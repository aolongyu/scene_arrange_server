const {
  getToolDefinitions,
  getToolHandlers,
} = require("./resolveTools/resolve");
const { getSceneData } = require("./resolveScene/resolve");
const { resolveLLM } = require("./resolveLLM/resolve");

const execute = async (req, res, next) => {
  try {
    const { sceneKey } = req.body;
    // 获取场景数据
    const [sceneData] = await getSceneData(sceneKey);
    // 获取工具定义
    const toolDefinitions = await getToolDefinitions(sceneData.sceneFunctions);
    // 获取工具处理函数
    const toolHandlers = await getToolHandlers(toolDefinitions);
    // LLM 调度
    const llmResult = await resolveLLM({
      tools: toolDefinitions,
      handlers: toolHandlers,
    });

    res.json(llmResult);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = execute;
