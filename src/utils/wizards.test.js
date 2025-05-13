const axios = require('axios');
const { getPrereleaseEvents } = require('./wizards');

jest.mock('axios');

const mockPrereleaseEvents = [
  {
    id: '8454511',
    capacity: null,
    description: 'Format: Sealed\n' +
      '3 rounds of Swiss Rounds\n' +
      'Prizing will be based on records\n' +
      'Every match win earns you 2 Play booster packs! (Draws gets you 1 pack)\n' +
      'If you win no matches, you will still earn 1 Play booster pack at the end',
    distance: 3109.15754666,
    emailAddress: 'cardquest201@gmail.com',
    hasTop8: false,
    isAdHoc: false,
    isOnline: false,
    latitude: 40.75177,
    longitude: -73.85448,
    title: 'FINAL FANTASY Prerelease',
    eventTemplateId: '2Zi94Ab7T8Gl6J7BEXF1v0',
    pairingType: 'SWISS',
    phoneNumber: '929-522-0288',
    requiredTeamSize: 1,
    rulesEnforcementLevel: 'CASUAL',
    scheduledStartTime: '2025-06-06T23:00:00.0000000Z',
    startingTableNumber: 1,
    status: 'SCHEDULED',
    tags: ['magic:_the_gathering', 'magic_prerelease', 'sealed_deck'],
    timeZone: 'America/New_York',
    cardSet: { id: '5BJjPazILvmMuReKwNVjJ6', __typename: 'CardSet' },
    entryFee: { amount: 4000, currency: 'USD', __typename: 'Money' },
    organization: {
      id: '6331',
      isPremium: false,
      name: 'Card Quest',
      __typename: 'Organization'
    },
    eventFormat: { id: '6NBaFsOfSbfCl7Ea12oyl3', __typename: 'EventFormat' },
    __typename: 'Event'
  },
  {
    id: '8454512',
    capacity: null,
    description: 'Format: Sealed\n' +
      '3 rounds of Swiss Rounds\n' +
      'Prizing will be based on records\n' +
      'Every match win earns you 2 Play booster packs! (Draws gets you 1 pack)\n' +
      'If you win no matches, you will still earn 1 Play booster pack at the end',
    distance: 3109.15754666,
    emailAddress: 'cardquest201@gmail.com',
    hasTop8: false,
    isAdHoc: false,
    isOnline: false,
    latitude: 40.75177,
    longitude: -73.85448,
    title: 'FINAL FANTASY Prerelease',
    eventTemplateId: '2Zi94Ab7T8Gl6J7BEXF1v0',
    pairingType: 'SWISS',
    phoneNumber: '929-522-0288',
    requiredTeamSize: 1,
    rulesEnforcementLevel: 'CASUAL',
    scheduledStartTime: '2025-06-07T18:00:00.0000000Z',
    startingTableNumber: 1,
    status: 'SCHEDULED',
    tags: ['magic:_the_gathering', 'magic_prerelease', 'sealed_deck'],
    timeZone: 'America/New_York',
    cardSet: { id: '5BJjPazILvmMuReKwNVjJ6', __typename: 'CardSet' },
    entryFee: { amount: 4000, currency: 'USD', __typename: 'Money' },
    organization: {
      id: '6331',
      isPremium: false,
      name: 'Card Quest',
      __typename: 'Organization'
    },
    eventFormat: { id: '6NBaFsOfSbfCl7Ea12oyl3', __typename: 'EventFormat' },
    __typename: 'Event'
  },
  {
    id: '8454513',
    capacity: null,
    description: 'Format: Sealed\n' +
      '3 rounds of Swiss Rounds\n' +
      'Prizing will be based on records\n' +
      'Every match win earns you 2 Play booster packs! (Draws gets you 1 pack)\n' +
      'If you win no matches, you will still earn 1 Play booster pack at the end',
    distance: 3109.15754666,
    emailAddress: 'cardquest201@gmail.com',
    hasTop8: false,
    isAdHoc: false,
    isOnline: false,
    latitude: 40.75177,
    longitude: -73.85448,
    title: 'FINAL FANTASY Prerelease',
    eventTemplateId: '2Zi94Ab7T8Gl6J7BEXF1v0',
    pairingType: 'SWISS',
    phoneNumber: '929-522-0288',
    requiredTeamSize: 1,
    rulesEnforcementLevel: 'CASUAL',
    scheduledStartTime: '2025-06-08T18:00:00.0000000Z',
    startingTableNumber: 1,
    status: 'SCHEDULED',
    tags: ['magic:_the_gathering', 'magic_prerelease', 'sealed_deck'],
    timeZone: 'America/New_York',
    cardSet: { id: '5BJjPazILvmMuReKwNVjJ6', __typename: 'CardSet' },
    entryFee: { amount: 4000, currency: 'USD', __typename: 'Money' },
    organization: {
      id: '6331',
      isPremium: false,
      name: 'Card Quest',
      __typename: 'Organization'
    },
    eventFormat: { id: '6NBaFsOfSbfCl7Ea12oyl3', __typename: 'EventFormat' },
    __typename: 'Event'
  }
];

test('should fetch prerelease events', async () => {
  const orgIds = ['6331'];

  axios.post.mockImplementation(() => Promise.resolve({
    data: {
      data: {
        searchEvents: {
          events: mockPrereleaseEvents
        }
      }
    }
  }))

  const prereleaseEvents = await getPrereleaseEvents(orgIds);
  expect(prereleaseEvents).toEqual(mockPrereleaseEvents)
});