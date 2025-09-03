const log = (name, ...args) => {
  console.log("\n\n", `--- ${name} ---`);
  console.log(...args);
  console.log(`--- ${name} ---`, "\n\n");
};

module.exports = {
  log,
};
