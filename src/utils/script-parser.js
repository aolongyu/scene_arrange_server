const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

const scriptParser = (funcStr) => {
  try {
    const ast = parser.parse(funcStr, {
      sourceType: "script",
      plugins: [],
    });

    const functionInfo = {};

    traverse(ast, {
      FunctionDeclaration(path) {
        functionInfo.name = path.node.id?.name || "anonymous";

        functionInfo.params = path.node.params.map((param) => {
          return param.name;
        });

        const bodyCode = generator(path.node.body).code;
        functionInfo.body = bodyCode;

        let innerLogic = {
          consoleLogs: [],
          returnStatement: null,
        };

        path.node.body.body.forEach((statement) => {
          // console.log
          if (
            statement.type === "ExpressionStatement" &&
            statement.expression.type === "CallExpression" &&
            statement.expression.callee.type === "MemberExpression" &&
            statement.expression.callee.object.name === "console" &&
            statement.expression.callee.property.name === "log"
          ) {
            const logArgs = statement.expression.arguments.map((arg) => {
              return generator(arg).code;
            });
            innerLogic.consoleLogs.push(`console.log(${logArgs.join(", ")})`);
          }

          if (statement.type === "ReturnStatement" && statement.argument) {
            innerLogic.returnStatement = `return ${
              generator(statement.argument).code
            }`;
          }
        });

        functionInfo.innerLogic = innerLogic;
      },
    });

    return functionInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  scriptParser,
};
