const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://username:password@cluster0.vb6jdfq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  createdTime: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Item", itemSchema);

const logSchema = new mongoose.Schema({
  operation: String,
  itemId: mongoose.Schema.Types.ObjectId,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Log = mongoose.model("Log", logSchema);

const createLog = async (operation, itemId) => {
  const log = new Log({ operation, itemId });
  await log.save();
};

app.post("/items", async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  io.emit("itemAdded", newItem);
  await createLog("CREATE", newItem._id);
  res.status(201).send(newItem);
});

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.status(200).send(items);
});

app.put("/items/:id", async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  io.emit("itemUpdated", updatedItem);
  await createLog("UPDATE", req.params.id);
  res.status(200).send(updatedItem);
});

app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  io.emit("itemDeleted", req.params.id);
  await createLog("DELETE", req.params.id);
  res.status(204).send();
});

app.get("/", (req, res) => {
  res.send("Welcome to the CRUD Application");
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
