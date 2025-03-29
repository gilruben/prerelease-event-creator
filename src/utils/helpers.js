const Storage = require('./storage')
const { createEvent } = require('./discord');

const processPrereleaseEvents = async (client, prereleaseEvents) => {
  for (let indx = 0; indx < prereleaseEvents.length; indx += 1) {
    const prereleaseEvent = prereleaseEvents[indx];

    // If the prerelease event ID is already in the storage, then a
    // discord event has already been created for it
    const itemInStorage = await Storage.getItem(prereleaseEvent.id);
    if (!itemInStorage) {
      const discordEvent = await createEvent(client, prereleaseEvent);
      await Storage.setItem(prereleaseEvent.id, discordEvent.id)
    }
  }
};

module.exports = {
  processPrereleaseEvents
};
