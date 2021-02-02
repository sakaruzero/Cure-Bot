const { Monitor } = require('@sakaruzero/klasa');
const Discord = require('discord.js');

module.exports = class extends Monitor {
	constructor(...args) {
		super(...args, { ignoreOthers: false });
		this.ignoreEdits = !this.client.options.commandEditing;
	}
	async run(message) {
		if (!message.commandText && message.prefix === this.client.mentionPrefix) {
      const embed = new Discord.MessageEmbed()
        .setColor(0xFF00F0)
        .setAuthor(`${message.language.get('GENERAL_BOTNAME')}`, message.client.user.displayAvatarURL({ format: "png", dynamic: true, size: 128}))
        .setDescription([
          `${message.language.get('GENERAL_PREFIX_MESSAGE', message.guildSettings.prefix.length ? message.guildSettings.prefix : undefined)}\n`,
          '*Watch precure with us* <a:hinatadance:683755195783839839>'
        ])
        .addField(message.language.get('GENERAL_PREFIX_INFO'), `${message.language.get('GENERAL_PREFIX_HELPER', message.guildSettings.prefix.length ? message.guildSettings.prefix : undefined)}`)
        .setTimestamp()
        .setFooter(message.author.tag);
      return message.send(embed);
		}
		if (!message.commandText) return undefined;
	};

};
