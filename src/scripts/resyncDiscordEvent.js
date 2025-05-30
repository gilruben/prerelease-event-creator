require("dotenv").config();
require("console-stamp")(console, {
  format: ":date(mm/dd HH:MM:ss.l) :label",
});

const Discord = require("discord.js");
const { storeIds } = require("../storeIds");
const { getPrereleaseEvents } = require("../utils/wizards");
const {
  processPrereleaseEvents,
  resyncDiscordEvents,
} = require("../utils/helpers");
const {
  isGuildValid,
  editEvent,
  getScheduledEventDescription,
} = require("../utils/discord");

const { GatewayIntentBits } = Discord;
const client = new Discord.Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  try {
    const guildExists = isGuildValid(client);

    if (!guildExists) throw new Error("Guild not found");
    console.log(storeIds);
    const prereleaseEvents = await getPrereleaseEvents(storeIds);

    await resyncDiscordEvents(client, prereleaseEvents);
  } catch (error) {
    console.error(error.stack);
  }
});

client.login(process.env.CLIENT_TOKEN); //signs the bot in with token
