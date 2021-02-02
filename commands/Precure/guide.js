const { Command } = require('@sakaruzero/klasa');
const Discord = require('discord.js');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			aliases: ['pguide'],
			description: language => language.get('CMD_PRECURE_GUIDE_DESCRIPTION'),
			usage: '[string:...string]',
			usageDelim: ' '
		});
	}
	async run(msg, [string]) {
		//if (string === 'here') return this.custom1(msg);
		const embedGuide = new Discord.MessageEmbed()
      .setColor(0xFF00F0)
      .setTitle(msg.language.get('CMD_PRECURE_TITLE_GUIDE'))
      .setDescription([
        `${msg.language.get('CMD_PRECURE_GUIDE_DISPLAY_INFO')}\n`,
				'• <https://myanimelist.net/blog/Inubashiri>'
      ])
			.attachFiles([{ attachment: './images/guide.png' }])
			.setImage('attachment://guide.png')
      .setTimestamp()
      .setFooter(msg.author.tag);
    return msg.send(embedGuide);
  };

	//async custom1(msg) {
		//to-do something
	//};

};
