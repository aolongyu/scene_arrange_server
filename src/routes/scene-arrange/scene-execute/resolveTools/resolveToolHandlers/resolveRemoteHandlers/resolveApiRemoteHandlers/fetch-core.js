const { createHttpService } = require("../../../../../../../service/http/ajax");
const { log } = require("../../../../../../../utils/log");

const httpService = createHttpService();

const fetchCore = async ({ url, method, params }) => {
  try {
    log("fetchCore", { url, method, params });
    const response = await httpService(
      { url, method, params },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  fetchCore,
};
