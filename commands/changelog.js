const { Command } = require('@sakaruzero/klasa');
const Discord = require('discord.js');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			guarded: true,
			description: language => language.get('CMD_CHANGELOG_DESCRIPTION')
		});
	}
	async run(msg) {
    const embedInfo = new Discord.MessageEmbed()
      .setColor(0xFF00F0)
      .setTitle(`Cure Bot :: ` + msg.language.get('CMD_CHANGELOG_TEXT'))
      .setDescription([
				msg.language.get('CMD_CHANGELOG_FULL_INFO_WEB') + ': <https://curebot.xyz/changelog>\n\n',
				'**« 1.1.6 beta »**\n', // 1.1.6 beta
				'**General changes**',
				'• Fixed several issues',
				'• Added `reminder` command',
				'• Added `rmeme` command',
				'• Changed `precure birthday` to `birthday` command',
				'• Changed `precure guide` to `guide` command',
				'• Changed `precure meme` to `meme` command',
				'• Changed `precure quote` to `quote` command',
				'• Changed `precure screenshot` to `screenshot` command',
				'• Changed `precure info` to `info` command\n',
				'**« 1.1.5 beta »**\n', // 1.1.5 beta
				'**General changes**',
				'• Changed `precure_birthday` to `precure birthday` command',
				'• Changed `precure_guide` to `precure guide` command',
				'• Changed `precure_meme` to `precure meme` command',
				'• Changed `precure_quote` to `precure quote` command',
				'• Changed `precure_screenshot` to `precure screenshot` command',
				'• Changed `precure_info` to `precure info` command',
				'• Improved `precure guide` command UX',
				'• Improved `help` command UX; major changes',
				'• Migrated `about` and `stats` into `botinfo` command\n',
				'**« 1.1.2 beta (rev. 1) »**\n', // 1.1.0 beta (rev. 1)
				'**General changes**',
				'• Improved `userinfo` command UX',
				'• Removed `trivia` command'
			])
		return msg.send(embedInfo);
	};

};
