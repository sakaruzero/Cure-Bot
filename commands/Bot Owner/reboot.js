const { Command } = require('@sakaruzero/klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			guarded: true,
			runIn: ['text'],
			permissionLevel: 10,
			description: language => language.get('BOT_REBOOT_DESCRIPTION')
		});
	}
	async run(message) {

		await message.sendLocale('BOT_OWNER_REBOOT').catch(err => this.client.emit('error', err));
		await Promise.all(this.client.providers.map(provider => provider.shutdown()));
		process.exit();
	};

};
