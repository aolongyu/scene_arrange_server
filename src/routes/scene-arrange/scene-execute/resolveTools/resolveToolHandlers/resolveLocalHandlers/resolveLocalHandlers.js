/**
 * 解析本地工具处理函数
 */

const { scriptParser } = require("../../../../../../utils/script-parser");

const resolveLocalHandlers = async (toolInfos = []) => {
  try {
    return toolInfos.map((info) => {
      const functionInfo = scriptParser(info.function.code);
      // log("functionInfo", functionInfo, JSON.stringify(functionInfo));
      return {
        name: info.function.name,
        exec: new Function(
          ...functionInfo.params,
          `console.log('工具调用：Local name: ${info.function.name}'); ${functionInfo.body}`
        ),
      };
    });
  } catch (error) {
    console.error("Error resolving local handlers:", error);
    throw error;
  }
};

module.exports = {
  resolveLocalHandlers,
};
