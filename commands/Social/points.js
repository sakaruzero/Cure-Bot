const { Command } = require('@sakaruzero/klasa');
const Discord = require('discord.js');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			aliases: ['points', 'exp'],
			description: language => language.get('CMD_SOCIAL_POINTS_DESCRIPTION'),
			usage: '[string:...string]',
			usageDelim: ' '
		});
	}
	async run(msg, [string]) {
		//if (string === 'here') return this.custom1(msg);
		const embed = new Discord.MessageEmbed()
      .setColor(0xFF00F0)
      .setTitle(msg.language.get('CMD_SOCIAL_POINTS_TITLE'))
      .setDescription([
        `You have a total of **${msg.author.settings.xp}** points.`
      ])
      .setFooter(msg.author.tag);
    return msg.send(embed);
  };

	//async custom1(msg) {
		//to-do something
	//};

};
