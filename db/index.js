const mongoose = require("mongoose");
require("dotenv").config();

const mongoPath = process.env.MONGODB_URI;
// const collection = mongoose.model("collection",newSchema)
module.exports = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose;
};


