import nodemailer from "nodemailer"
import { GOOGLE_APP_EMAIL, GOOGLE_APP_PW } from "../config/config.js"


export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: GOOGLE_APP_EMAIL,
        pass: GOOGLE_APP_PW
    },
})

