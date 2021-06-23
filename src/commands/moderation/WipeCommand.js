const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
module.exports = class WipeCommand extends BaseCommand {
  constructor() {
    super('clear', 'moderation', []);
  }

 async run(client, message, args) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel('You cannot use this command.');
  if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('I do not have the \`MANAGE_MESSAGES\` permission.');
  if (!args[0]) return message.channel.send('How many messages would you like to clear? \`;clear number\`');
  const amountToDelete = Number(args[0], 10);
  
  if (isNaN(amountToDelete)) return message.channel.send('Please state a valid number.');
  if (!Number.isInteger(amountToDelete)) return message.message.channel.send('Please use a whole number.');
  if (!amountToDelete || amountToDelete < 1 || amountToDelete > 100) return message.channel.send('I can only delete 1-100 messages at a time.');
 
  try {
    await message.channel.bulkDelete(amountToDelete)
    .then(messages => message.channel.send(`${messages.size} messages have been deleted.`));
  } catch (err) {
    console.log(err);
    message.channel.send('I was unable to delete the messages. Please make sure they are less than 14 days old.');
  }
  }
}