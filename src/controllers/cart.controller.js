import Cart from "../models/cart.model.js";

export const getUserCartInfo = async (req, res) => {
  const user = req.user;

  const findUserCart = await Cart.findOne(user._id);

  if (!findUserCart) {
    throw new Error();
  }



  try {
    await findUserCart.populate("books.bookID");
    res.send({
      status: 200,
      statusText: "Ok",
      data: { findUserCart: findUserCart },
      message: "Here is your cart !",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      statusText: "Bad Request",
      message: "",
    });
  }
};

export const addBookToCart = async (req, res) => {
  const user = req.user;
  const bookID = req.body.bookID;

  try {
    const cart = await Cart.findOne({ ownerID: user._id });
    if (!cart) throw new Error();

    const books = cart.books;
    if (!books.find((bookDoc) => bookDoc.bookID.toString() === bookID)) {
      cart.books.unshift({ bookID: bookID });

      await cart.save();
    }

    res.send({
      status: 200,
      statusText: "Ok",
      data: { bookID: bookID },
      message: "The book was added to your cart !",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      statusText: "Bad Request",
      message: "",
    });
  }
};

export const updateUserCart = async (req, res) => {
  const user = req.user;
  const bookID = req.body.bookID;
  if (bookID === null) {
    return res.status(400).send({
      status: 400,
      statusText: "Bad Request",
      message: "Can not find book",
    });
  }

  try {
    const cart = await Cart.findOne({ owner: user._id });
    if (!cart) throw new Error();

    if (!cart.books.find((bookDoc) => bookDoc.bookID.toString() === bookID)) {
      return res.status(400).send({
        status: 400,
        statusText: "Bad Request",
        message: "",
      });
    }

    cart.books = cart.books.filter(
      (bookDoc) => bookDoc.bookID.toString() !== bookID
    );

    await cart.save();
    res.send({
      status: 200,
      statusText: "Ok",
      data: { cart: cart },
      message: "The cart has been updated",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      statusText: "Bad Request",
      message: "",
    });
  }
};

export const checkOut = async (req, res) => {
  const user = req.user;

  try {
    if (!user) {
      throw new Error();
    }

    const userCart = await Cart.findOne({ owner: user._id });
    
    if (userCart.books.length === 0) {
      throw new Error();
    }
    userCart.books = []
    await userCart.save()

    res.send({
      status:200,
      statusText:"Ok",
      data:{userCart: userCart},
      message: 'Checkout succseful'
    })
  } catch (err) {
    res.status(400).send({
      status: 400,
      statusText: "Bad Request",
      message: "checkout was failed",
    });
  }
};
