const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const express = require('express');
const app = express;
app.use(express.json());

const ClientId = 'x';
const Clientsecret = 'x';
const RedirectUri = 'x';
const RefreshToken = 'x';

const oauth2Client = new google.auth.OAuth2(
  ClientId,
  Clientsecret,
  RedirectUri
);

oauth2Client.setCredentials({ refresh_token: RefreshToken });

const send = async (email) => {
  const acces_token = await oauth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: 'gmail.com',
    auth: {
      type: 'OAUTH2',
      user: 'beingvaibhav858@gmail.com',
      clientId: ClientId,
      clientSecret: Clientsecret,
      refreshToken: RefreshToken,
      accessToken: acces_token,
    },
  });
  const mailOption = {
    from: 'No-reply <beingvaibhav858@gmail.com>',
    to: email,
    subject: 'Testing',
    text: 'Testing ',
  };
  const result = await transport.sendMail(mailOption);
  return result;
};

app.post('./', (req, res) => {
  const email = req.body.email;

  send(email)
    .then((res) => res.send(res))
    .catch((err) => console.log(err));
});

app.listen(4000);
