const axios = require('axios');

const getPrereleaseEventsPayload = (orgIds) => ({
  query: `query queryEvents(
    $latitude: Float!
    $longitude: Float!
    $maxMeters: maxMeters_Int_NotNull_min_1!
    $tags: [String!]!
    $sort: EventSearchSortField
    $sortDirection: EventSearchSortDirection
    $orgs: [ID!]
    $startDate: DateTime
    $endDate: DateTime
    $page: page_Int_min_0
    $pageSize: pageSize_Int_min_1
  ) {
    searchEvents(
      query: {
      latitude: $latitude
        longitude: $longitude
        maxMeters: $maxMeters
        tags: $tags
        sort: $sort
        sortDirection: $sortDirection
        orgs: $orgs
        startDate: $startDate
        endDate: $endDate
        page: $page
        pageSize: $pageSize
    }
    ) {
      events {
        id
        capacity
        description
        distance
        emailAddress
        hasTop8
        isAdHoc
        isOnline
        latitude
        longitude
        title
        eventTemplateId
        pairingType
        phoneNumber
        requiredTeamSize
        rulesEnforcementLevel
        scheduledStartTime
        startingTableNumber
        status
        tags
        timeZone
        cardSet {
          id
          __typename
        }
        entryFee {
          amount
          currency
          __typename
        }
        organization {
          id
          isPremium
          name
          __typename
        }
        eventFormat {
          id
          __typename
        }
        __typename
      }
      pageInfo {
        page
        pageSize
        totalResults
        __typename
      }
      __typename
    }
  }`,
  variables: {
    "latitude": 40.7245678,
    "longitude": -73.8457658,
    "maxMeters": 16093,
    "tags": [
      "magic:_the_gathering",
      "magic_prerelease"
    ],
    "sort": "distance",
    "sortDirection": "Asc",
    "orgs": orgIds,
    "pageSize": 10,
    "page": 0
  }
});

const getPrereleaseEvents = async (orgIds) => {
  const prereleaseData = await axios
    .post(
      'https://api.tabletop.wizards.com/silverbeak-griffin-service/graphql',
      getPrereleaseEventsPayload(orgIds)
    )
    .then((res) => res.data)
    .catch((err) => {
      console.log(`ERR: ${err.message}`)
    });

  return prereleaseData?.data?.searchEvents?.events
}

module.exports = {
  getPrereleaseEvents
};