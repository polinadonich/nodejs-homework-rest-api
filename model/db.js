const mongoose = require("mongoose");
// const DB_HOST = "mongodb+srv://Polina:mDA-z3d-qn2-gP9@cluster0.idntd.mongodb.net/db-contacts?retryWrites=true&w=majority"
// mongoose.connect(DB_HOST)
//   .then(() => console.log("Database connect"))
//   .catch(error => console.log(error.message) )
require("dotenv").config();
const uriDb = process.env.DB_HOST;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (error) => {
  console.log(`Database connection error: ${error.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database has been disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Database connection is closed and app termination");
  process.exit(1);
});

module.exports = db;
