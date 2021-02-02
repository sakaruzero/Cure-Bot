const { Command } = require('@sakaruzero/klasa');

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['8', 'magic', '8ball', 'mirror'],
			description: language => language.get('CMD_FUN_8BALL_DESCRIPTION'),
			usage: '<query:str>'
		});
	}
	run(msg, [question]) {
		const answers = [
			msg.language.get('CMD_FUN_8BALL_ANSWER_MAYBE'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_CERTAINLYNOT'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_THEREGOODCHANCE'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_QUITELIKELY'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_ITHINKSO'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_IHOPENOT'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_IHOPESO'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_NEVER'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_AHAHAREALLY'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_SORRYBUCKO'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_HELLYES'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_FUTUREBLANK'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_FUTUREUNCERTAIN'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_NOTSAY'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_POSSIBLY'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_NEVEREVER'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_THERESMALLCHANCE'),
			msg.language.get('CMD_FUN_8BALL_ANSWER_YES')
		];
		return msg.reply(question.endsWith('?') ?
			`🎱 ${answers[Math.floor(Math.random() * answers.length)]}` :
			`🎱 ` + msg.language.get('CMD_FUN_8BALL_NONQUESTION'));
	};

};
