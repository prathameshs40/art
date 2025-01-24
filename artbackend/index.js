require("dotenv").config();
const ENV = process.env;
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

app.listen(process.env.PORT, () => {});
