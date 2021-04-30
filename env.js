const config = require(__dirname + '/../config/config.json')[env];
const env = process.env.NODE_ENV || 'development';
const BOT_TOKEN = process.env.BOT_TOKEN;
const cid = process.env.CHANNEL_ID;
const tck = process.env.TWITTER_CONSUMER_KEY;
const tcs = process.env.TWITTER_CONSUMER_SECRET;
const tat  = process.env.TWITTER_ACCESS_TOKEN;
const tts = process.env.TWITTER_TOKEN_SECRET;
const itp = process.env.IMMEDIATE_TWEET_PASSWORD;
const port = process.env.PORT || 3000

module.exports = {
  runtime: {
    config,
    env,
    port
  },
  discord: {
    BOT_TOKEN,
    cid
  },
  twitter: {
    tck,
    tcs,
    tat,
    tts,
    itp
  }
}