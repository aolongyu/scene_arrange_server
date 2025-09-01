var express = require("express");
var router = express.Router();

router.post(
  "/deepseek/single-chat-completion",
  require("./deepseek/single-chat-completion")
);

router.post(
  "/deepseek/continuous-chat-completion",
  require("./deepseek/continuous-chat-completion")
);

router.post(
  "/scene-arrange/single-chain-function-call",
  require("./scene-arrange/single-chain-function-call")
);

module.exports = router;
