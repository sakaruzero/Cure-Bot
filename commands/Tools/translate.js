const { Command } = require('@sakaruzero/klasa');
const translate = require('@vitalets/google-translate-api');
const Discord = require('discord.js');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['gt'],
			usage: '[lang|language|langTo:str] [translateText:...str]',
			description: language => language.get('CMD_TOOLS_TRANSLATE_DESCRIPTION'),
			usageDelim: ' '
		});
	}
	async run(msg, [langTo, translateText]) {
    if (langTo === 'language') return this.language(msg);
    if (langTo === 'lang') return this.language(msg);
		//todo
		if (!langTo) {
      const embed = new Discord.MessageEmbed()
        .setColor('0xFF00F0')
        .setDescription(`**${msg.language.get('TEXT_INSUFFICIENT_ARGUMENT')}**\n• ${msg.language.get('TEXT_EXAMPLE')}: \`${msg.guild.settings.prefix}translate ja Hello World\`\n• ${msg.language.get('CMD_TOOLS_TRANSLATE_EXAMPLE_SHOWLANG')}: \`${msg.guild.settings.prefix}translate language\``)
        .setFooter(`Google Translate • Error`);
			return msg.channel.send(embed);
		}
		if(langTo){
			langTo = langTo.toString().toLowerCase();
			if (langTo === 'zh-cn') { langTo = 'zh-CN'; };
			if (langTo === 'zh-tw') { langTo = 'zh-TW'; };
		}
		if (!translateText) {
      const embed = new Discord.MessageEmbed()
        .setColor('0xFF00F0')
        .setDescription(`**${msg.language.get('CMD_TOOLS_TRANSLATE_NO_TRANSLATE')}**\n• ${msg.language.get('TEXT_EXAMPLE')}: \`${msg.guild.settings.prefix}translate ja Hello World\``)
        .setFooter(`Google Translate • Error`);
			return msg.channel.send(embed);
		}
		if(translateText.length>800){
      const embed = new Discord.MessageEmbed()
        .setColor('0xFF00F0')
        .setDescription(`**${msg.language.get('CMD_TOOLS_TRANSLATE_CHARACTERS_LIMIT')}**`)
        .setFooter(`Google Translate • Error`);
			return msg.channel.send(embed);
		}
		translate(translateText, {to: langTo}).then(res => {
      const embed = new Discord.MessageEmbed()
        .setColor('0xFF00F0')
        .setDescription(res.text)
        .setFooter(`Google Translate • Translated from: ${res.from.language.iso} > ${langTo}`);
			msg.channel.send(embed);
		}).catch(err => {
      const embed = new Discord.MessageEmbed()
        .setColor('0xFF00F0')
        .setDescription(`**${msg.language.get('CMD_TOOLS_TRANSLATE_NOTSUPPORTED_LANG1')}** \`${langTo}\` **${msg.language.get('CMD_TOOLS_TRANSLATE_NOTSUPPORTED_LANG2')}**`)
        .setFooter(`Google Translate • Error`);
			return msg.channel.send(embed);
		})
	};

  // language
  async language(msg) {
    let text = '`af` Afrikaans | `sq` Albanian | `am` Amharic | `ar` Arabic | `hy` Armenian | `az` Azerbaijani | `eu` Basque | `be` Belarusian | `bn` Bengali | `bs` Bosnian | `bg` Bulgarian | `ca` Catalan | `ceb` Cebuano | `ny` Chichewa | `zh-CN` Chinese (Simplified) | `zh-TW` Chinese (Traditional) | `co` Croatian | `cs` Czech | `da` Danish | `nl` Dutch | `en` English | `eo` Esperanto | `et` Estonian | `tl` Filipino | `fi` Finnish | `fr` French | `fy` Frisian | `gl` Galician | `ka` Georgian | `de` German | `el` Greek | `gu` Gujarati | `ht` Haitian Creole | `ha` Hausa | `haw` Hawaiian | `he` Hebrew | `hi` Hindi | `hmn` Hmong | `hu` Hungarian | `is` Icelandic | `ig` Igbo | `id` Indonesian | `ga` Irish | `it` Italian | `ja` Japanese | `jw` Javanese | `kn` Kannada | `kk` Kazakh | `km` Khmer | `ko` Korean | `ku` Kurdish (Kurmanji) | `ky` Kyrgyz | `lo` Lao | `la` Latin | `lv` Latvian | `lt` Lithuanian | `lb` Luxembourgish | `mk` Macedonian | `mg` Malagasy | `ms` Malay | `ml` Malayalam | `mt` Maltese | `mi` Maori | `mr` Marathi | `mn` Mongolian | `my` Myanmar (Burmese) | `ne` Nepali | `no` Norwegian | `ps` Pashto | `fa` Persian | `pl` Polish | `pt` Portuguese | `pa` Punjabi | `ro` Romanian | `ru` Russian | `sm` Samoan | `gd` Scots Gaelic | `sr` Serbian | `st` Sesotho | `sn` Shona | `sd` Sindhi | `si` Sinhala | `sk` Slovak | `sl` Slovenian | `so` Somali | `es` Spanish | `su` Sundanese | `sw` Swahili | `sv` Swedish | `tg` Tajik | `ta` Tamil | `te` Telugu | `th` Thai | `tr` Turkish | `uk` Ukrainian | `ur` Urdu | `uz` Uzbek | `vi` Vietnamese | `cy` Welsh | `xh` Xhosa | `yi` Yiddish | `yo` Yoruba | `zu` Zulu';
		return msg.channel.send(`**« ${msg.language.get('CMD_TOOLS_TRANSLATE_LISTAVAILBLE')} »**\n` + text);
	};

};
