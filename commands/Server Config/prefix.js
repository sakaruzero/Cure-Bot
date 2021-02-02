const { Command } = require('@sakaruzero/klasa');
const Discord = require('discord.js');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['setPrefix'],
			cooldown: 10,
			description: language => language.get('CMD_PREFIX_DESCRIPTION'),
			permissionLevel: 0,
			runIn: ['text'],
			usage: '[reset|prefix:str{1,10}]'
		});
	}
	async run(msg, [prefix]) {
		//<command:prefix>
		if (!prefix) {
			if (msg.member.hasPermission("ADMINISTRATOR") || msg.member.hasPermission("MANAGE_GUILD") || msg.member.hasPermission('MANAGE_MESSAGES')) {
				const embedPrefix = new Discord.MessageEmbed()
				.setColor(0xFF00F0)
				.setTitle(`${msg.guild.name}'s ` + msg.language.get('CMD_PREFIX_CURRENT'))
				.setDescription(msg.language.get('CMD_PREFIX_CURRENT_INFO') + `: \`${msg.guild.settings.prefix}\`\n\n- ` + msg.language.get('CMD_PREFIX_CURRENT_INFO_SETPREFIX') +`:\n\`${msg.guild.settings.prefix}prefix <custom>\`\n\n- ` + msg.language.get('CMD_PREFIX_CURRENT_INFO_RESET') + `:\n\`${msg.guild.settings.prefix}prefix reset\``);
				return msg.send(embedPrefix);
			} else {
				const embedPrefix = new Discord.MessageEmbed()
				.setColor(0xFF00F0)
				.setTitle(`${msg.guild.name}'s ` + msg.language.get('CMD_PREFIX_CURRENT'))
				.setDescription(msg.language.get('CMD_PREFIX_CURRENT_INFO') + `: \`${msg.guild.settings.prefix}\``);
				return msg.send(embedPrefix);
			};
		};

		/* check if <>.member.hasPermission e.g. administrator, manage guild */
		if (!await (msg.member.hasPermission("ADMINISTRATOR") || msg.member.hasPermission("MANAGE_GUILD") || msg.member.hasPermission('MANAGE_MESSAGES')))
			return msg.reply(`<:no:607692716612124693> ` + msg.language.get('INHIBITOR_PERMISSIONS'))

		//<command:prefix> reset
		if (prefix === 'reset') return this.reset(msg);

		//<command:prefix> <to new custom prefix>
		if (msg.guild.settings.prefix === prefix) return msg.sendLocale('CMD_PREFIX_NOCHANGE', [prefix]);
		await msg.guild.settings.update('prefix', prefix);
		return msg.send(msg.language.get('CMD_PREFIX_SUCCESS_UPDATED') +` \`${prefix}\``);
	};

	async reset(msg) {
		await msg.guild.settings.reset('prefix');
		return msg.sendMessage(msg.language.get('CMD_PREFIX_SUCCESS_RESET'));
	};

};
