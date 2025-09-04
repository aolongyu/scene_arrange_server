const axios = require("axios");

const createHttpService = () => {
  return axios;
};

module.exports = {
  createHttpService,
};
