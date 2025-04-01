const mongoose = require("mongoose");

const mongouri=process.env.MONGO_URI

exports.dbConnect = async () => {
  try {
    await mongoose.connect(mongouri);
    console.log("Database Connection Successsfull");
  } catch (err) {
    console.log("Database Error", err.message);
  }
};
