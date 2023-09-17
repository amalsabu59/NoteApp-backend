const router = require("express").Router();
const SharedNote = require("../models/sharedNote");
const Note = require("../models/note");
// Add a shared note
router.post("/add-shared-note", async (req, res) => {
  try {
    const { senderUserId, receiverUserId, noteId } = req.body;

    if (!senderUserId || !receiverUserId || !noteId) {
      return res.status(400).json({
        message: "senderUserId, receiverUserId, and noteId are required.",
      });
    }

    const sharedNote = new SharedNote({ senderUserId, receiverUserId, noteId });
    await sharedNote.save();

    res.status(201).json(sharedNote);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to get all notes for a given user
router.get("/get-shared-notes-with-note-info/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all shared notes with the given userId as either sender or receiver
    const sharedNotes = await SharedNote.find({
      $or: [{ senderUserId: userId }],
    });

    if (sharedNotes.length === 0) {
      return res.json([]); // No shared notes found
    }

    // Extract the noteIds from sharedNotes
    const noteIds = sharedNotes.map((sharedNote) => sharedNote.noteId);

    // Find the corresponding notes from the Note collection
    const notes = await Note.find({ _id: { $in: noteIds } });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
// Endpoint to get all notes for a given user
router.get("/get-received-notes-with-note-info/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all shared notes with the given userId as either sender or receiver
    const sharedNotes = await SharedNote.find({
      $or: [{ receiverUserId: userId }],
    });

    if (sharedNotes.length === 0) {
      return res.json([]); // No shared notes found
    }

    // Extract the noteIds from sharedNotes
    const noteIds = sharedNotes.map((sharedNote) => sharedNote.noteId);

    // Find the corresponding notes from the Note collection
    const notes = await Note.find({ _id: { $in: noteIds } });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
