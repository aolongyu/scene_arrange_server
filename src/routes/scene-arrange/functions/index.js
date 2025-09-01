const sumDefine = require("./sum");
const multipDefine = require("./multip");
const divisonDefine = require("./divison");

module.exports = {
  handlers: [sumDefine.handler, multipDefine.handler, divisonDefine.handler],
  tools: [sumDefine.tool, multipDefine.tool, divisonDefine.tool],
};
