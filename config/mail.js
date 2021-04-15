const sgMail = require('@sendgrid/mail');
var Mailgen = require('mailgen');
require('dotenv').config();
const {SENDGRID_API_KEY, SENDRIG_EMAIL} = process.env ;


const myEmail = (userName, userEmail, verifyToken ) => {
  const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
          name: 'Your contacts',
          link: 'http://localhost:3000/'
      }
  });
  const template = {
    body: {
        name: userName,
        intro: 'Welcome to Your contacts! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started with Your contacts, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Confirm your account',
                link: `http://localhost:3000/api/users/verify/${verifyToken}`
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
};
const emailBody = mailGenerator.generate(template);

  sgMail.setApiKey(SENDGRID_API_KEY)

  const msg = {
    to: userEmail, // Change to your recipient
    from: SENDRIG_EMAIL, // Change to your verified sender
    subject: userName,
    text: 'and easy to do anywhere, even with Node.js',
    html: emailBody
  };
  sgMail.send(msg)

}

module.exports = myEmail