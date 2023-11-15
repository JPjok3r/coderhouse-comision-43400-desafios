import nodemailer from 'nodemailer';
import config from '../../config.js';
import nhbs from 'nodemailer-express-handlebars';
import { __dirname } from '../../utils/utils.js';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.mailer_user,
        pass: config.mailer_password
    }
});

transporter.use('compile', nhbs({
    viewEngine: {
        layoutsDir: __dirname + '/views/',
        defaultLayout: false
    },
    viewPath: __dirname + '/views/'
}));

export default transporter;