const { Command, Timestamp } = require('@sakaruzero/klasa');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			description: language => language.get('CMD_USERINFO_DESCRIPTION'),
			runIn: ['text'],
			usage: '[Member:member]'
		});
		this.timestamp = new Timestamp('MMMM d, YYYY');
		this.timebasic = new Timestamp('t');
	}
	run(msg, [member = msg.member]) {
		// predefined
		this.statuses = {
			online: msg.language.get('CMD_USERINFO_STATUS1'),
			idle: msg.language.get('CMD_USERINFO_STATUS2'),
			dnd: msg.language.get('CMD_USERINFO_STATUS3'),
			offline: msg.language.get('CMD_USERINFO_STATUS0')
		};
		let a = Date.now() - member.user.createdAt;
		let b = Date.now() - member.joinedTimestamp;
		const createdDate 	= moment.utc(member.user.createdAt).format("MMMM Do YYYY @ h:mm:ss a");
		const createdD 		= Math.floor(a / 86400000);
		const joinedDate 	= moment.utc(member.joinedTimestamp).format("MMMM Do YYYY @ h:mm:ss a");
		const joinedD		= Math.floor(b / 86400000);

		// todo something

		if (member.roles.cache.size > 42) {
			//check if more than 50 roles (avoid to character limits)
			return msg.sendEmbed(new MessageEmbed()
			.setColor(0xFF00F0)
			.setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true, size: 256}))
			.setDescription([
				`**${msg.language.get('CMD_USERINFO_USERNAME')}:** ${member.user.tag}`,
				`**${msg.language.get('CMD_USERINFO_ID')}:** ${member.id}`,
				`**${msg.language.get('CMD_USERINFO_NICKNAME')}:** ${member.nickname || msg.language.get('TEXT_NONE')}`,
				`**${msg.language.get('CMD_USERINFO_CREATEDDATE')}:** ${createdDate} **(**${createdD} days ago**)**`,
				`**${msg.language.get('CMD_USERINFO_JOINEDDATE')}:** ${joinedDate} **(**${joinedD} days ago**)**`,
				`**${msg.language.get('CMD_USERINFO_STATUS')}:** ${this.statuses[member.presence.status]}`,
				``
			])
			.addField(msg.language.get('CMD_USERINFO_ROLES'), msg.language.get('CMD_USERINFO_ROLES_STRING', member, member.roles.cache.size)))
		} else {
			// todo something
			if (member.roles.cache.size > 1) {
				// if a user has atleast 1 role or more
				return msg.sendEmbed(new MessageEmbed()
				.setColor(0xFF00F0)
				.setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true, size: 256}))
				.setDescription([
					`**${msg.language.get('CMD_USERINFO_USERNAME')}:** ${member.user.tag}`,
					`**${msg.language.get('CMD_USERINFO_ID')}:** ${member.id}`,
					`**${msg.language.get('CMD_USERINFO_NICKNAME')}:** ${member.nickname || msg.language.get('TEXT_NONE')}`,
					`**${msg.language.get('CMD_USERINFO_CREATEDDATE')}:** ${createdDate} **(**${createdD} days ago**)**`,
					`**${msg.language.get('CMD_USERINFO_JOINEDDATE')}:** ${joinedDate} **(**${joinedD} days ago**)**`,
					`**${msg.language.get('CMD_USERINFO_STATUS')}:** ${this.statuses[member.presence.status]}`,
					``
				])
				.addField(msg.language.get('CMD_USERINFO_ROLES'), `<@&${member._roles.join('> <@&')}>`))
			} else {
				// if a user has no role
				return msg.sendEmbed(new MessageEmbed()
				.setColor(0xFF00F0)
				.setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true, size: 256}))
				.setDescription([
					`**${msg.language.get('CMD_USERINFO_USERNAME')}:** ${member.user.tag}`,
					`**${msg.language.get('CMD_USERINFO_ID')}:** ${member.id}`,
					`**${msg.language.get('CMD_USERINFO_NICKNAME')}:** ${member.nickname || msg.language.get('TEXT_NONE')}`,
					`**${msg.language.get('CMD_USERINFO_CREATEDDATE')}:** ${createdDate} **(**${createdD} days ago**)**`,
					`**${msg.language.get('CMD_USERINFO_JOINEDDATE')}:** ${joinedDate} **(**${joinedD} days ago**)**`,
					`**${msg.language.get('CMD_USERINFO_STATUS')}:** ${this.statuses[member.presence.status]}`,
					``
				])
				.addField(msg.language.get('CMD_USERINFO_ROLES'), `${msg.language.get('TEXT_NONE')}`))
			}
		}
		//.addField(`» ` + msg.language.get('CMD_USERINFO_PLAYING'), member.presence.activity ? member.presence.activity.name : 'N/A', true)
		//.addField(`» ` + msg.language.get('CMD_USERINFO_HIGHESTROLE'), member.roles.size > 1 ? member.roles.highest.name : 'None', true)
		//.addField(`» ` + msg.language.get('CMD_USERINFO_HOISTROLE'), member.roles.hoist ? member.roles.hoist.name : 'None', true));
	};

};
