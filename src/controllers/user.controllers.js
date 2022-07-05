import User from "../models/user.model.js";
import Cart from '../models/cart.model.js'

export const createUser = async (req, res) => {
  const data = req.body;

  const user = new User(data);
  const userCart = new Cart({ownerID : user._id })


  try {
      const token = await user.generateAuthToken();
    await user.save();
    await userCart.save()
    res.status(201).send({
      status: 201,
      statusText: "Created",
      data: {user: user , token : token},
      message: "User was created succsessfully",
    });
  } catch (err) {
   
    res.status(400).send({
      status: 400,
      statusText: "Bad Requsest !!!",
      message: "",
    });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findUserByEmailAndPassword(email, password);
    const token = await user.generateAuthToken();
    res.send({
      status: 200,
      statusText: "ok",
      data: {
        user: user,
        token: token,
      },
      message: "User login succsessfully",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      statusText: "Bad Request",
      message: "",
    });
  }
};

export const logout = async (req, res) => {
  const user = req.user;
  const token = req.token;
  

  try {
    user.tokens = user.tokens.filter((tokenData)=>tokenData.token !== token)
    await user.save()
    res.send({
      status: 200,
      statusText: "OK",
      data: {},
      message: "Logout succseful",
    });
  } catch (err) {
    res.status(400).send({
      status: 400,
      statusText: "Bad Request",
      message: "",
    });
  }
};
