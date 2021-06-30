const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const ms = require('ms')

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You cannot use this command.');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I do not have the \`MANAGE_ROLES\` permission.');

    const muteRole = message.guild.roles.cache.get('843823027111329832');
    const mainRole = message.guild.roles.cache.get('842543994381533254');
    const mentionedMember = message.mentions.members.first();
    let time = args[1];
    let reason = args.slice(2).join(" ");
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}.`)
      .addField(`Duration ${time}`, `Reason: ${reason}`)
      .setTimestamp();

    if (!args[0]) return message.channel.send('Who do you want to mute, and for how long? \` rawr mute @member time reason\`');
    if (!mentionedMember) return message.channel.send('The member you mentioned is not in the server :/');
    if (!reason) reason = 'No reason provided';

    await mentionedMember.roles.add(muteRole.id);
    await mentionedMember.roles.remove(mainRole.id);
    await mentionedMember.send(muteEmbed);

    setTimeout(async function () {
      await mentionedMember.roles.remove(muteRole.id);
      await mentionedMember.roles.add(mainRole.id);
      await mentionedMember.send(`You have been unmuted in ${message.guild.name}`);
    }, ms(time));
  }
}
