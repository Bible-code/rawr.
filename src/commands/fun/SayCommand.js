const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')

module.exports = class SayCommand extends BaseCommand {
  constructor() {
    super('say', 'fun', []);
  }

  async run(client, message, args) {
  const messageToSay = args.join(" ");
  const sayEmbed = new Discord.MessageEmbed()
   .setTitle(`${message.author.username} says: "${messageToSay}"`)
   .setFooter(message.author.tag  , message.author.displayAvatarURL())
   .setColor("WHITE")
   .setTimestamp();
   try {
     message.delete();
     await message.channel.send(sayEmbed);
   } catch(err) {
     console.log(err)
     message.channel.send('Something went wrong, ask xavier for help.')
   }
   
}
}