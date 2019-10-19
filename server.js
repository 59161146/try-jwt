const express = require("express");
const mongodb = require("mongodb");
const bcrypt = require("bcryptjs");

const app = express();
const port = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const MongoClient = mongodb.MongoClient;

app.use(express.json());

app.post("/register", async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let studentId = req.body.studentId;
  let encryptedPwd = await bcrypt.hash(req.body.password, 8);

  const o = {
    name: name,
    email: email,
    studentId: studentId,
    password: encryptedPwd
  };
  const client = await require("./db");

  let db = client.db("buu");
  let result = await db
    .collection("users")
    .insertOne(o)
    .catch(err => {
      console.error(`Cannot insert data to users collection: ${err}`);
      res.status(500).json({ error: err });
      return;
    });

  let r = {
    _id: o._id,
    name: o.name,
    email: o.email,
    studentId: o.studentId
  };

  res.status(201).json(r);
});

app.post("/sign-in", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  const client = await require("./db");

  let db = client.db("buu");
  let user = await db
    .collection("users")
    .findOne({ email: email })
    .catch(err => {
      console.error(`Cannot find user with email:${err}`);
      res.status(500).json({ error: err });
    });

  let passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    res.status(401).json({ error: `username/password is not match` });
    return;
  }

  res.status(200).json({ token: "123456789" });
});

app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
