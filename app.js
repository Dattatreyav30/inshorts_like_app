const express = require("express");

const bodyParser = require("body-parser");

const cors = require("cors");

const mongoose = require("mongoose");

const dataModel = require("./model/dataModel");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/postsomething", async (req, res, next) => {
  try {
    const { title, subtitle, imageUrl, content } = req.body;
    const feedData = new dataModel({
      title: title,
      subtitle: subtitle,
      imageUrl: imageUrl,
      content: content,
    });
    await feedData.save();
    res.status(200).json({ message: "succesfull" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
});

app.get("/get-all", async (req, res, next) => {
  try {
    const data = await dataModel.find();
    res.status(200).json({ data: data, message: "internal server error" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "internal server error" });
  }
});
mongoose.connect(process.env.MONGODB_CONNECTION).then((res) => {
  app.listen(6000, () => {
    console.log("port running on 6000");
  });
});
