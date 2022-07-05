import Book from "../models/book.model.js";

export const createBook = async (req, res) => {
  const bookData = req.body;

  const book = new Book(bookData);

  try {
    await book.save();

    res.send({
      status: 201,
      statusText: "Created",
      data: book,
      message: "You have a new book in the data base !",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      statusText: "Bad Request",
      message: "",
    });
  }
};

export const getBooks = async (req, res) => {
  const books = await Book.find();

  try {
    books;
    res.send({
      status: 200,
      statusText: "OK",
      data: { books: books },
      message: "",
    });
  } catch {
    res.status(400).send({
      status: 400,
      statusText: "Bad Request",
      message: "",
    });
  }
};

export const getBook = async (req, res) => {

  const bookID = req.params.bookID;

  try {
    const book = await Book.findById(bookID);
    if (!book) {
      throw new Error();
    }
    res.send({
      status: 200,
      statusText: "OK",
      data: {book:book},
      message: "Found your book!",
    });
  } catch {
    res.status(400).send({
      status: 400,
      statusText: "Bad Request",
      message: "Can not find your book",
    });
  }
};
