const divison = ({ a, b }) => {
  console.debug("调用divison函数", { a, b }, a / b);
  return a / b;
};

module.exports = {
  handler: divison,
  tool: {
    type: "function",
    function: {
      name: divison.name,
      description: "给两个参数，返回这两个前一个值除以后一个值的结果",
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
