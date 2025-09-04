const {
  resolveToolDefinitions,
} = require("./resolveToolDefinitions/resolveToolDefinitions");
const {
  resolveToolHandlers,
} = require("./resolveToolHandlers/resolveToolHandlers");
const { log } = require("../../../../utils/log");

const { getDBCollection } = require("../../metadata/functions/db-config");
const queryDBToolDefinitions = async (nodes) => {
  try {
    const dbCollection = await getDBCollection();
    const query = {
      $or: nodes.map((node) => ({ key: node.key })),
    };
    const cursor = await dbCollection.find(query);
    return await cursor.toArray();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const resolveTools = async (sceneData = {}) => {
  try {
    const { sceneExecutionGraph = {} } = sceneData;
    const { nodes = [] } = sceneExecutionGraph;
    if (!nodes || nodes.length === 0) {
      return [];
    }

    // 查库
    const toolBaseInfos = await queryDBToolDefinitions(nodes);
    // log("toolBaseInfos", toolBaseInfos, JSON.stringify(toolBaseInfos));

    // 解析工具定义
    const definitions = await resolveToolDefinitions(toolBaseInfos);
    // 解析工具处理函数
    const handlers = await resolveToolHandlers(toolBaseInfos);

    const tools = [];
    for (let i = 0; i < nodes.length; i++) {
      tools.push({
        definition: definitions[i],
        handler: handlers[i],
      });
    }
    return tools;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  resolveTools,
};
