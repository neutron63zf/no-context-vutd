const Discord = require('discord.js');
const path = require('path')
require('dotenv').config();

const dclient = new Discord.Client();
const BOT_TOKEN = process.env.BOT_TOKEN;
const port = process.env.PORT || 3000

const express = require("express");
const app = express();
const db = require("./models/index");

app.get("/", function (req, res) {
  db.data.findAll({}).then((e) => {
    res.send(e);
  });
});

app.listen(port, () => console.log("Example app listening on port 3000!"));

dclient.on('ready', () => console.log(`Logged in as ${dclient.user.tag}!`));

dclient.on('message', msg => {
  if (msg.channel.name == '空き地-単語登録など') {
    db.data.create({
      url: msg.url,
      content: msg.content,
      isnew: true
    });
  }
});

dclient.on('messageUpdate', (oldMsg, newMsg) => {
  if (newMsg.channel.name == '空き地-単語登録など') {
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
  if (msg.channel.name == '空き地-単語登録など') {
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