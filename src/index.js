require('dotenv').config();
const Discord = require('discord.js');
const { storeIds } = require('./storeIds');
const { getPrereleaseEvents } = require('./utils/wizards');
const { processPrereleaseEvents } = require('./utils/helpers');

const { GatewayIntentBits } = Discord;
const client = new Discord.Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const prereleaseEvents = await getPrereleaseEvents(storeIds);

  await processPrereleaseEvents(client, prereleaseEvents);
});

client.login(process.env.CLIENT_TOKEN); //signs the bot in with token
