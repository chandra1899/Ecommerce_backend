const nodemailer=require('nodemailer');
//creating transporter for mailing
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'c4746665@gmail.com',
        pass: 'jxhbauiwdmukmqme'
    }

  });

  module.exports = {
    transporter: transporter
}