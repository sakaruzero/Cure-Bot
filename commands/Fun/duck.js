const { Command } = require('@sakaruzero/klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 2,
			aliases: ['randomduck', 'ducc'],
			description: language => language.get('CMD_FUN_DUCK_DESCRIPTION')
		});
	}
	async run(msg) {
		const url = await fetch('https://random-d.uk/api/v1/random')
			.then(response => response.json())
			.then(body => body.url);
		return msg.channel.sendFile(url, `duck.${url.slice(url.lastIndexOf('.'), url.length)}`);
	};

};
