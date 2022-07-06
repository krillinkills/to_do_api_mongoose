const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const express = require('express');
const app = express;
app.use(express.json());

const ClientId =
  '61540748761-foabeoqo9iuq0fojqt7va9le0vgmusn7.apps.googleusercontent.com';
const Clientsecret = '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';
const RedirectUri = 'https://developers.google.com//oauthplayground';
const RefreshToken =
  '1//04a1tjRQk0BSYCgYIARAAGAQSNwF-L9Irt5XVeyquOtt3mW55Hhlq-mUMcS34tVUtHMNBbBRrHLiv2ahBI3JTeZND6nsDXGVSsik';

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
