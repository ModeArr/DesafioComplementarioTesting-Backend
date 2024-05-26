import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

const {     
    NODE_ENV,
    PORT,
    API_PREFIX,
    MONGO_URL,
    DB_NAME,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    JWT_SECRET,
    JWT_EXPIRE_IN,
    COOKIE_SECRET,
    PERSISTANCE,
    GOOGLE_APP_EMAIL,
    GOOGLE_APP_PW,
    RESET_PASSWORD_KEY,
    RESET_EXPIRE_IN,
    CLIENT_URL,
    } = process.env

export {
    NODE_ENV,
    PORT,
    API_PREFIX,
    MONGO_URL,
    DB_NAME,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    JWT_SECRET,
    JWT_EXPIRE_IN,
    COOKIE_SECRET,
    PERSISTANCE,
    GOOGLE_APP_EMAIL,
    GOOGLE_APP_PW,
    RESET_PASSWORD_KEY,
    RESET_EXPIRE_IN,
    CLIENT_URL,
}