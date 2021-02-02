const { Client, PermissionLevels } = require('@sakaruzero/klasa');
const config = require("./config.json");

Client.defaultUserSchema
 .add('level', 'integer', { default: 0, configurable: false })
 .add('xp', 'integer', { default: 0, configurable: false })
 .add('xp_exp', 'integer', { default: 0, configurable: false })
 .add('money', 'integer', { default: 0, configurable: false })
 .add('cookie', 'integer', { default: 0, configurable: false })
 .add('cookie_cooldown', 'integer', { default: 0, configurable: false })
 .add('daily_cooldown', 'integer', { default: 0, configurable: false })
 .add('card_uid', 'integer', { default: 0, configurable: false })
 .add('profile_uid', 'integer', { default: 0, configurable: false })
Client.defaultGuildSchema
 .add('prefix', 'string', { min: 1, max: 10, filter: (value) => value.length >= 1 && value.length <= 10 })
Client.defaultPermissionLevels
 .add(0, () => true)
 .add(10, ({ author, client }) => client.owners.has(author))

new Client({
 fetchAllMembers: false,
 prefix: 'c;',
 providers: { default : 'mysql'}, // FIRST: you need to edit the config in /providers/mysql.js for mysql database details with username, password, database
 commandEditing: true,
 commandMessageLifetime: 240,
 typing: false,
 owners: ['ENTER_USER_ID_HERE'], // change <ENTER_USER_ID_HERE> to your user ID e.g. 631997253275615233
 readyMessage: (client) => `Successfully. Ready to serve, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`
}).login(config.token);
