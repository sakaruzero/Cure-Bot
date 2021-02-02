const { Command } = require('@sakaruzero/klasa');
const Discord = require('discord.js');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['add'],
			guarded: true,
			description: language => language.get('CMD_INVITE_DESCRIPTION')
		});
	}
	async run(msg) {
		return msg.sendMessage(msg.language.get('CMD_INVITE_INFO') + `\n<https://curebot.xyz/invite>`);
	};

};
