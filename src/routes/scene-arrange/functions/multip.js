const multip = ({ a, b }) => {
  console.debug("调用multip函数", { a, b }, a * b);
  return a * b;
};

module.exports = {
  handler: multip,
  tool: {
    type: "function",
    function: {
      name: multip.name,
      description: "给两个参数，返回这两个参数的乘积",
      parameters: {
        type: "object",
        properties: {
          a: { type: "number", description: "第一个参数" },
          b: { type: "number", description: "第二个参数" },
        },
        required: ["a", "b"],
        returnType: "number",
      },
    },
  },
};
