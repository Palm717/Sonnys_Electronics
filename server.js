const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

async function startServer() {
  try {
    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
}

startServer();
