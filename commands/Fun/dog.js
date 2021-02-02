const { Command } = require('@sakaruzero/klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 2,
			aliases: ['randomdog', 'woof'],
			description: language => language.get('CMD_FUN_DOG_DESCRIPTION')
		});
	}
	async run(msg) {
		const file = await fetch('https://dog.ceo/api/breeds/image/random')
			.then(response => response.json())
			.then(body => body.message);
		return msg.channel.sendFile(file, `dog.${file.slice(file.lastIndexOf('.'), file.length)}`);
	};

};
