const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/note");
const sharedNoteRoutes = require("./routes/sharedNote");

dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/note", noteRoutes);
app.use("/shared-note", sharedNoteRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected Successfully !");
    app.listen(process.env.PORT || 8001, () => {
      console.log("backend server is running !");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
    process.exit(1); // Exit the application with an error code
  });
