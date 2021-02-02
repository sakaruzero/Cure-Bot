const { Command, util: { isFunction } } = require('@sakaruzero/klasa');
const Discord = require('discord.js');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			guarded: true,
			aliases: ['h'],
			description: language => language.get('CMD_HELP_DESCRIPTION'),
			usage: '[core|precure|fun|tool|tools|mod|config|Command:command]'
		});
		this.createCustomResolver('command', (arg, possible, message) => {
			if (!arg || arg === '') return undefined;
			return this.client.arguments.get('command').run(arg, possible, message);
		});
	}
	async run(msg, [command]) {

		if (command === 'core') return this.core(msg);
		if (command === 'precure') return this.precure(msg);
		if (command === 'fun') return this.fun(msg);
		if (command === 'tool') return this.tools(msg);
		if (command === 'tools') return this.tools(msg);
		if (command === 'mod') return this.mod(msg);
		if (command === 'config') return this.config(msg);
		const dPrefix = msg.guild.settings.prefix;

		if (command) {
			let commandBasicName = command.name.toString().toUpperCase();
			const helpDisplay = new Discord.MessageEmbed()
				.setColor(0xFF00F0)
				.setTitle(`INFO :: ${commandBasicName}`)
				.setDescription('```' + command.description(msg.language) + '```')
				.addFields(
					{ name: msg.language.get('CMD_HELP_BETA_USAGE'), value: '`' + command.usage.basic(msg) + '`', inline: true },
					{ name: msg.language.get('CMD_HELP_BETA_ALIASES'), value: `${command.aliases.length > 0 ? command.aliases.join(', ') : msg.language.get('TEXT_NONE')}`, inline: true }
				);
			return msg.send(helpDisplay);
		};

		// @version: 1.1 beta
		if (msg.member.hasPermission("ADMINISTRATOR") || msg.member.hasPermission("MANAGE_GUILD") || msg.member.hasPermission('MANAGE_MESSAGES')) {
			// with moderation display
			const embedHelp = new Discord.MessageEmbed()
				.setColor(0xFF00F0)
				.setAuthor(`Help and Commands`, msg.client.user.displayAvatarURL({ format: "png", dynamic: true, size: 128}))
				.setDescription([
					`To check out a command, use \`${dPrefix}help <command>\` for more help.`,
					'(Use lowercase letters)\n',
					'A list of all available commands, visit: <https://curebot.xyz/commands>\n',
					'<:announcement:698825429015986187> **Some features is currently under development. Please be patient while our developer working on it.**',
					'\u200b'
				])
				.addField(`« ${msg.language.get('CMD_HELP_TEXT_EXTRAHELP')} »`, `\`${dPrefix}help core\` - ${msg.language.get('CMD_HELP_TEXT_CORE')}\n\`${dPrefix}help precure\` - ${msg.language.get('CMD_HELP_TEXT_PRECURE')}\n\`${dPrefix}help fun\` - ${msg.language.get('CMD_HELP_TEXT_FUN')}\n\`${dPrefix}help tools\` - ${msg.language.get('CMD_HELP_TEXT_TOOLS')}`)
				.addField(`« ${msg.language.get('CMD_HELP_TEXT_MANAGEMENT')} »`, `\`${dPrefix}help mod\` - ${msg.language.get('CMD_HELP_TEXT_MOD')}\n\`${dPrefix}help config\` - ${msg.language.get('CMD_HELP_TEXT_CONFIG')}`)
				.attachFiles([{ attachment: './images/curebot.png' }])
				.setImage('attachment://curebot.png');
			return msg.send(embedHelp);
		} else {
			// without moderation display
			const embedHelp = new Discord.MessageEmbed()
				.setColor(0xFF00F0)
				.setAuthor(`Help and Commands`, msg.client.user.displayAvatarURL({ format: "png", dynamic: true, size: 128}))
				.setDescription([
					`To check out a command, use \`${dPrefix}help <command>\` for more help.`,
					'(Use lowercase letters)\n',
					'A list of all available commands, visit: <https://curebot.xyz/commands>\n',
					'<:announcement:698825429015986187> **Some features is currently under development. Please be patient while our developer working on it.**',
					'\u200b'
				])
				.addField(`« ${msg.language.get('CMD_HELP_TEXT_EXTRAHELP')} »`, `\`${dPrefix}help core\` - ${msg.language.get('CMD_HELP_TEXT_CORE')}\n\`${dPrefix}help precure\` - ${msg.language.get('CMD_HELP_TEXT_PRECURE')}\n\`${dPrefix}help fun\` - ${msg.language.get('CMD_HELP_TEXT_FUN')}\n\`${dPrefix}help tools\` - ${msg.language.get('CMD_HELP_TEXT_TOOLS')}`)
				.attachFiles([{ attachment: './images/curebot.png' }])
				.setImage('attachment://curebot.png');
			return msg.send(embedHelp);
		}
		//noop
	};

	// <command:help> core
	async core(msg) {
		const dPrefix = msg.guild.settings.prefix;
		const embedHelp = new Discord.MessageEmbed()
			.setColor(0xFF00F0)
			.setAuthor(`${msg.language.get('GENERAL_BOTNAME')} • ${msg.language.get('CMD_HELP_TEXT_CORE')}`, msg.client.user.displayAvatarURL({ format: "png", dynamic: true, size: 128}))
			.setDescription([
				`\u200b`,
				`🔹 **${dPrefix}ping**\nCheck the bot's ping.`,
				`🔹 **${dPrefix}botinfo**\nShows Cure Bot's information.`,
				`🔹 **${dPrefix}invite**\nInvite me to your server.`,
				`🔹 **${dPrefix}avatar**\nGets a user's avatar or someone else.`,
				`🔹 **${dPrefix}userinfo**\nShows info about a user someone else.`,
				`🔹 **${dPrefix}server**\nShows info about the current server.`,
				`🔹 **${dPrefix}changelog**\nShows Cure Bot's changes.`,
				`🔹 **${dPrefix}upcomingplanned**\nShows Cure Bot's upcoming planned.`
			])
		return msg.send(embedHelp);
	};

	// <command:help> precure
	async precure(msg) {
		const dPrefix = msg.guild.settings.prefix;
		const embedHelp = new Discord.MessageEmbed()
			.setColor(0xFF00F0)
			.setAuthor(`${msg.language.get('GENERAL_BOTNAME')} • ${msg.language.get('CMD_HELP_TEXT_PRECURE')}`, msg.client.user.displayAvatarURL({ format: "png", dynamic: true, size: 128}))
			.setDescription([
				'\u200b',
				`🔹 **${dPrefix}birthday**\nGets a list of cure birthdays.`,
				`🔹 **${dPrefix}guide**\nGets a guide infomration about the Precure.`,
				`🔹 **${dPrefix}info**\n-`,
				`🔹 **${dPrefix}meme**\n-`,
				`🔹 **${dPrefix}quote**\n-`,
				`🔹 **${dPrefix}screenshot**\n-`,
				'\u200b',
				'**Precure Puzzlun commands**',
				'\u200b',
				`TBA`,
			])
		return msg.send(embedHelp);
	};

	// <command:help> fun
	async fun(msg) {
		const dPrefix = msg.guild.settings.prefix;
		const embedHelp = new Discord.MessageEmbed()
			.setColor(0xFF00F0)
			.setAuthor(`${msg.language.get('GENERAL_BOTNAME')} • ${msg.language.get('CMD_HELP_TEXT_FUN')}`, msg.client.user.displayAvatarURL({ format: "png", dynamic: true, size: 128}))
			.setDescription([
				'\u200b',
				`🔹 **${dPrefix}8ball**\nAsk me to receive an answer.`,
				`🔹 **${dPrefix}cat**\nPosts a random cat.`,
				`🔹 **${dPrefix}choice**\nMakes a decision for you given some choices.`,
				`🔹 **${dPrefix}dice**\nRun a dice.`,
				`🔹 **${dPrefix}dog**\nPosts a random dog.`,
				`🔹 **${dPrefix}duck**\nPosts a random duck.`,
				`🔹 **${dPrefix}lizard**\nPosts a random lizard.`,
				`🔹 **${dPrefix}obfuscate**\nObfuscate to have confusing letters in it.`,
				`🔹 **${dPrefix}rmeme**\nPosts a random meme from reddit.`,
				`🔹 **${dPrefix}urban**\nFind the definition to your words.`
			])
		return msg.send(embedHelp);
	};

	// <command:help> tools
	async tools(msg) {
		const dPrefix = msg.guild.settings.prefix;
		const embedHelp = new Discord.MessageEmbed()
			.setColor(0xFF00F0)
			.setAuthor(`${msg.language.get('GENERAL_BOTNAME')} • ${msg.language.get('CMD_HELP_TEXT_TOOLS')}`, msg.client.user.displayAvatarURL({ format: "png", dynamic: true, size: 128}))
			.setDescription([
				'\u200b',
				`🔹 **${dPrefix}reminder**\nSchedules a reminder.`,
				`🔹 **${dPrefix}translate**\nTranslates a message.`
			])
		return msg.send(embedHelp);
	};

	// <command:help> mod
	async mod(msg) {
		const dPrefix = msg.guild.settings.prefix;
		const embedHelp = new Discord.MessageEmbed()
			.setColor(0xFF00F0)
			.setAuthor(`${msg.language.get('GENERAL_BOTNAME')} • ${msg.language.get('CMD_HELP_TEXT_MOD')}`, msg.client.user.displayAvatarURL({ format: "png", dynamic: true, size: 128}))
			.setDescription([
				'\u200b',
				`🔹 **${dPrefix}ban**\nBans a user from the current server.`,
				`🔹 **${dPrefix}kick**\nKicks a user from the current server.`,
				`🔹 **${dPrefix}unban**\nUnbans a user from the current server.`,
				`🔹 **${dPrefix}warn**\nWarns a user from the current server.`
			])
		return msg.send(embedHelp);
	};

	// <command:help> config
	async config(msg) {
		const dPrefix = msg.guild.settings.prefix;
		const embedHelp = new Discord.MessageEmbed()
			.setColor(0xFF00F0)
			.setAuthor(`${msg.language.get('GENERAL_BOTNAME')} • ${msg.language.get('CMD_HELP_TEXT_CONFIG')}`, msg.client.user.displayAvatarURL({ format: "png", dynamic: true, size: 128}))
			.setDescription([
				'\u200b',
				`🔹 **${dPrefix}language**\nChanges the language for this server.`,
				`🔹 **${dPrefix}prefix**\nChanges the prefix for this server.`
			])
		return msg.send(embedHelp);
	};

};
