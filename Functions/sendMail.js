const nodeMailer = require("nodemailer");
require('dotenv').config()

const transport = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
        user: "developer100web99@gmail.com",
        pass: process.env.EMAIL_PASS
    }
});



const sendMail = async (to, link, subject = "Verify Your Email", text = "") => {

    const mailOptions = {
        from: "The Best Task APP",
        to,
        subject,
        text,
        html: `<div style="background-color: whitesmoke;
        padding: 3%;">
            <div style="width: 90%;
            background-color: white;
            margin: 0px auto;
            padding: 50px 30px;
            text-align: center;">
                <h1 style=" margin: 0px 0px 10px 0px;
                font-family: 'Rubik Microbe', cursive;text-transform: capitalize;">${subject}</h1>
                <p style="margin: 0px 0px 50px 0px;
                font-family: 'Anek Tamil', sans-serif;
                font-weight: 30">Please Click On Below Button to <span style="text-transform:lowercase;">${subject}</span>!</p>
                <a href="${link}" style=" border: 4px solid #162737;
                padding: 5px 30px;
                text-decoration: none;
                font-family: 'Anek Tamil', sans-serif;
                color: #162737;
                font-size: 18px;
                font-weight: 800;
                border-radius: 10px;
                transition: all 1s;cursor:pointer;" target="_blank">Click Here</a>
            </div>
        </div>`
    };
    const promise = new Promise((resolve, reject) => {
        transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                resolve(false)
            }
            else {
                resolve(true);
            }
        });
    });
    return promise;
}
module.exports = { sendMail };


