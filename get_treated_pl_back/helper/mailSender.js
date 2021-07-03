const nodemailer = require("nodemailer");
const mailerconf = require('../config/mailer.json')
const fs = require("fs");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(mailerconf);

// function for new application mail
const sendNewApplicationMail = async (receiverEmail, receiverName, tenantName, accommodationTitle) => {

    //envoi mail et lecture du html
    fs.readFile(__dirname + "/../templates/newapplication.html", "utf-8", async function (er, data) {
        data = data.replace(/\{\{receiverName\}\}/g, receiverName);
        data = data.replace(/\{\{tenantName\}\}/g, tenantName);
        data = data.replace(/\{\{accommodationTitle\}\}/g, accommodationTitle);

        var options = {
            from: '"Florencio Ullrich 👻" florencio.ullrich35@ethereal.email', // sender address
            to: receiverEmail, // list of receivers
            subject: "Nouvelle candidature - " + accommodationTitle, // Subject line
            html: data
        }
        let info = await transporter.sendMail(options);


        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    });
}

// function for registration mail
const sendApplicationResponseMail = async (receiverEmail, receiverName, isApproved, accommodationTitle) => {

    //envoi mail et lecture du html
    fs.readFile(__dirname + "/../templates/applicationresponse.html", "utf-8", async function (er, data) {
        data = data.replace(/\{\{receiverName\}\}/g, receiverName);
        data = data.replace(/\{\{tenantName\}\}/g, tenantName);
        data = data.replace(/\{\{approvalStatus\}\}/g, isApproved ? "favorablement" : "défavorablement");
        data = data.replace(/\{\{accommodationTitle\}\}/g, accommodationTitle);

        var options = {
            from: '"Florencio Ullrich 👻" florencio.ullrich35@ethereal.email', // sender address
            to: receiverEmail, // list of receivers
            subject: "Réponse à candidature - " + accommodationTitle, // Subject line
            html: data
        }
        let info = await transporter.sendMail(options);


        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    });
}



module.exports = { sendNewApplicationMail, sendApplicationResponseMail }

