const { Command, Duration } = require('@sakaruzero/klasa');
const { MessageEmbed, version: discordVersion } = require('discord.js');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			guarded: true,
			description: language => language.get('CMD_BOTINFO_DESCRIPTION'),
			cooldown: 5,
			aliases: ['botinformation', 'stats']
		});
	}
	async run(msg) {
		let [users, guilds, channels, memory] = [0, 0, 0, 0];
		if (this.client.shard) {
			const results = this.client.shard.broadcastEval(`[this.users.cache.size, this.guilds.cache.size, this.channels.cache.size, (process.memoryUsage().heapUsed / 1024 / 1024)]`);
			for (const result of results) {
				users += result[0];
				guilds += result[1];
				channels += result[2];
				memory += result[3];
			};
		};
		return msg.sendEmbed(new MessageEmbed()
			.setColor(0xFF00F0)
			.setAuthor(msg.language.get('GENERAL_BOTNAME') + ` :: ${msg.language.get('GENERAL_VERSION')}`, msg.client.user.displayAvatarURL({ format: "png", dynamic: true, size: 128}))
			.setDescription([
				`${msg.language.get('CMD_BOTINFO_INFO')}`,
				`Connected to **shard ${(msg.guild ? msg.guild.shardID : 0) + 1}/${this.client.options.shardCount}**.`,
				`\u200b`
			])
			//.addField(msg.language.get('CMD_BOTINFO_TEXT_UPTIME'), `${Math.floor((this.client.uptime / (1000 * 60 * 60 * 24)) % 100)} ${msg.language.get('TEXT_DAYS')} : ${Math.floor((this.client.uptime / (1000 * 60 * 60)) % 24)} ${msg.language.get('TEXT_HOURS')} : ${Math.floor((this.client.uptime / (1000 * 60)) % 60)} ${msg.language.get('TEXT_MINUTES')} : ${Math.floor((this.client.uptime / (1000)) % 60)} ${msg.language.get('TEXT_SECONDS')}`  )
			.addField(msg.language.get('CMD_BOTINFO_TEXT_MEMORY'), `\`${(memory || process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} ${msg.language.get('CMD_BOTINFO_TEXT_MEMORYMB')}\``, true)
			.addField(msg.language.get('CMD_BOTINFO_TEXT_BOT_NODEJS'), `\`${process.version}\``, true)
			.addField(msg.language.get('CMD_BOTINFO_TEXT_BOT_LIBRARY'), `\`${discordVersion} (discord.js)\``, true)
			.addField(msg.language.get('CMD_BOTINFO_TEXT_GUILDS'), `\`${(guilds || await this.client.guilds.cache.size).toLocaleString()}\``, true)
			.addField(msg.language.get('CMD_BOTINFO_TEXT_USERS'), `\`${(users || await this.client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c)).toLocaleString()}\``, true)
			.addField(msg.language.get('CMD_BOTINFO_TEXT_CHANNELS'), `\`${(channels || await this.client.channels.cache.size).toLocaleString()}\``, true)
			.addField(msg.language.get('CMD_BOTINFO_TEXT_EMOJIS'), `\`${(channels || await this.client.emojis.cache.size).toLocaleString()}\``, true)
			.addField(msg.language.get('TEXT_BOTOWNER'), `\`sparkle#0001\``, true)
			.addField(msg.language.get('TEXT_WEBSITE'), `[Cure Bot's Website](https://curebot.xyz/)`, true)
			.attachFiles([{ attachment: '/root/projects/bots/_images/curebot.png' }])
			.setImage('attachment://curebot.png')
			.setTimestamp()
			.setFooter(msg.author.tag)
		);
	};

};
