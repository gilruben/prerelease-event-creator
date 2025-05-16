const storage = require("node-persist");

storage.initSync({
  dir: "./persist",
  logging: (message) => {
    console.log("NODE-PERSIST:", message);
  },
  // Delete from storage after 34 days (in milliseconds)
  ttl: 34 * 24 * 60 * 60 * 1000,
  // Every 2 minutes, check if anything has expired
  expiredInterval: 2 * 60 * 1000,
  writeQueue: true,
  writeQueueWriteOnlyLast: true,
});
console.log("Storage has been initialized");

module.exports = storage;
