const { Command } = require('@sakaruzero/klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['choose', 'decide', 'pick'],
			description: language => language.get('CMD_FUN_CHOICE_DESCRIPTION'),
			usage: '<choices:str> [...]',
			usageDelim: '|'
		});
	}
	run(msg, choices) {
		return msg.reply(choices.length === 1 ?
			msg.language.get('CMD_FUN_CHOICE_INVALID') :
			`<a:aLalaThinking:622114866744000543> | ` + msg.language.get('CMD_FUN_CHOICE_ANSWER') + ` **${choices[Math.floor(Math.random() * choices.length)]}**`);
	};

};
