const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('ban', 'moderation', []);
  }

 async run(client, message, args) {
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You cannot use this command.');
  if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I do not have the \`BAN_MEMBERS\` permission.');
  
  let reason = args.slice(1).join(" ");
  const mentionedMember = message.mentions.members.first();

  if (!reason) reason = 'No reason provided';
  if (!args[0]) return message.channel.send('Who do you want to ban? \`;ban @user reason\`')
  if (!mentionedMember) return message.channel.send("The member you mentioned is not in the server :/");
  if (!mentionedMember.bannable) return message.channel.send('Unable to ban this member.')


  const banEmbed = new Discord.MessageEmbed()
  .setTitle(`You were banned from ${message.guild.name}`)
    .setDescription(`Reason: ${reason}`)
    .setColor("WHITE")
    .setTimestamp()
    .setFooter(client.user.tag, client.user.displayAvatarURL());

    await mentionedMember.send(banEmbed).catch(err => console.log(err));
    await mentionedMember.ban({
     days: 7, 
     reason: reason
  }).catch(err => console.log(err)).then(() => message.channel.send(`User has been banned for "${reason}" `));
  }
}