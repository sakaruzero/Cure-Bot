const { Command } = require('@sakaruzero/klasa');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const ZWS = '\u200B';

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['ud', 'urbandictionary'],
			requiredPermissions: ['EMBED_LINKS'],
			description: language => language.get('CMD_FUN_URBAN_DESCRIPTION'),
			usage: '<query:string> [page:integer{0,10}]',
			usageDelim: ', '
		});
	}
	async run(msg, [query, ind = 1]) {
		const index = ind - 1;
		if (index < 0) {
			throw msg.language.get('CMD_FUN_URBAN_ERROR_ZERO');
		}
		const response = await fetch(`http://api.urbandictionary.com/v0/define?term=${encodeURIComponent(query)}`);
		const { list } = await response.json();
		const result = list[index];
		if (typeof result === 'undefined') {
			throw index === 0 ?
				msg.language.get('CMD_FUN_URBAN_ERROR_NOTFOUND') :
				msg.language.get('CMD_FUN_URBAN_ERROR_NOTFOUNDTRY');
		}
		const definition = this.content(result.definition, result.permalink);
		return msg.sendEmbed(new MessageEmbed()
			.setTitle(`:notebook_with_decorative_cover: ${(query)}`)
			.setColor(0xFF00F0)
			.setThumbnail('http://i.imgur.com/CcIZZsa.png')
			.setDescription([
				`${msg.language.get('CMD_FUN_URBAN_INFO_TEXT_LINK')}: ${result.permalink}`
			])
			.addFields(
				{ name: msg.language.get('CMD_FUN_URBAN_INFO_TEXT_DEFINITION') + ` ${ind}/${list.length}\n`, value: `${definition}` },
				{ name: msg.language.get('CMD_FUN_URBAN_INFO_TEXT_EXAMPLE'), value: `${this.cutText(result.example, 750)}` },
				{ name: msg.language.get('CMD_FUN_URBAN_INFO_TEXT_VOTE'), value: `👍 **${result.thumbs_up}** \u2800\u2800 👎 **${result.thumbs_down}**` },
				{ name: msg.language.get('CMD_FUN_URBAN_INFO_TEXT_AUTHOR'), value: `${result.author}` },
			)
			.setTimestamp()
			.setFooter(`urban`));
	};

	content(definition, permalink) {
		if (definition.length < 750) return definition;
		return `${this.cutText(definition, 750)}... [continue reading](${permalink})`;
	};

	cutText(str, length) {
		if (str.length < length) return str;
		const cut = this.splitText(str, length - 3);
		if (cut.length < length - 3) return `${cut}...`;
		return `${cut.slice(0, length - 3)}...`;
	};

	splitText(str, length, char = ' ') {
		const x = str.substring(0, length).lastIndexOf(char);
		const pos = x === -1 ? length : x;
		return str.substring(0, pos);
	};

};
