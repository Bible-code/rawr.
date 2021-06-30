const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RpsCommand extends BaseCommand {
  constructor() {
    super('rps', 'fun', []);
  }

  async run(client, message, args) {
    const botChoice = Math.floor(Math.random() * 2) + 1 //Random number between 1 and 3.
    let botEmoji;
    let playerEmoji;
    let botChoiceString;

    if (!args[0]) return message.channel.send('Rock, Paper, or Scissors bruh.');
    if (!['rock', 'paper', 'scissors'].includes(args[0])) return message.channel.send('Your choice is invalid.');

    if (botChoice == 1) {
      botChoiceString = 'rock';
      botEmoji = ':rock: Rock';
    }

    if (botChoice == 2) {
      botChoiceString = 'paper';
      botEmoji = ':newspaper: Paper';
    }
    if (botChoice == 3) {
      botChoiceString = 'scissors';
      botEmoji = ':scissors: Scissors';
    }
    if (args[0] == 'rock') playerEmoji = ':rock: Rock';
    if (args[0] == 'paper') playerEmoji = ':newspaper: Paper';
    if (args[0] == 'scissors') playerEmoji = ':scissors: Scissors';
    console.log(botChoice);
    console.log(botEmoji);

    if (botChoiceString == args[0]) return message.channel.send(`I picked ${botEmoji}, you picked ${playerEmoji}. We tied.`)
    if (args[0] == 'rock') {
      if (botChoiceString == 'paper') return message.channel.send(`I picked ${botEmoji}, you picked ${playerEmoji}. I win.`)
      else return message.channel.send(`I picked ${botEmoji}, you picked ${playerEmoji}. You win.`)
    } else if (args[0] == 'paper') {
      if (botChoiceString == 'scissors') return message.channel.send(`I picked ${botEmoji}, you picked ${playerEmoji}. I win.`)
      else return message.channel.send(`I picked ${botEmoji}, you picked ${playerEmoji}. You win.`)
    } else if (args[0] == 'scissors') {
      if (botChoiceString == 'rock') return message.channel.send(`I picked ${botEmoji}, you picked ${playerEmoji}. I win.`)
      else return message.channel.send(`I picked ${botEmoji}, you picked ${playerEmoji}. You win.`)
    }
  }
}