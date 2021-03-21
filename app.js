const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// const { MongoClient, ObjectID } = require("mongodb");

const contactsRouter = require("./routes/api/contacts");

const app = express();
//перенесла в Server
// const dbUri = process.env.DB_URL;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

// async function mongoContact() {
//   const client = await new MongoClient(dbUri, {
//     useUnifiedTopology: true,
//   }).connect();
//   try {
// const result = await client
//   .db("db-contacts")
//   .collection("contacts")
//   .insertMany([
//     {
//       name: "Allen Raymond",
//       email: "nulla.ante@vestibul.co.uk",
//       phone: "(992) 914-3792",
//       subscription: "free",
//       password: "password",
//       token: "",
//     },
//     {
//       name: "Chaim Lewis",
//       email: "dui.in@egetlacus.ca",
//       phone: "(294) 840-6685",
//       subscription: "pro",
//       password: "password",
//       token: "",
//     },
//     {
//       name: "Kennedy Lane",
//       email: "mattis.Cras@nonenimMauris.net",
//       phone: "(542) 451-7038",
//       subscription: "free",
//       password: "password",
//       token: "",
//     },
//     {
//       name: "Wylie Pope",
//       email: "est@utquamvel.net",
//       phone: "(692) 802-2949",
//       subscription: "pro",
//       password: "password",
//       token: "",
//     },
//     {
//       name: "Cyrus Jackson",
//       email: "nibh@semsempererat.com",
//       phone: "(501) 472-5218",
//       subscription: "premium",
//       password: "password",
//       token: "",
//     },
//     {
//       name: "Abbot Franks",
//       email: "scelerisque@magnis.org",
//       phone: "(186) 568-3720",
//       subscription: "premium",
//       password: "password",
//       token: "",
//     },
//     {
//       name: "Reuben Henry",
//       email: "pharetra.ut@dictum.co.uk",
//       phone: "(715) 598-5792",
//       subscription: "premium",
//       password: "password",
//       token: "",
//     },
//     {
//       name: "Simon Morton",
//       email: "dui.Fusce.diam@Donec.com",
//       phone: "(233) 738-2360",
//       subscription: "pro",
//       password: "password",
//       token: "",
//     },
//     {
//       name: "Thomas Lucas",
//       email: "nec@Nulla.com",
//       phone: "(704) 398-7993",
//       subscription: "free",
//       password: "password",
//       token: "",
//     },
//     {
//       name: "Alec Howard",
//       email: "Donec.elementum@scelerisquescelerisquedui.net",
//       phone: "(748) 206-2688",
//       subscription: "premium",
//       password: "password",
//       token: "",
//     },
//   ]);
//     const result = await client
//       .db("db-contacts")
//       .collection("contacts")
//       .findOneAndDelete({ _id: ObjectID("605196ff3a8c0431ecb0a7fd") })
//       .toArray();
//     console.log(result);
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.close();
//   }
// }
// mongoContact();
