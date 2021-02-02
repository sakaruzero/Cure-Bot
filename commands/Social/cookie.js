const { Command } = require('@sakaruzero/klasa');
const Discord = require('discord.js');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['givecookie'],
			usage: '[member:user] [give:str]',
			description: language => language.get('CMD_SOCIAL_COOKIE_DESCRIPTION'),
			usageDelim: ' '
		});
	}
	async run(msg, [member, give]) {
    msg.channel.send(msg.language.get('TEXT_COMMAND_DEVELOPMENT'));
	};

};
