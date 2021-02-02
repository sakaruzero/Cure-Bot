const { Command } = require('@sakaruzero/klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['setLanguage'],
			cooldown: 10,
			description: language => language.get('CMD_LANGUAGE_DESCRIPTION'),
			permissionLevel: 0,
			runIn: ['text'],
			usage: '[reset|language:str{1,5}]'
		});
	}
	async run(msg, [language]) {
		if (!language) return msg.send(msg.language.get('CMD_LANGUAGE_CURRENT_IS') +` \`${msg.guild.settings.language}\``);
		if (!await msg.hasAtLeastPermissionLevel(6))
			return msg.reply(`<:no:607692716612124693> ` + msg.language.get('INHIBITOR_PERMISSIONS'))
		if (language === 'reset') return this.reset(msg);
		if (msg.guild.settings.language === language) return msg.sendLocale('CMD_LANGUAGE_NOCHANGE', [language])
		const change = await msg.guild.settings.update('language', language);
		return this.check(msg, [language], change) || msg.sendMessage(msg.language.get('CMD_LANGUAGE_SUCCESS_UPDATED') +` \`${language}\``);
	};

	async reset(msg) {
		await msg.guild.settings.reset('language');
		return msg.sendMessage(msg.language.get('CMD_LANGUAGE_SUCCESS_RESET'));
	};

	check(msg, [language], { errors  }) {
		if (errors.length) return msg.sendLocale('CMD_LANGUAGE_ERROR_CANNOTFIND', [language]);
		return null;
	};

};
