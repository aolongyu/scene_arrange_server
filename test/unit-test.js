const {
  resolveApiRemoteHandlers,
} = require("../src/routes/scene-arrange/scene-execute/resolveTools/resolveToolHandlers/resolveRemoteHandlers/resolveApiRemoteHandlers/resolveApiRemoteHandlers");
const { log } = require("../src/utils/log");
global.log = log;

const test = async () => {
  log("test", 'dev');
  const result = await resolveApiRemoteHandlers([
    {
      _id: {
        $oid: "68b80a5bdf517f0c95f10d69",
      },
      key: "function-92729874",
      type: "function-remote",
      function: {
        name: "pow2",
        description: "求值的平方",
        parameters: {
          type: "object",
          properties: {
            a: {
              type: "number",
              description: "求平方的奇数值",
            },
          },
          required: ["a"],
        },
        api: {
          method: "get",
          url: "http://localhost:3000/api/test/pow2",
        },
      },
      yn: 1,
    },
  ]);
  console.log(result);
};

test();
