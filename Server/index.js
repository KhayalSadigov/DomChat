require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./Config/db");

const app = express();
const port = process.env.PORT;

// Body parser middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const userRoute = require("./Routes/user.route");
const messageRoute = require("./Routes/message.route");

app.use(messageRoute);
app.use(userRoute);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synced");
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database error:", err);
  });
