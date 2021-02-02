const { Task } = require('@sakaruzero/klasa');

module.exports = class extends Task {
	async run({ channel, user, text }) {
		const _channel = this.client.channels.cache.get(channel);
		if (_channel) await _channel.send(`<@${user}> **Reminder:**\n ${text}`);
	};

};
