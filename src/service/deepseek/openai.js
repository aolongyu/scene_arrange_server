const OpenAI = require("openai");

const DEEPSEEK_BASE_URL = "https://api.deepseek.com";
const DEEPSEEK_BASE_URL_BETA = "https://api.deepseek.com/beta";

module.exports = {
  openai: new OpenAI({
    baseURL: DEEPSEEK_BASE_URL,
    apiKey: process.env.DEEPSEEK_API_KEY,
  }),
  openaiBeta: new OpenAI({
    baseURL: DEEPSEEK_BASE_URL_BETA,
    apiKey: process.env.DEEPSEEK_API_KEY,
  }),
};
