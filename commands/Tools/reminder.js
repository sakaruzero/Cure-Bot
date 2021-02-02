const { Command } = require('@sakaruzero/klasa');
const moment = require('moment');

moment.relativeTimeThreshold('s', 60);
moment.relativeTimeThreshold('m', 60);
moment.relativeTimeThreshold('h', 24*26);

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['remindme', 'remind'],
			description: language => language.get('CMD_TOOLS_REMINDER_DESCRIPTION'),
			usage: '[time:time] [text:...str]',
			usageDelim: ' '
		});
	}
	async run(msg, [time, text]) {
    if(!time) return msg.send(`${msg.language.get('CMD_TOOLS_REMINDER_ERROR_TIME', msg.guildSettings.prefix.length ? msg.guildSettings.prefix : undefined)}\n`);
    const timeMs = time.getTime() - Date.now();
    if (timeMs > 0x7FFFFFFF) return msg.send(msg.language.get('CMD_TOOLS_REMINDER_ERROR_MAX'))
    const duration = moment().add(timeMs, 'ms').fromNow(true);
    if (!text) return msg.send(msg.language.get('TEXT_INSUFFICIENT_ARGUMENT'));

    //add schedule
    const reminder = await this.client.schedule.create('reminder', time, {
      data: {
        channel: msg.channel.id,
        user: msg.author.id,
        text
      }
    });

    return msg.send(`${msg.language.get('CMD_TOOLS_REMINDER_GOT')} **${duration}**.`);
	};

};
