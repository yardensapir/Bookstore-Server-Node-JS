import dotenv from "dotenv";
dotenv.config();

const environments = {
 PORT: process.env.PORT,
 MONGODB_URL: process.env.MONGODB_URL,
 TOKEN_CODE: process.env.TOKEN_CODE
};

export default environments;
