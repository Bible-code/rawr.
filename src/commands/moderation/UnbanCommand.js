const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

 async run(client, message, args) {
  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel('You cannot use this command.');
  if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I do not have the \`BAN_MEMBERS\` permission.');
  
  let reason = args.slice(1).join(" ");
  let userID = args[0];

  if (!reason) reason = 'No reason provided';
  if (!args[0]) return message.channel.send('Who do you want to unban? \`;unban ID reason\`')
  if (!isNaN(args[0])) return message.channel.send('The ID stated is invalid. \`rawr unban ID reason\`')

  message.guild.fetchBans().then(async bans => {
    if (bans.size == 0) return message.channel.send('This server has no banned members.');
    let bUser = bans.find(b => b.user.id == userID);
    if (!bUser) return message.channel.send('The user ID stated is not banned.');
    await message.guild.members.unban(bUser.user, reason).catch(err =>{
      console.log(err);
      return message.channel.send('Something went wrong, go ask xavier.')

    }).then(() => {
      message.channel.send(`Successfully Unbanned ${args[0]}`);
    });
  });

  }
}