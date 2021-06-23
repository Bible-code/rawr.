const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
module.exports = class KissCommand extends BaseCommand {
  constructor() {
    super('kiss', 'fun', []);
  }

  async run(client, message, args) {
    const mentionedMember = message.mentions.members.first();
    if (!mentionedMember) return message.channel.send (`https://cdn.discordapp.com/emojis/843748646977142804.gif?v=1`)
    message.channel.send (` ${mentionedMember} https://cdn.discordapp.com/emojis/843748646977142804.gif?v=1`)
  }
  }