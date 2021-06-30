
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('../src/utils/registry');
const config = require('../slappey.json');
const client = new Client();

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = ("rawr " || "Rawr");
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login('ODU3MjE1NDk3NTEwMTkxMTI0.YNMWJA.I5U4CfZJcrmb3Asw9Tyc229e-ZE');
})();

