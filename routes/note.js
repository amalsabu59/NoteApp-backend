const router = require("express").Router();
const Note = require("../models/note");
const { verifyToken } = require("./verifyToken");

// Get all notes
router.get("/get-all-notes", async (req, res) => {
  try {
    const notes = await Note.find({});

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/add-note", verifyToken, async (req, res) => {
  try {
    const { userId, title, note } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required." });
    }

    const newNote = new Note({ userId, title, note });
    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/edit-note/:id", verifyToken, async (req, res) => {
  try {
    const { userId, title, note } = req.body;
    const noteId = req.params.id;

    if (!userId) {
      return res.status(400).json({ message: "userId is required." });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { userId, title, note },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/delete-note/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.json({ message: "Note deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
