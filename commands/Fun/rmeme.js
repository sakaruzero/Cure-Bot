const Discord = require('discord.js');
const { Command } = require('@sakaruzero/klasa');
const got = require('got');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			cooldown: 3,
			aliases: ['rmemes'],
			description: language => language.get('CMD_FUN_RMEME_DESCRIPTION')
		});
	}
	async run(msg) {

			const embed = new Discord.MessageEmbed();
			const subReddits = [
				'meme',
				'memes',
				'MemeEconomy'
			];
			const random = subReddits[Math.floor(Math.random() * subReddits.length)];

			try {
				const response = await got(`https://www.reddit.com/r/${random}/random/.json`);
			  const body = JSON.parse(response.body);
			  const posts = Array.isArray(body) ? body[0] : body;
			  const post = posts.data.children[0].data;

				let permalink = post.permalink;
				let redditUrl = `https://reddit.com${permalink}`;

					embed.setColor(0xFF00F0)
					embed.setTitle(`${post.title}`)
					embed.setURL(`${redditUrl}`)
					embed.setDescription(`Posted by ${post.author}`)
					embed.setImage(post.url)
					embed.addFields(
						{ name: `\u200b`, value: `👍 **${post.ups}** \u2800\u2800 💬 **${post.num_comments}** \u2800\u2800 🏆 **${post.total_awards_received}**`, inline: true }
					);
					embed.setTimestamp()
					embed.setFooter(`r/${random}`);
				msg.send(embed);
			} catch (err) {
			  console.log(err);
				msg.send(msg.language.get('GENERAL_ERROR_API'));
			};

			// end
	};

};
