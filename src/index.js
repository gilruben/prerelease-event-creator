require("dotenv").config();
require("console-stamp")(console, {
  format: ":date(mm/dd HH:MM:ss.l) :label",
});

const Discord = require("discord.js");
const { storeIds } = require("./storeIds");
const { getPrereleaseEvents } = require("./utils/wizards");
const { processPrereleaseEvents, storageCleanup } = require("./utils/helpers");
const { isGuildValid } = require("./utils/discord");

const { GatewayIntentBits } = Discord;
const client = new Discord.Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  try {
    const guildExists = isGuildValid(client);

    if (!guildExists) throw new Error("Guild not found");

    const prereleaseEvents = await getPrereleaseEvents(storeIds);

    if (prereleaseEvents.length) {
      await processPrereleaseEvents(client, prereleaseEvents);
    } else {
      console.log("No prerelease events found");
    }

    // Clean up expired items from storage
    await storageCleanup();
  } catch (error) {
    console.error(error.stack);
  }
});

try {
  client.login(process.env.CLIENT_TOKEN); //signs the bot in with token  throw new Error("test");
} catch (error) {
  console.error('There was an error logging onto discord');
  console.error(error.stack);
}
