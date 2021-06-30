const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SlowmodeCommand extends BaseCommand {
  constructor() {
    super('slowmode', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You cannot use this command.")
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`I do not have the \` MANAGE_CHANNELS \` permisson.`);

    //rawr slormode 100

    const value = Number(args[0]);

    if (!args[0]) return message.channel.send('How long should the slowmode be?')
    if (!value || value < 5 || value > 21600) return message.channel.send('Use a number between 5 and 21600 please.');

    try {
      await message.channel.setRateLimitPerUser(value);
      message.channel.send(`Slowmode has been set to ${value} seconds for ${message.channel}.`);
    } catch (err) {
      console.log(err);
      message.channel.send('Something went wrong, ask xavier idk.')
    }
  }
}