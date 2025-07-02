const Storage = require("./storage");
const {
  createEvent,
  editEvent,
  getScheduledEventDescription,
} = require("./discord");
const { getWizardsEventUrl } = require("./wizards");

const link = (text, url) => `\x1b]8;;${url}\x1b\\${text}\x1b]8;;\x1b\\`;

const processPrereleaseEvents = async (client, prereleaseEvents) => {
  const groupedByCardSet = Object.groupBy(
    prereleaseEvents,
    (prereleaseEvent) => prereleaseEvent.cardSet.id,
  );

  const groupByFirstPrereleaseEventOfCardSet = Object.values(
    groupedByCardSet,
  ).sort((set1, set2) => {
    return (
      new Date(set1[0].scheduledStartTime) -
      new Date(set2[0].scheduledStartTime)
    );
  });

  // This will grab all the prelease events of a set if the first prerelease event for that set is within a month
  const prereleasesWithinAMonth = groupByFirstPrereleaseEventOfCardSet
    .filter((setPrereleases) => {
      const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000;
      const oneMonthFromNow = new Date().getTime() + oneMonthInMilliseconds;

      const prereleaseStartTimeInMilliseconds = new Date(
        setPrereleases[0].scheduledStartTime,
      ).getTime();

      return prereleaseStartTimeInMilliseconds <= oneMonthFromNow;
    })
    .flat();

  for (let indx = 0; indx < prereleasesWithinAMonth.length; indx += 1) {
    const prereleaseEvent = prereleasesWithinAMonth[indx];

    // If the prerelease event ID is already in the storage, then a
    // discord event has already been created for it
    const itemInStorage = await Storage.getItem(prereleaseEvent.id);
    if (!itemInStorage) {
      const discordEvent = await createEvent(client, prereleaseEvent);

      const prereleaseUrl = getWizardsEventUrl(prereleaseEvent.id);
      const prereleaseLink = link(prereleaseUrl, prereleaseUrl);
      console.log(
        `Discord Event ${discordEvent.id} created for prerelease ${prereleaseLink}`,
      );

      await Storage.setItem(prereleaseEvent.id, {
        discordEventId: discordEvent.id,
        entryFee: prereleaseEvent?.entryFee?.amount,
        title: prereleaseEvent.title,
        scheduledStartTime: prereleaseEvent.scheduledStartTime,
        store: prereleaseEvent?.organization?.name,
      });
    }
  }
};

const resyncDiscordEvents = async (client, prereleaseEvents) => {
  const resyncedPrereleaseEvents = [];

  for (let indx = 0; indx < prereleaseEvents.length; indx += 1) {
    const prereleaseEvent = prereleaseEvents[indx];
    const prereleaseEventId = prereleaseEvent.id;
    const prereleaseEventEntryFee = prereleaseEvent?.entryFee?.amount;
    const expectedDiscordEventDescription =
      getScheduledEventDescription(prereleaseEvent);

    const eventInStorage = await Storage.getItem(prereleaseEventId);

    if (eventInStorage) {
      const { discordEventId, entryFee: entryFeeInStorage } = eventInStorage;

      const entryFeeHasChanged = entryFeeInStorage !== prereleaseEventEntryFee;
      if (entryFeeHasChanged) {
        await editEvent(client, discordEventId, {
          description: expectedDiscordEventDescription,
        });

        eventInStorage.entryFee = prereleaseEventEntryFee;

        await Storage.updateItem(prereleaseEventId, eventInStorage);

        resyncedPrereleaseEvents.push(prereleaseEventId);
      }
    }
  }

  if (resyncedPrereleaseEvents.length)
    console.log(
      `Discord events for the following prerelease events have been updated ${resyncedPrereleaseEvents}`,
    );
};

const storageCleanup = async () => {
  console.log("Cleaning up storage");
  const keys = await Storage.keys();

  for (key of keys) {
    // Will automatically remove the item from storage if it has expired
    const value = await Storage.getItem(key);
  }
  console.log("Storage cleanup complete");
};

module.exports = {
  processPrereleaseEvents,
  resyncDiscordEvents,
  storageCleanup,
};
