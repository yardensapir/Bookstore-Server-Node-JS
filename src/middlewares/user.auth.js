import jwt from "jsonwebtoken";
import environments from "../../config/environments.js";

import User from "../models/user.model.js";

const userAuth = async (req,res,next) => {
  try {
    const authorizatrion = req.header("Authorization");
    if (!authorizatrion) {
      throw new Error();
    }
    
    const token = authorizatrion.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }

    const data = jwt.verify(token, environments.TOKEN_CODE);
    const user = await User.findOne({_id: data, 'tokens.token': token})
    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();

  } catch(err) {

    res.status(401).send({
      status: 401,
      statusText: "Unathorized",
      message: "User was not authorized :(",
    });
  }
};

export default userAuth;
