const { Command } = require('@sakaruzero/klasa');
const { obfuscate } = require('confusables');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			usage: '[str:str]',
			description: language => language.get('CMD_FUN_OBJUSCATE_DESCRIPTION')
		});
	}
	async run(msg, [str]) {
		if (!str) {
			return msg.channel.send('<:no:607692716612124693> You need to include something to say.');
		};
		if (str.length < 2) {
			return msg.channel.send('<:no:607692716612124693> You need to include something to say.');
		};
		if (str.length > 30) {
			return msg.channel.send('<:no:607692716612124693> You can\'t use more than 30 characters.');
		};
		const variations = [
		//`\`\`\` ${str} \`\`\``
		];
		for (let i = 0; i < 10; i++) {
			variations.push(obfuscate(str));
		}
		return msg.send(variations.join('\n'));
	};

};
