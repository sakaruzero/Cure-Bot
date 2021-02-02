const { Command } = require('@sakaruzero/klasa');
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
		if (string === '2') return this.birthday2(msg);

    const embedBirthday1 = new Discord.MessageEmbed()
  	  .setColor(0xFF00F0)
      .setTitle(msg.language.get('CMD_PRECURE_TITLE_BIRTHDAY'))
      .setDescription([
				`This is the current list of cure birthdays: \`1 of 2\``,
        `Type \`${msg.guild.settings.prefix}birthday 2\` to next page\n`,
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
				'```',
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
				'```',
				'**July**',
				'```fix',
				'JUL. 7  :: Cure Milky (Lala)',
				'JUL. 15 :: Cure Macherie (Emiru)',
				'JUL. 20 :: Cure Mermaid (Minami)',
				'JUL. 30 :: Cure Parfait (Ciel)',
				'```'
      ])
      .setTimestamp()
      .setFooter(msg.author.tag);
    return msg.send(embedBirthday1);
  };

	async birthday2(msg) {
		// 2 of 2 birthday
    const embedBirthday2 = new Discord.MessageEmbed()
  	  .setColor(0xFF00F0)
      .setTitle(msg.language.get('CMD_PRECURE_TITLE_BIRTHDAY'))
      .setDescription([
        `This is the current list of cure birthdays: \`2 of 2\`\n`,
				'**August**',
				'```fix',
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
				'```',
				'**October**',
				'```fix',
				'OCT. 4  :: Cure Sparkle (Hinata)',
				'OCT. 10 :: Cure Black (Nagisa)',
				'OCT. 11 :: Cure Cosmo (Yuni)',
				'OCT. 12 :: Cure Lovely (Megumi)',
				'```',
				'**November**',
				'```fix',
				'NOV. 4  :: Cure Sword (Makoto)',
				'NOV. 8  :: Cure Dream (Nozomi)',
				'NOV. 12 :: Cure Magical (Riko)',
				'NOV. 20 :: Cure Egret (Mai)',
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
    return msg.send(embedBirthday2);
	};

};
