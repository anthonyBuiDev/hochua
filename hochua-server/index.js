const express = require("express");
const app = express();
const db = require("./node/src/config/database/hydroelectric");
const dotenv = require("dotenv");
const routes = require("./node/src/routes/index");
const moment = require("moment-timezone");
const compression = require("compression");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
moment.tz.setDefault("Asia/Ho_Chi_Minh");

const port = 5555;
// const baseURL = "http://127.0.0.1:3000";
// const baseURLTWO = "http://127.0.0.1:3001";
const corsOptions = {
  origin: "*",
  allowedHeaders: [
    "Content-Type",
    "accessToken",
    "refreshToken",
  ],
};
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
// Tăng giới hạn kích thước yêu cầu lên 50MB
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({ limit: "50mb", extended: true })
);
app.use(express.json());
dotenv.config();
routes(app);
db.connectHydroelectric();
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Connect service running on port ${port}`);
});
