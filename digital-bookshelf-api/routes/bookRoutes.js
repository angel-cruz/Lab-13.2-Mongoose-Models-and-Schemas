const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Book = require("../models/Book");

// CREATE: POST /api/books
router.post("/", async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({
      message: "Book created successfully",
      book: newBook
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "A book with this ISBN already exists." });
    }
    res.status(400).json({ message: error.message });
  }
});

// READ ALL: GET /api/books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ ONE: GET /api/books/:id
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID." });
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE: PUT /api/books/:id
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID." });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "A book with this ISBN already exists." });
    }
    res.status(400).json({ message: error.message });
  }
});

// DELETE: DELETE /api/books/:id
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid book ID." });
    }

    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: deletedBook
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
