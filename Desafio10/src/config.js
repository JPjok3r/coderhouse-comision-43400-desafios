import dotenv from "dotenv";
import { Command } from "commander";

dotenv.config();

const program = new Command();

program.option('-m, --mode <mode>', 'Variable para el modo de funcionamiento del servidor');
program.parse();
console.log(`Mode: ${program.opts().mode}`);

export default {
    port: parseInt(process.env.PORT) || 3000,
    mongo_uri: process.env.MONGO_URI,
    github_client_id: process.env.GITHUB_CLIENT_ID,
    github_secret_key: process.env.GITHUB_SECRET_KEY,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    admin_mail: process.env.ADMIN_MAIL,
    admin_password: process.env.ADMIN_PASSWORD,
    mode: program.opts().mode
};