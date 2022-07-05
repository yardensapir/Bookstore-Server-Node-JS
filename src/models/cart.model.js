import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  ownerID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,

  },

  books: [
    {
      bookID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref:'Book'
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
