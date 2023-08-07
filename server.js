//1: need to import express first and store it in a variable, we are telling node to load the express library
const express = require("express");

const { MongoClient } = require("mongodb");

const PORT = process.env.PORT || 8000;
//2:  now we need to create an app express application by calling the express function
const app = express();

// Initialize middleware
// we use to have to install body parser but now it is a built in middleware
// function of express. It parses incoming JSON payload
app.use(express.json({ extended: false }));

//best way to avoid code repetition is to create a function

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect("mongodb://127.0.0.1");
    const db = client.db("mernblog");
    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
};

// this is the end point to get the single article from the database

app.get("/api/articles/:name", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName });
    res.status(200).json(articleInfo);
  }, res);
});

// get all articles api from database

app.get("/api/articles", async (req, res) => {
  withDB(async (db) => {
    const articleInfo = await db.collection("articles").find({}).toArray();
    res.status(200).json(articleInfo);
  }, res);
});

// this is the end point for adding the comments under the single article

app.post("/api/articles/:name/add-comments", async (req, res) => {
  const { username, text } = req.body; // here we want the username and text from the body
  const articleName = req.params.name; // here we want the name from the params

  withDB(async (db) => {
    const articleInfo = await db
      .collection("articles")
      .findOne({ name: articleName }); // here we are finding the single article by name
    await db.collection("articles").updateOne(
      { name: articleName }, // here we are updating the single article by name
      {
        $set: {
          comments: articleInfo.comments.concat({ username, text }), // here we are updating the comments by adding the new comments
        },
      }
    );
    const updatedArticleInfo = await db
      .collection("articles")
      .findOne({ name: articleName }); // here we are finding the article by name
    res.status(200).json(updatedArticleInfo); // here we are sending the updated article info
  }, res);
});
// ===================Comment started==========================//
// // This is the tested routes

// // get api to get the data from the body
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // post api to get the data from the body
// app.post("/", (req, res) => {
//   res.send(
//     `Hello ${req.body.name}!
//     Father Name is ${req.body.fatherName}!
//     Wife Name is ${req.body.wifeName}!
//     Daughter Name is ${req.body.daughterName}! `
//   );
// });

// // get api with params or id to get the data from the params in the url, if we want to get the data of a single user

// app.get("/hello/:name", (req, res) => res.send(`Hello ${req.params.name}`));
// ===================Comment Ends==========================//

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
