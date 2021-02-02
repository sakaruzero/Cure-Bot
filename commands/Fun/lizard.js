const { Command } = require('@sakaruzero/klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 2,
			aliases: ['randomlizard'],
			description: language => language.get('CMD_FUN_LIZARD_DESCRIPTION')
		});
	}
	async run(msg) {
		const url = await fetch('https://nekos.life/api/v2/img/lizard')
			.then(response => response.json())
			.then(body => body.url);
		return msg.channel.sendFile(url, `lizard.${url.slice(url.lastIndexOf('.'), url.length)}`);
	};

};
