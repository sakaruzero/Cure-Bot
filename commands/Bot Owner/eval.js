const { Command, Stopwatch, Type, util } = require('@sakaruzero/klasa');
const { inspect } = require('util');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['ev'],
			enabled: true,
			guarded: true,
			runIn: ['text'],
			permissionLevel: 10,
			description: language => language.get('BOT_OWNER_EVAL_DESCRIPTION'),
			usage: '[expression:str]'
		});
	}
	async run(msg, [code]) {
		
		if (msg.content.length < 8) return msg.send(msg.language.get('TEXT_INSUFFICIENT_ARGUMENT'));

		const { success, result, time, type } = await this.eval(msg, code);
		const footer = util.codeBlock('ts', type);
		const output = msg.language.get(success ? 'BOT_OWNER_EVAL_OUTPUT' : 'BOT_OWNER_EVAL_ERROR',
			time, util.codeBlock('js', result), footer);

		if ('silent' in msg.flags) return null;

		// Handle too-long-messages
		if (output.length > 2000) {
			if (msg.guild && msg.channel.attachable) {
				return msg.channel.sendFile(Buffer.from(result), 'output.txt', msg.language.get('BOT_OWNER_EVAL_SENDFILE', time, footer));
			}
			this.client.emit('log', result);
			return message.sendLocale('BOT_OWNER_EVAL_SENDCONSOLE', [time, footer]);
		}

		// If it's a message that can be sent correctly, send it
		return msg.send(output);
	};

	async eval(message, code) {
		const msg = message;
		const { flags } = msg;
		code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");
		const stopwatch = new Stopwatch();
		let success, syncTime, asyncTime, result;
		let thenable = false;
		let type;
		try {
			if (flags.async) code = `(async () => {\n${code}\n})();`;
			result = eval(code);
			syncTime = stopwatch.toString();
			type = new Type(result);
			if (util.isThenable(result)) {
				thenable = true;
				stopwatch.restart();
				result = await result;
				asyncTime = stopwatch.toString();
			}
			success = true;
		} catch (error) {
			if (!syncTime) syncTime = stopwatch.toString();
			if (!type) type = new Type(error);
			if (thenable && !asyncTime) asyncTime = stopwatch.toString();
			if (error && error.stack) this.client.emit('error', error.stack);
			result = error;
			success = false;
		}

		stopwatch.stop();
		if (typeof result !== 'string') {
			result = inspect(result, {
				depth: flags.depth ? parseInt(flags.depth) || 0 : 0,
				showHidden: Boolean(flags.showHidden)
			});
		}
		return {
      success, result: util.clean(result)
    };

	};

	formatTime(syncTime, asyncTime) {
		return asyncTime ? `⏱ ${asyncTime}<${syncTime}>` : `⏱ ${syncTime}`;
	};

};
