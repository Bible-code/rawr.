
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const config = require('../slappey.json');
const client = new Client();

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = ";";
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login('ODU3MTYzMTk5MTA3MDM5MjMy.YNLlbw.hpzDDDmCezZ0wr0tlk-hXgnKy0I');
})();

