const { Command } = require('@sakaruzero/klasa');
const fetch = require('node-fetch');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			cooldown: 2,
			aliases: ['randomcat', 'meow'],
			description: language => language.get('CMD_FUN_CAT_DESCRIPTION'),
		});
	}
	async run(msg) {
		const file = await fetch('http://aws.random.cat/meow')
			.then(response => response.json())
			.then(body => body.file);
		return msg.channel.sendFile(file, `cat.${file.slice(file.lastIndexOf('.'), file.length)}`);
	};

};
