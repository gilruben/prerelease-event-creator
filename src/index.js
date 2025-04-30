require('dotenv').config();
const Discord = require('discord.js');
const { storeIds } = require('./storeIds');
const { getPrereleaseEvents } = require('./utils/wizards');
const { processPrereleaseEvents } = require('./utils/helpers');
const { isGuildValid } = require('./utils/discord');
const cron = require('node-cron');

const { GatewayIntentBits } = Discord;
const client = new Discord.Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  const guildExists = isGuildValid(client);
  
  if (!guildExists)
    throw new Error('Guild not found');
  
  // Checks for prerelease events every third hour (ex: 12pm, 3pm, 6pm, etc)
  cron.schedule('* */3 * * *', async () => {
    console.log('CRON-CALLED')
    const prereleaseEvents = await getPrereleaseEvents(storeIds);
  
    await processPrereleaseEvents(client, prereleaseEvents);
  });
});
  
client.login(process.env.CLIENT_TOKEN); //signs the bot in with token
