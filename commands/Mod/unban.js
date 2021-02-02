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
			usage: '[user:user] [reason:...string]',
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
      .setDescription(`${msg.language.get('TEXT_INCORRECT_USAGE_MSG_VALID')} \`ID\` ${msg.language.get('TEXT_INCORRECT_USAGE_MSG_VALID_MEMBERID')}`)
			.setTimestamp()
			.setFooter(msg.author.tag);
		const embedErrYourself = new Discord.MessageEmbed()
      .setColor(0xFF00F0)
      .setTitle(`<:no:607692716612124693> ${msg.language.get('TEXT_INCORRECT_USAGE')}`)
      .setDescription(`${msg.language.get('CMD_MOD_UNBAN_ERR_YOURSELF')}`)
			.setTimestamp()
			.setFooter(msg.author.tag);
		const embedErrMyself = new Discord.MessageEmbed()
      .setColor(0xFF00F0)
      .setTitle(`<:no:607692716612124693> ${msg.language.get('TEXT_INCORRECT_USAGE')}`)
      .setDescription(`${msg.language.get('CMD_MOD_UNBAN_ERR_BOTCLIENT')}`)
			.setTimestamp()
			.setFooter(msg.author.tag);
    const embedErrBannable = new Discord.MessageEmbed()
      .setColor(0xFF00F0)
      .setTitle(`<:no:607692716612124693> ${msg.language.get('TEXT_INSUFFICIENT_PERMISSIONS')}`)
      .setDescription(`${msg.language.get('CMD_MOD_UNBAN_ERR_BOTCLIENT_BANNABLE')}`)
			.setTimestamp()
			.setFooter(msg.author.tag);

    // valid: @mention or ID
    if (!user) return msg.send(embedInvalid);
		if (user.id === msg.author.id) return msg.send(embedErrYourself);
		if (user.id === this.client.user.id) return msg.send(embedErrMyself);
		if (!msg.guild.me.hasPermission('BAN_MEMBERS')) {
			if (!user) user.tag = user
			return msg.send(embedErrBannable)
		};
    const bans = await msg.guild.fetchBans();

    // successfully -> action
		if (reason) {
			// with reason
			const embedSuccessfullyAction = new Discord.MessageEmbed()
	      .setColor(0xFF00F0)
	      .setDescription(`${msg.language.get('CMD_MOD_UNBAN_UNBANNED')} **${user.tag}**`)
				.addField(`« ${msg.language.get('TEXT_REASON')} »`, `${reason}`)
				.setTimestamp()
				.setFooter(msg.author.tag);
      if (bans.has(user.id)) {
    		await msg.guild.members.unban(user, reason);
    		return msg.send(embedSuccessfullyAction);
    	};
			if (!user) user.tag = user
			const embedErrNoAction = new Discord.MessageEmbed()
				.setColor(0xFF00F0)
				.setTitle(`<:no:607692716612124693> ${msg.language.get('TEXT_WOOPS')}`)
				.setDescription(`${user.tag} ${msg.language.get('CMD_MOD_UNBAN_NEVER_BANNED')}`)
				.setTimestamp()
				.setFooter(msg.author.tag);
			return msg.send(embedErrNoAction);
		} else {
			// without reason
			const embedSuccessfullyAction = new Discord.MessageEmbed()
	      .setColor(0xFF00F0)
	      .setDescription(`${user.tag} ${msg.language.get('CMD_MOD_UNBAN_UNBANNED')} **${user.tag}**`)
				.setTimestamp()
				.setFooter(msg.author.tag);
      if (bans.has(user.id)) {
    		await msg.guild.members.unban(user);
    		return msg.send(embedSuccessfullyAction);
    	}
			if (!user) user.tag = user
			const embedErrNoAction = new Discord.MessageEmbed()
				.setColor(0xFF00F0)
				.setTitle(`<:no:607692716612124693> ${msg.language.get('TEXT_WOOPS')}`)
				.setDescription(`${user.tag} ${msg.language.get('CMD_MOD_UNBAN_NEVER_BANNED')}`)
				.setTimestamp()
				.setFooter(msg.author.tag);
			return msg.send(embedErrNoAction);
		};
	};

};
