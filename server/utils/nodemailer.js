import nodemailer from "nodemailer"

export default class Mail {
    constructor(){
        this.transport = nodemailer.createTransport({
            service: process.env.MAIL_SERVICE, 
            port: process.env.MAIL_PORT, 
            auth:{
                user: process.env.MAIL_USER, 
                pass: process.env.MAIL_PASS 
            }
    })}

    sendRegisterConfirmationMail = async (name, nickname, email, password) => {
        const options = {
            from: process.env.MAIL_USER,
            to: email,
            subject: "My Chat App - Register Confirmation",
            html: `
                    <h1>Welcome ${name}!<h1>
                    <br>
                    <h2>Your registration process has been successful!</h2>
                    <br>
                    <h3>You can now login with your credentials: </h3>
                    <br>
                    <p><strong>Nickname:</strong> ${nickname}</p>
                    <p><strong>Password:</strong> ${password}</p>
                    <br>
                    <p>Thanks for choosing <strong>My Chat App!</strong></p>
                    <small>Developed by Facu!</small>
                    `
        }

        const result = await this.transport.sendMail(options)

        return result
    }

}
