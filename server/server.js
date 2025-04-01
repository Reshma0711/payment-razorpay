const express = require("express");

const app = express();

app.use(express.json());

const dotenv = require("dotenv").config();

const port = process.env.PORT;

const { dbConnect } = require("./dbconnect");

dbConnect();

const cors=require("cors")

app.use(cors())


const { createOrder, verifyCapture } = require("./controllers/order");

app.post("/create-order", createOrder);

app.post("/verify-capture", verifyCapture);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
