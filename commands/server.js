const { Command, Timestamp } = require('@sakaruzero/klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			description: language => language.get('CMD_SERVERINFO_DESCRIPTION'),
			aliases: ['guild', 'serverinfo'],
			runIn: ['text']
		});
		this.timestamp = new Timestamp('MMMM, d YYYY');
		this.timebasic = new Timestamp('t');
	}
	run(msg) {
		this.verificationLevels = {
			"NONE": msg.language.get('CMD_SERVERINFO_VERIFICATIONLEVELS0'),
			"LOW": msg.language.get('CMD_SERVERINFO_VERIFICATIONLEVELS1'),
			"MEDIUM": msg.language.get('CMD_SERVERINFO_VERIFICATIONLEVELS2'),
			"HIGH": msg.language.get('CMD_SERVERINFO_VERIFICATIONLEVELS3'),
			"VERY_HIGH": msg.language.get('CMD_SERVERINFO_VERIFICATIONLEVELS4')
		};
		this.filterLevels = {
			"DISABLED": msg.language.get('CMD_SERVERINFO_FILTERLEVEL0'),
			"MEMBERS_WITHOUT_ROLES": msg.language.get('CMD_SERVERINFO_FILTERLEVEL1'),
			"ALL_MEMBERS": msg.language.get('CMD_SERVERINFO_FILTERLEVEL2')
		};
		return msg.sendEmbed(new MessageEmbed()
			.setColor(0xFF00F0)
			.setThumbnail(msg.guild.iconURL())
			.addField(`» ` + msg.language.get('CMD_SERVERINFO_SERVERNAME'), msg.guild.name, true)
			.addField(`» ` + msg.language.get('CMD_SERVERINFO_SERVERID'), msg.guild.id, true)
			.addField(`» ` + msg.language.get('CMD_SERVERINFO_TOTAL_MEMBERS'), msg.guild.memberCount, true)
			.addField(`» ` + msg.language.get('CMD_SERVERINFO_TOTAL_ROLES'), msg.guild.roles.cache.size, true)
			.addField(`» ` + msg.language.get('CMD_SERVERINFO_CHANNELS') + ` (**` + msg.guild.channels.cache.size + `**)`, msg.language.get('CMD_SERVERINFO_CHANNELS_CATEGORIES') + `: ` + msg.guild.channels.cache.filter(channel => channel.type === 'category').size + `\n` + msg.language.get('CMD_SERVERINFO_CHANNELS_TEXT') + `: ` + msg.guild.channels.cache.filter(channel => channel.type === 'text').size + ` **|** ` + msg.language.get('CMD_SERVERINFO_CHANNELS_VOICE') + `: ` + msg.guild.channels.cache.filter(channel => channel.type === 'voice').size, true)
			.addField(`» ` + msg.language.get('CMD_SERVERINFO_REGION'), msg.guild.region, true)
			.addField(`» ` + msg.language.get('CMD_SERVERINFO_EXPLICITFILTER'), this.filterLevels[msg.guild.explicitContentFilter], true)
			.addField(`» ` + msg.language.get('CMD_SERVERINFO_VERIFICATIONLEVEL'), this.verificationLevels[msg.guild.verificationLevel], true)
			.addField(`» ` + msg.language.get('CMD_SERVERINFO_SERVEROWNER'), msg.guild.owner ? msg.guild.owner.user.tag : 'None', true)
			.addField(`» ` + msg.language.get('CMD_SERVERINFO_CREATIONDATE'), this.timestamp.display(msg.guild.createdAt) + `\n` + this.timebasic.display(msg.guild.createdAt), true)
			.setTimestamp()
			.setFooter(msg.author.tag)
		);
	};

};
