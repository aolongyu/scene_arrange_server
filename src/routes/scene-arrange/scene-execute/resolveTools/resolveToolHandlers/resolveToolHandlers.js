const { scriptParser } = require("../../../../../utils/script-parser");
const { log } = require("../../../../../utils/log");

// 解析工具处理器
const resolveToolHandlers = async (toolBaseInfos = []) => {
  try {
    return toolBaseInfos.map((toolBaseInfo) => {
      const functionInfo = scriptParser(toolBaseInfo.function.code);
      log("functionInfo", functionInfo, JSON.stringify(functionInfo));
      return {
        name: toolBaseInfo.function.name,
        exec: new Function(...functionInfo.params, functionInfo.body),
      };
    });
  } catch (error) {
    console.error("Error resolving tool handlers:", error);
    throw error;
  }
};

module.exports = {
  resolveToolHandlers,
};
