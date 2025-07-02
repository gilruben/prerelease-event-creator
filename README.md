# Prerelease Event Creator

A Discord bot that automatically creates and manages Magic: The Gathering prerelease events by fetching data from Wizards of the Coast's API and creating corresponding Discord scheduled events.

## Overview

This bot helps Discord servers updated with upcoming Magic: The Gathering prerelease events. It automatically:

- Fetches prerelease events from Wizards of the Coast's API for specified stores
- Creates Discord scheduled events for events within the next month
- Syncs event details (like entry fees) when they change
- Prevents duplicate event creation
- Cleans up expired events from storage

## Features

- **Automatic Event Discovery**: Queries Wizards API for prerelease events within a 10-mile radius
- **Discord Integration**: Creates scheduled events with all relevant details
- **Smart Duplicate Prevention**: Uses local storage to avoid creating duplicate events
- **Event Synchronization**: Updates Discord events when entry fees or other details change
- **Store-Specific**: Works with authorized store IDs only
- **Automatic Cleanup**: Removes expired events from storage

## Prerequisites

- Node.js (v22.14.0 or higher)
- A Discord bot token
- A Discord server (guild) where the bot has permissions to create scheduled events
- Store IDs from Wizards of the Coast for the stores you want to track.

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prerelease-event-creator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
CLIENT_TOKEN=your_discord_bot_token_here
GUILD_ID=your_discord_guild_id_here
```

4. Copy `src/storeIds.example.js` to `src/storeIds.js` and add your store IDs:
```javascript
const storeIds = [
  "store_id_1",
  "store_id_2",
  // Add more store IDs as needed
];

module.exports = { storeIds };
```

## Configuration

### Discord Bot Setup

1. Create a Discord application at [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a bot for your application
3. Copy the bot token to your `.env` file
4. Invite the bot to your Discord server with the following permissions:
   - Manage Events

### Store IDs

To find your store IDs:
1. Go to [Wizards Event Locator](https://locator.wizards.com/)
2. Search for your store
3. The store ids can be found by inspecting the graphql requests in the network tab

## Usage

### Starting the Bot

```bash
npm start
```

The bot will:
1. Connect to Discord
2. Fetch prerelease events from Wizards API
3. Create Discord events for new prerelease events
5. Clean up expired events from storage

### Resync Events

To manually resync Discord events with Wizards data:

```bash
node src/scripts/resyncDiscordEvent.js
```

## API Integration

### Wizards of the Coast API

The bot queries the Wizards GraphQL API to fetch prerelease events with the following criteria:
- Location: 40.7245678, -73.8457658 (New York area)
- Radius: 10 miles (16,093 meters)
- Event type: Magic: The Gathering prerelease events
- Time range: Events within the next month

### Discord API

Creates scheduled events with:
- Event title from Wizards data
- Entry fee (converted from cents to dollars)
- Store name as location
- Link to official Wizards event page
- Start/end times (end time set to 11:59 PM on event day)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `CLIENT_TOKEN` | Discord bot token | Yes |
| `GUILD_ID` | Discord server (guild) ID | Yes |

## Dependencies

- **discord.js**: Discord bot framework
- **axios**: HTTP client for API calls
- **node-persist**: Local storage for tracking events
- **dotenv**: Environment variable management
- **console-stamp**: Timestamped console logging

## Development

### Running Tests

```bash
npm test
```

### Adding New Features

1. The main business logic is in `src/utils/helpers.js`
2. Discord interactions are handled in `src/utils/discord.js`
3. Wizards API calls are in `src/utils/wizards.js`
4. Storage operations are in `src/utils/storage.js`

## Troubleshooting

### Common Issues

1. **Bot not connecting**: Check your `CLIENT_TOKEN` in the `.env` file
2. **Guild not found**: Verify your `GUILD_ID` and ensure the bot is in the server
3. **No events created**: Check your store IDs and ensure they have upcoming prerelease events
4. **Permission errors**: Make sure the bot has "Manage Events" permission

### Logs

The bot uses timestamped console logging. Check the console output for:
- Connection status
- Events being created/updated
- API errors
- Storage operations
