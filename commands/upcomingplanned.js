const { Command } = require('@sakaruzero/klasa');
const Discord = require('discord.js');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			guarded: true,
			description: language => language.get('CMD_UPCOMINGPLANNED_DESCRIPTION'),
      aliases: ['upcomingfeature', 'upcomingfeatures']
		});
	}
	async run(msg) {
    const embedInfo = new Discord.MessageEmbed()
      .setColor(0xFF00F0)
      .setTitle(`Cure Bot :: ` + msg.language.get('CMD_UPCOMINGPLANNED_TEXT'))
      .setDescription([
				msg.language.get('CMD_UPCOMINGPLANNED_INFO') + '\n',
				'**« 1.2.0 beta (planned / future) »**\n',
				'**Planned features**',
				'• Added `Currency System` in the core',
				'• Added `Leaderboard System` in the core',
				'• Added `Social System` in the core',
				'• Added `balance` command',
				'• Added `leaderboard` command',
				'• Added `timely` command',
				'• Added `rps` command',
				'• Added `weather` command\n',
				'**Planned changes**',
				'• Some major function'
			])
			.setFooter(`🟦 Last Updated: Nov 11, 2020 - 1:00AM (Eastern Time)`)
		return msg.send(embedInfo);
	};

};
