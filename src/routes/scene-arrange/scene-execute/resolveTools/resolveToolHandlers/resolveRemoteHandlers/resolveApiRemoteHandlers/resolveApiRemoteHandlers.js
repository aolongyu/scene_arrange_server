const { fetchCore } = require("./fetch-core");

const resolveApiRemoteHandlers = async (toolInfos = []) => {
  try {
    return toolInfos.map((info) => {
      return {
        name: info.function.name,
        exec: (args) => {
          console.log(
            `工具调用：Remote-Api: name: ${
              info.function.name
            }, args: ${JSON.stringify(args)}`
          );

          return fetchCore({
            url: info.function.api.url,
            method: info.function.api.method,
            params: args,
          });
        },
      };
    });
  } catch (error) {
    console.error("Error resolving api remote handlers:", error);
    throw error;
  }
};

module.exports = {
  resolveApiRemoteHandlers,
};
