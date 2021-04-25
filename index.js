const Discord = require('discord.js');
const express = require('express')
const path = require('path')
require('dotenv').config();

const dclient = new Discord.Client();
const BOT_TOKEN = process.env.BOT_TOKEN;

dclient.on('ready', () => {
    console.log(`Logged in as ${dclient.user.tag}!`);
});

dclient.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

dclient.login(BOT_TOKEN);