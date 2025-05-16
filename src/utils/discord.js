const Discord = require("discord.js");
const {
  GuildScheduledEventManager,
  GuildScheduledEventPrivacyLevel,
  GuildScheduledEventEntityType,
} = Discord;
const { getWizardsEventUrl } = require("./wizards");

const createEvent = async (client, prereleaseEventData) => {
  const guildId = process.env.GUILD_ID;
  const guild = client.guilds.cache.get(guildId);

  if (!guild) throw new Error("Guild not found");

  const event_manager = new GuildScheduledEventManager(guild);

  const startTimeInSeconds = new Date(
    prereleaseEventData.scheduledStartTime,
  ).getTime();
  const endTime = new Date(prereleaseEventData.scheduledStartTime);
  endTime.setHours(23);
  endTime.setMinutes(59);
  const endTimeInSeconds = endTime.getTime();

  const eventDescriptionLines = [
    prereleaseEventData.description,
    `Entry: $${prereleaseEventData.entryFee.amount / 100}`,
    `Event Details: ${getWizardsEventUrl(prereleaseEventData.id)}`,
  ];
  const eventDescription = eventDescriptionLines.join("\n\n");

  return event_manager.create({
    scheduledStartTime: startTimeInSeconds,
    scheduledEndTime: endTimeInSeconds,
    privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
    entityType: GuildScheduledEventEntityType.External,
    name: prereleaseEventData.title,
    description: eventDescription,
    image: null,
    reason: "Create Prerelease Event",
    entityMetadata: {
      location: prereleaseEventData.organization.name,
    },
  });
};

const isGuildValid = (client) => {
  const guildId = process.env.GUILD_ID;
  const guild = client.guilds.cache.get(guildId);

  if (!guild) return false;

  return true;
};

module.exports = {
  createEvent,
  isGuildValid,
};
