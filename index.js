const Discord = require('discord.js');
require('dotenv').config();

const dclient = new Discord.Client();
const BOT_TOKEN = process.env.BOT_TOKEN;
const cid = process.env.CHANNEL_ID;
const tck = process.env.TWITTER_CONSUMER_KEY;
const tcs = process.env.TWITTER_CONSUMER_SECRET;

const express = require("express");
const app = express();
const port = process.env.PORT || 3000

const db = require("./models/index");

var passport = require('passport');
var TwitterStrategy = require('passport-twitter');
app.use(passport.session());

passport.use(new TwitterStrategy({
  consumerKey: tck,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://no-context-vutd.herokuapp.com:' + port + '/auth/twitter/callback'
},
function(token, tokenSecret, profile, done) {
  console.log(token)
  console.log(tokenSecret)
  return done(null,profile);
}));

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    });

app.get("/", function (req, res) {
  db.data.findAll({}).then((e) => {
    res.send(e);
  });
});

app.listen(port, () => console.log("Example app listening on port 3000!"));

dclient.on('ready', () => console.log(`Logged in as ${dclient.user.tag}!`));

dclient.on('message', msg => {
  if (msg.channel.id == cid) {
    db.data.create({
      url: msg.url,
      content: msg.content,
      isnew: true
    });
  }
});

dclient.on('messageUpdate', (oldMsg, newMsg) => {
  if (newMsg.channel.id == cid) {
    db.data.findOne({
      where: {
        url: oldMsg.url
      }
    }).then(item => {
      item.content = newMsg.content;
      item.save();
    });
  }
});

dclient.on('messageDelete', msg => {
  if (msg.channel.id == cid) {
    db.data.findOne({
      where: {
        url: msg.url
      }
    }).then(item => {
      item.destroy();
    });
  }
});

dclient.login(BOT_TOKEN);