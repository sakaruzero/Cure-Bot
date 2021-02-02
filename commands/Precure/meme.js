const { Command } = require('@sakaruzero/klasa');
const Discord = require('discord.js');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			aliases: ['pmeme'],
			description: language => language.get('CMD_PRECURE_MEME_DESCRIPTION'),
			usage: '[string:...string]',
			usageDelim: ' '
		});
	}
	async run(msg, [string]) {

		//if (string === 'here') return this.custom1(msg);
    return msg.send(`${msg.language.get('TEXT_COMMAND_DEVELOPMENT')}`);

  };

	//async custom1(msg) {
		//to-do something
	//};

};
