const Discord = require('discord.js');
const client = new Discord.Client();
const BOT_TOKEN = 'ODM1NTIyNjk4NTIzOTY3NDk4.YIQrJg.mmrdejjpQngAD7DvHn-enwmEfNc';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.login(BOT_TOKEN);