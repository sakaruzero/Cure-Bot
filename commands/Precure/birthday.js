const { Command } = require('@sakaruzero/klasa');
const ptnEmbed = require('@sakaruzero/djs-pagination');
const Discord = require('discord.js');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			aliases: ['pbirthday'],
			description: language => language.get('CMD_PRECURE_BIRTHDAY_DESCRIPTION'),
			usage: '[string:...string]',
			usageDelim: ' '
		});
	}
	async run(msg, [string]) {

		const CuresBirthday1 = new Discord.MessageEmbed()
			.setColor(0xFF00F0)
      .setTitle(msg.language.get('CMD_PRECURE_TITLE_BIRTHDAY'))
      .setDescription([
				'**January**',
				'```fix',
				'JAN. 7  :: Cure Whip (Ichika)',
				'JAN. 20 :: Cure Yell (Hana)',
				'```',
				'**February**',
				'```fix',
				'NONE',
				'```',
				'**March**',
				'```fix',
				'MAR. 9  :: Cure Grace (Nodoka)',
				'MAR. 10 :: Cure Mint (Komachi)',
				'```'
      ])
      .setTimestamp()
      .setFooter(msg.author.tag);

		const CuresBirthday2 = new Discord.MessageEmbed()
			.setColor(0xFF00F0)
      .setTitle(msg.language.get('CMD_PRECURE_TITLE_BIRTHDAY'))
      .setDescription([
				'**April**',
				'```fix',
				'APR. 4  :: Cure White (Honoka)',
				'APR. 8  :: Cure Etoile (Homare)',
				'APR. 10 :: Cure Flora (Haruka)',
				'APR. 12 :: Cure Star (Hikaru)',
				'APR. 16 :: Cure Custard (Himari)',
				'```',
				'**May**',
				'```fix',
				'MAY 9   :: Cure Sango (Sango)',
				'MAY 11  :: Cure Honey (Yuko)',
				'MAY 19  :: Cure Moonlight (Yuri)',
				'MAY 25  :: Cure Rhythm (Kanade)',
				'MAY 26  :: Cure Marine (Erika)',
				'MAY 28  :: Cure Rosetta (Alice)',
				'```',
				'**June**',
				'```fix',
				'JUN. 10 :: Cure Ange (Saaya)',
				'JUN. 11 :: Cure Macaron (Yukari)',
				'JUN. 12 :: Cure Miracle (Mirai)',
				'```'
      ])
      .setTimestamp()
      .setFooter(msg.author.tag);

		const CuresBirthday3 = new Discord.MessageEmbed()
			.setColor(0xFF00F0)
			.setTitle(msg.language.get('CMD_PRECURE_TITLE_BIRTHDAY'))
			.setDescription([
				 '**July**',
 				'```fix',
 				'JUL. 7  :: Cure Milky (Lala)',
 				'JUL. 15 :: Cure Macherie (Emiru)',
 				'JUL. 20 :: Cure Mermaid (Minami)',
 				'JUL. 30 :: Cure Parfait (Ciel)',
 				'```',
				'**August**',
				'```fix',
				'AUG. 1  :: Cure Summer (Manatsu)',
				'AUG. 4  :: Cure Heart (Mana)',
				'AUG. 7  :: Cure Bloom (Saki)',
				'AUG. 16 :: Cure Earth (Asumi)',
				'AUG. 21 :: Cure Fontaine (Chiyu)',
				'AUG. 27 :: Cure Gelato (Aoi)',
				'```',
				'**September**',
				'```fix',
				'SEP. 8  :: Cure Soleil (Elena)',
				'SEP. 9  :: Shiny Luminous (Hikari)',
				'SEP. 12 :: Cure Twinkle (Kirara)',
				'SEP. 17 :: Cure Diamond (Rikka)',
				'SEP. 23 :: Cure Amour (Ruru)',
				'SEP. 24 :: Cure Chocolat (Akira)',
				'```'
	     ])
	     .setTimestamp()
	     .setFooter(msg.author.tag);

		const CuresBirthday4 = new Discord.MessageEmbed()
	 	  .setColor(0xFF00F0)
			.setTitle(msg.language.get('CMD_PRECURE_TITLE_BIRTHDAY'))
			.setDescription([
				'**October**',
				'```fix',
				'OCT. 4  :: Cure Sparkle (Hinata)',
				'OCT. 10 :: Cure Black (Nagisa)',
				'OCT. 11 :: Cure Cosmo (Yuni)',
				'OCT. 12 :: Cure Lovely (Megumi)',
				'OCT. 15 :: Cure Flamingo (Asuka)',
				'```',
				'**November**',
				'```fix',
				'NOV. 4  :: Cure Sword (Makoto)',
				'NOV. 8  :: Cure Dream (Nozomi)',
				'NOV. 12 :: Cure Magical (Riko)',
				'NOV. 20 :: Cure Egret (Mai)',
				'NOV. 21 :: Cure Papaya (Minori)',
				'NOV. 23 :: Cure Selene (Madoka)',
				'```',
				'**December**',
				'```fix',
				'DEC. 1  :: Cure Ace (Aguri)',
				'DEC. 15 :: Cure Scarlet (Towa)',
				'```'
	     ])
	     .setTimestamp()
	     .setFooter(msg.author.tag);

		const pages = [
			CuresBirthday1,
			CuresBirthday2,
			CuresBirthday3,
			CuresBirthday4
		];
		const footerResolver = (currentPageIndex, pagesLength) =>
			`Page ${currentPageIndex + 1} / ${pagesLength} • ${(currentPageIndex % 2 === 0) ? msg.author.tag : msg.author.tag}`;
		ptnEmbed(msg, pages, { footerResolver, timeout: 120000, idle: 60000 });
  };

};
