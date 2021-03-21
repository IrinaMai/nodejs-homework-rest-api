const app = require("../app");
const mongoose = require("mongoose");
require("dotenv").config();

const dbUri = process.env.DB_URL;

const PORT = process.env.PORT || 3000;

const connection = mongoose.connect(dbUri, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running. Use API on port: ${PORT}. Database connection successful`
      );
    });
  })
  .catch((error) => {
    console.log(`Server not running. Error: ${error.message}`);
  });
