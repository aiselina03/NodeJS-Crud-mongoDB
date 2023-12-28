import express, { json } from "express";
import mongoose, { Schema } from "mongoose";
import "dotenv/config";

const app = express();
app.use(express.json());

const usersSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  age: Number,
  isMarried: String,
});
const userModel = mongoose.model("users", usersSchema);

app.get("/", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.send("");
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const users = await userModel.findById(id);
  res.send(users);
});

app.post("/", async (req, res) => {
  try {
    const {userName, email, password, age, isMarried } = req.body;
    const newUser = new userModel( {userName, email, password, age, isMarried });
    await newUser.save();
    res.send("user yarandi");
  } catch (error) {
    res.send(error.message);
  }
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const{userName, email, password, age, isMarried }= req.body;
  const users = await userModel.findByIdAndUpdate(id, {userName, email, password, age, isMarried });
  res.send(users);
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const users = await userModel.findByIdAndDelete(id);
  res.send(users);
});

mongoose.connect(process.env.DB_SECRET_KEY)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log("not Connected!"));

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

//mongodb+srv://mi7lu3zbz:Baku20032021@cluster0.sj9lfog.mongodb.net/
