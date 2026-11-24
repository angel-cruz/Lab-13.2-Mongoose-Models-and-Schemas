const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./db/connection");
const bookRoutes = require("./routes/bookRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Digital Bookshelf API!");
});

app.use("/api/books", bookRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
