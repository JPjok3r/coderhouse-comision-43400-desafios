import dotenv from "dotenv";

dotenv.config();

export default {
    port: parseInt(process.env.PORT) || 3000,
    mongo_uri: process.env.MONGO_URI,
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_secret_key: process.env.GITHUB_SECRET_KEY,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    admin_mail: process.env.ADMIN_MAIL,
    admin_password: process.env.ADMIN_PASSWORD,
};