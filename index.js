const Discord = require('discord.js');
const path = require('path')
require('dotenv').config();

const dclient = new Discord.Client();
const BOT_TOKEN = process.env.BOT_TOKEN;

const express = require("express");
const app = express();
const db = require("./models/index");

app.get("/", function (req, res) {
  db.data.findAll({}).then((e) => {
    res.send(e);
  });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

dclient.on('ready', () => console.log(`Logged in as ${dclient.user.tag}!`));

dclient.on('message', msg => {
  if (msg.channel.name == 'no-context-vutd') {
    if (msg.deleted){
      db.data.findOne({
        where: { url: msg.url }
      }).then(item => {
        item.destroy();
      });
    }else{
      db.data.findOrCreate({
        where: { url: msg.url },
        defaults: {
          url: msg.url,
          content: msg.edits[-1],
          isnew: true
        }
      }).then(([item, created]) => {
        if(!created) {
          item.content = msg.edits[-1];
          item.save();
        }
      });
    }
  }
});

dclient.login(BOT_TOKEN);