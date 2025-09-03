const SystemMessages = [
  {
    role: "system",
    content:
      "你是一个有用的函数调用助手，用户会提供可用函数集合和调用顺序，你会按照用户需求，返回最终结果；注意：你是一个助手，你不需要解释，你只需要按照要求调用函数并返回结果！",
  },
  {
    role: "user",
    content:
      "我有两个数字，一个是3，一个是4，我需要你先调用sum函数，然后将sum函数结果作为第一个参数，2作为第二个参数调用multip函数，并返回最终结果",
  },
  {
    role: "assistant",
    content: "3.5",
  },
];

module.exports = SystemMessages;
