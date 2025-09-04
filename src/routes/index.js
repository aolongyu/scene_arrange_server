var express = require("express");
var router = express.Router();

// deepseek
router.post(
  "/deepseek/single-chat-completion",
  require("./deepseek/single-chat-completion")
);

router.post(
  "/deepseek/continuous-chat-completion",
  require("./deepseek/continuous-chat-completion")
);

// metadata / scenes
router.get(
  "/scene-arrange/metadata/scenes/get-scenes",
  require("./scene-arrange/metadata/scenes/get-scenes")
);
router.post(
  "/scene-arrange/metadata/scenes/set-scene",
  require("./scene-arrange/metadata/scenes/set-scene")
);

// metadata / functions
router.get(
  "/scene-arrange/metadata/functions/get-functions",
  require("./scene-arrange/metadata/functions/get-functions")
);
router.post(
  "/scene-arrange/metadata/functions/set-function",
  require("./scene-arrange/metadata/functions/set-function")
);

// scene execute
router.post(
  "/scene-arrange/scene-execute/execute",
  require("./scene-arrange/scene-execute/execute")
);

/**
 * test
 */
router.get("/test/pow2", require("./test/pow2"));

module.exports = router;
