require('dotenv').config();
const Discord = require('discord.js');
const { storeIds } = require('./storeIds');
const { getPrereleaseEvents } = require('./utils/wizards');
const { createEvent } = require('./utils/discord');

const { GatewayIntentBits } = Discord;
const client = new Discord.Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const prereleaseData = await getPrereleaseEvents(storeIds);

  createEvent(client, prereleaseData[0]);
});

client.login(process.env.CLIENT_TOKEN); //signs the bot in with token
