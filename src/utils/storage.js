const storage = require('node-persist');

storage.initSync({
  dir: './persist',
  logging: true,
  ttl: 34 * 24 * 60 * 60 * 1000,
  expiredInterval: 2 * 60 * 1000,
  writeQueue: true,
  writeQueueWriteOnlyLast: true
})
console.log('Storage has been initialized')

module.exports = storage