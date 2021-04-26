const Discord = require('discord.js');
const path = require('path')
require('dotenv').config();

const dclient = new Discord.Client();
const BOT_TOKEN = process.env.BOT_TOKEN;
const cid = process.env.CHANNEL_ID;
const tck = process.env.TWITTER_CONSUMER_KEY;
const tcs = process.env.TWITTER_CONSUMER_SECRET;
const tat  = process.env.TWITTER_ACCESS_TOKEN;
const tts = process.env.TWOTTER_TOKEN_SECRET;

const express = require("express");
const app = express();
const port = process.env.PORT || 3000

const db = require("./models/index");

const T = new Twit({
  consumer_key: tck,
  consumer_secret: tcs,
  access_token: tat,
  access_token_secret: tts,
  timeout_ms: 10*1000,
  strictSSL: true
})

app.get("/", function (req, res) {
  db.data.findAll({}).then((e) => {
    res.send(e);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

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