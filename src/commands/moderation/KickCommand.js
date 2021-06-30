const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You cannot use this command.");
    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('I do not have the \`KICK_MEMBERS\` permission.');
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";
    const kickEmbed = new Discord.MessageEmbed()
    .setTitle(`You were kicked from ${message.guild.name}`)
    .setDescription(`Reason: ${reason}`)
    .setColor("WHITE")
    .setTimestamp()
    .setFooter(client.user.tag, client.user.displayAvatarURL())

    // -kick @user reason
    if(!args[0]) return message.channel.send('Who would you like me to kick? \`rawr kick @user reason\`');
    if (!mentionedMember.kickable) return message.channel.send('Unable to kick this member.')
    if (!mentionedMember) return message.channel.send("The member you mentioned is not in the server :/");
    try {
      message.channel.send(`User has been kicked for "${reason}" `);
      await mentionedMember.send(kickEmbed);
    } catch (err) {
      console.log('Unable to message the member.')
    }
    try {
      await mentionedMember.kick(reason)
    } catch (err) {
      console.log(err);
      message.channel.send("Unable to kick this member.")
    }
  }
}