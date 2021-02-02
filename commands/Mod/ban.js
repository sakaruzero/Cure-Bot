const { Command } = require('@sakaruzero/klasa');
const Discord = require('discord.js');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
      aliases: ['banhammer'],
			cooldown: 1,
			description: language => language.get('CMD_MOD_BAN_DESCRIPTION'),
			permissionLevel: 0,
			runIn: ['text'],
			usage: '[member:user] [reason:...string]',
			usageDelim: ' '
		});
	}
	async run(msg, [user, reason]) {
    // check permission if ok/deny
    if (msg.member.hasPermission('BAN_MEMBERS')) {
      //okPermission
    } else {
      //denyPermission (who dont have permission with BAN_MEMBERS)
      const embedNoPermission = new Discord.MessageEmbed()
      	.setColor(0xFF00F0)
				.setAuthor(msg.author.username, msg.author.displayAvatarURL())
      	.setTitle(`<:no:607692716612124693> ${msg.language.get('TEXT_INSUFFICIENT_PERMISSIONS')}`)
      	.setDescription(`${msg.language.get('TEXT_INSUFFICIENT_PERMISSIONS_MESSAGE')}`)
      	.addField(`« ${msg.language.get('TEXT_INSUFFICIENT_PERMISSIONS_USER_PERMISSIONS')} »`, '- `BAN MEMBERS`')
				.setTimestamp()
				.setFooter(msg.author.tag);
      return msg.send(embedNoPermission);
    };

		// EMBED()
		const embedInvalid = new Discord.MessageEmbed()
      .setColor(0xFF00F0)
      .setTitle(`<:no:607692716612124693> ${msg.language.get('TEXT_INCORRECT_USAGE')}`)
      .setDescription(`${msg.language.get('TEXT_INCORRECT_USAGE_MSG_VALID')} \`@mention\`, or \`ID\` ${msg.language.get('TEXT_INCORRECT_USAGE_MSG_VALID_MEMBERID')}`)
			.setTimestamp()
			.setFooter(msg.author.tag);
		const embedErrYourself = new Discord.MessageEmbed()
      .setColor(0xFF00F0)
      .setTitle(`<:no:607692716612124693> ${msg.language.get('TEXT_INCORRECT_USAGE')}`)
      .setDescription(`${msg.language.get('CMD_MOD_BAN_ERR_YOURSELF')}`)
			.setTimestamp()
			.setFooter(msg.author.tag);
		const embedErrMyself = new Discord.MessageEmbed()
      .setColor(0xFF00F0)
      .setTitle(`<:no:607692716612124693> ${msg.language.get('TEXT_INCORRECT_USAGE')}`)
      .setDescription(`${msg.language.get('CMD_MOD_BAN_ERR_BOTCLIENT')}`)
			.setTimestamp()
			.setFooter(msg.author.tag);
    const embedErrHighestRole = new Discord.MessageEmbed()
      .setColor(0xFF00F0)
      .setTitle(`<:no:607692716612124693> ${msg.language.get('TEXT_INCORRECT_USAGE')}`)
      .setDescription(`${msg.language.get('CMD_MOD_BAN_ERR_BOTCLIENT_HIGHEST_POSITION')}`)
			.setTimestamp()
			.setFooter(msg.author.tag);
    const embedErrBannable = new Discord.MessageEmbed()
      .setColor(0xFF00F0)
      .setTitle(`<:no:607692716612124693> ${msg.language.get('TEXT_INSUFFICIENT_PERMISSIONS')}`)
      .setDescription(`${msg.language.get('CMD_MOD_BAN_ERR_BOTCLIENT_BANNABLE')}`)
			.setTimestamp()
			.setFooter(msg.author.tag);

    // valid: @mention or ID
    if (!user) return msg.send(embedInvalid);
		if (user.id === msg.author.id) return msg.send(embedErrYourself);
		if (user.id === this.client.user.id) return msg.send(embedErrMyself);
		const member = await msg.guild.members.fetch(user).catch(() => null);
		if (member) {
			if (member.roles.highest.position >= msg.member.roles.highest.position) return msg.send(embedErrHighestRole);
			if (!member.bannable) return msg.send(embedErrBannable);
		};
		const options = {};
		if (reason) options.reason = reason;
		const bans = await msg.guild.fetchBans();
		if (bans.has(user.id)) {
			let { reason } = (bans.get(user.id))
			if (!reason) reason = msg.language.get('TEXT_NO_REASON')
			const embedErrBannedAlready = new Discord.MessageEmbed()
				.setColor(0xFF00F0)
				.setDescription(`${user.tag} ${msg.language.get('CMD_MOD_BAN_BANNED_ALREADY')}`)
				.addField(`« ${msg.language.get('TEXT_REASON')} »`, `${reason}`)
				.setTimestamp()
				.setFooter(msg.author.tag);
			return msg.send(embedErrBannedAlready);
		};
    // successfully -> action
		if (reason) {
			// with reason
			const embedSuccessfullyAction = new Discord.MessageEmbed()
	      .setColor(0xFF00F0)
	      .setDescription(`**${user.tag}** ${msg.language.get('CMD_MOD_BAN_BANNED')}`)
				.addField(`« ${msg.language.get('TEXT_REASON')} »`, `${reason}`)
				.setTimestamp()
				.setFooter(msg.author.tag);
			await msg.guild.members.ban(user, options);
			return msg.send(embedSuccessfullyAction);
		} else {
			// without reason
			const embedSuccessfullyAction = new Discord.MessageEmbed()
	      .setColor(0xFF00F0)
	      .setDescription(`**${user.tag}** ${msg.language.get('CMD_MOD_BAN_BANNED')}`)
				.setTimestamp()
				.setFooter(msg.author.tag);
			await msg.guild.members.ban(user, options);
			return msg.send(embedSuccessfullyAction);
		};
	};

};
