const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class WhatsCommand extends BaseCommand {
  constructor() {
    super('whats', 'fun', ['calculate', 'calculate', 'calc']);
  }

  async run(client, message, args) {
    const firstValue = Number(args[0]);
    const secondValue = Number(args[2]);

    if (!args[0]) return message.channel.send(`Input the correct amount of arguments \`${client.prefix} whats number [ +, -, x, / number\`] `)
    if (!firstValue) return message.channel.send('The first value stated is not a number.');
    if (!args[1]) return message.channel.send('Please use one of the following: +, -, x, /');
    if (!['+', '-', 'x', '/'].includes(args[1])) return message.channel.send('Please use one of the following: +, -, x, /');
    if (!secondValue) return message.channel.send('The second value stated is not a number.');

    if (args[1] == '+') {
      let result = firstValue + secondValue;
      message.channel.send(`${firstValue} + ${secondValue} = ${result}.`);
    }
    if (args[1] == '-') {
      let result = firstValue - secondValue;
      message.channel.send(`${firstValue} - ${secondValue} = ${result}.`);
    }
    if (args[1] == 'x') {
      let result = firstValue * secondValue;
      message.channel.send(`${firstValue} x ${secondValue} = ${result}.`);
    }
    if (args[1] == '/') {
      let result = firstValue / secondValue;
      message.channel.send(`${firstValue} / ${secondValue} = ${result}.`);
    }
  }
}