// Imports
const express = require('express'),
      sessions = require('express-session'),
      bodyParser = require('body-parser');

// Server creation
const app = express();

// Top level middleware
app.use(bodyParser.json());
app.use(sessions({
  secret: 'fdjlskaifoudoieruhwfdi9er80uio430942u94023er87iu89ef7d6t7uygehuijorr78fhjdeir90-8iuy3df9087eiruyhjkn4i0f9u',
  resave: false,
  saveUninitialized: false,
  // Here is a pretty good answer about what resave and saveUninitialized do, if you're super curious https://stackoverflow.com/questions/40381401/when-use-saveuninitialized-and-resave-in-express-session
  cookie: {
    maxAge: 600000000
  }
}));

// Endpoints
app.post('/api/login', (req, res) => {

  // Here is where you would query the database
  // Once you get the user out of the database, you would set their id on sessions instead of the username example we are using below
  req.session.username = req.body.username;
  console.log(req.session);
  res.sendStatus(200);
})

app.get('/api/me', (req, res) => {
  // If you were using a DB, you would test for the user's id not their username probably
  if (req.session.username) {
    // If you were using a DB, you would use their user id to query the DB and send the entire user object to the front in this endpoint
    res.status(200).send(req.session.username)
  } else {
    res.sendStatus(403);
  }
})

app.delete('/api/logout', (req, res) => {
  // This method destroys a session
  req.session.destroy();
  res.sendStatus(200);
})

// Server listen
app.listen(4000, () => console.log('Housten we have lift off on port 4000'))