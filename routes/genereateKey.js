// const router = require('express').Router();
// const Todo = require('../models/to_do_schema');
// const { v4: uuidv4 } = require('uuid');

// router.post('/generate', async (req, res) => {
//   const email = req.body.email;
//   const uuid = uuidv4;
// });

const router = require('express').Router();
const todo = require('../models/to_do_schema');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { v4: uuidv4 } = require('uuid');

const ClientId =
  '61540748761-foabeoqo9iuq0fojqt7va9le0vgmusn7.apps.googleusercontent.com';
const Clientsecret = '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';
const RedirectUri = 'https://developers.google.com//oauthplayground';
const RefreshToken =
  '1//04a1tjRQk0BSYCgYIARAAGAQSNwF-L9Irt5XVeyquOtt3mW55Hhlq-mUMcS34tVUtHMNBbBRrHLiv2ahBI3JTeZND6nsDXGVSsik';

const oAuth2Client = new google.auth.OAuth2(
  ClientId,
  Clientsecret,
  RedirectUri
);
oAuth2Client.setCredentials({ refresh_token: RefreshToken });

const send = async (email, uid) => {
  const acces_token = await oAuth2Client.getAccessToken();
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
    from: 'To-do No-reply <todo@gmail.com>',
    to: email,
    subject: 'API key',
    text: 'please use below API key to access ',
    html: `<h1>Your api key is here  <br/>${uid}</h1>`,
  };
  const result = await transport.sendMail(mailOption);
  return result;
};

router.post('/generate', async (req, res) => {
  //checking if already registered or not
  const email = req.body.email;
  const resp = await todo.findOne({ email: email });

  if (!resp) return res.status(400).send({ msg: 'not registered' });

  const uid = uuidv4();
  send(email, uid).then(async (result) => {
    const resp = await todo.findOneAndUpdate({ email: email }, { uid: uid }); //first curly bracket for find and second for ehat we have to update
    return res.send({ msg: 'new key generated' });
  });
});

module.exports = router;