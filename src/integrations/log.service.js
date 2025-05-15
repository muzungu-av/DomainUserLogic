const fs = require("fs");
async function log(message) {
  const line = `${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync("app.log", line);
}
module.exports = { log };
