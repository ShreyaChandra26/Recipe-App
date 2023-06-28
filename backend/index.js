const express = require("express");
var cors = require("cors");
require("dotenv").config();
const port = 8000;
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
require("../Backend/Components/Connection/Connect");
const oppsenginedata = require("../Backend/Components/Model/Registration");
const recipe = require("../Backend/Components/Model/Addrecipe");
const secret = "shreya";

app.post("/signup", async (req, res) => {
  try {
    const eamilid = req.body.email;
    const emaildata = await oppsenginedata.findOne({ email: eamilid });
    if (emaildata) {
      return res.send("email is already in use");
    }
    bcrypt.hash(req.body.password, 10, async function (hashError, hash) {
      if (hashError) {
        return res.json({ message: hashError });
      }
      const data = new oppsenginedata({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      });
      const senddata = await data
        .save()
        .then(() => {
          res.send("successfully registered");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (e) {
    res.send(e);
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const passwords = req.body.password;
  if (!email || !passwords) {
    return res.status(422).json({ error: "please add all the fields" });
  }

  oppsenginedata.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "invalid credentials" });
    }
    bcrypt.compare(passwords, savedUser.password).then((doMatch) => {
      if (doMatch) {
        const token = jwt.sign({ _id: savedUser._id }, secret);
        res.json({
          token,
          user: {
            email: savedUser.email,
            username: savedUser.username,
            id: savedUser._id,
            message: "success",
          },
        });
      } else {
        return res.status(422).json({ error: "invalid credentials " });
      }
    });
  });
});

app.post("/addrecipe", (req, res) => {
  const data = new recipe({
    RecipeTitel: req.body.RecipeTitel,
    Author: req.body.Author,
    imgurl: req.body.imgurl,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    price: req.body.price,
  });
  const senddata = data
    .save()
    .then(() => {
      res.send("successfully added");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/getrecipe", async (req, res) => {
  try {
    const data = await recipe.find();
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(400).send("Error in fetching proposals");
  }
});

app.listen(port, () => {
  console.log("server is starting on port " + port);
});
