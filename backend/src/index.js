const config = require("./config/app");
const app = require("../app");

async function startServer() {
  app.listen(config.port, (err) => {
    if (err) {
      process.exit(1);
    }
    console.log(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}

startServer();