const mongoose = require("mongoose");

const SharedNoteSchema = new mongoose.Schema(
  {
    senderUserId: {
      type: String,
      required: true,
    },
    receiverUserId: {
      type: String,
      required: true,
    },
    noteId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SharedNote", SharedNoteSchema);
