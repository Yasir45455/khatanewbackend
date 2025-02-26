const express = require("express");
require("./dbConnect/db");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const clientRoutes = require("./routes/clientRoutes");
const khataRoutes = require("./routes/khataRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const port = 3001;

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Server");
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use("/api/clients", clientRoutes);
app.use("/api/khata", khataRoutes);
app.use("/admin", adminRoutes);
app.use("/api/transactions", transactionRoutes);

app.listen(port, () => console.log(`App is Running on port ${port}.`));