const { Command } = require('@sakaruzero/klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			guarded: true,
			description: language => language.get('CMD_PING_DESCRIPTION'),
			aliases: ['pong']
		});
	}
	async run(msg) {
		const msgEdit = await msg.sendLocale('CMD_PING');
		return msg.sendLocale('CMD_PINGPONG', [(msgEdit.editedTimestamp || msgEdit.createdTimestamp) - (msg.editedTimestamp || msg.createdTimestamp), Math.round(this.client.ws.ping)]);
	};

};
