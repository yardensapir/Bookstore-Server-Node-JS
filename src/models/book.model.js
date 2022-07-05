import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,

  },
  authour: {
    type: String,
    required: true,
    trim: true,
  },
  bookCover: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,

  },
  pages: {
    type: String,
    required: true,
    trim: true,
 
  },
  info: {
    type: String,
    required: true,
    trim: true,
  
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
