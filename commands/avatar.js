const { Command } = require('@sakaruzero/klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			enabled: true,
			cooldown: 1,
			description: language => language.get('CMD_AVATAR_DESCRIPTION'),
			usage: '[user:user]'
		});
	}

	async run(msg, [user = msg.author]) {
		const avatar = user.displayAvatarURL({ format: "png", dynamic: true, size: 2048 });

		return msg.sendEmbed(new MessageEmbed()
			.setColor(0xFF00F0)
			.setAuthor(user.username, avatar)
			.setImage(avatar)
			.setDescription(`${msg.language.get('CMD_AVATAR_AVATARURL')}: [${msg.language.get('TEXT_CLICKHERE')}](${user.avatarURL({ format: "png", dynamic: true, size: 2048 })})`));
	};

};
