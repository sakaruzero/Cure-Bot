<div>
  <div style="margin-left:auto;margin-right:auto;">
    <img src="https://i.imgur.com/wxkPUGP.png"><br><br>
    <p align="center" style="margin:0;">
      <a href="https://curebot.xyz/"><img src="https://img.shields.io/badge/official-website-blue.svg?style=for-the-badge&maxAge=300" alt="Website Official"></a>
      <a href="https://discord.gg/epnnhk4qRv"><img src="https://img.shields.io/discord/776968072270446653.svg?logo=discord&style=for-the-badge&maxAge=300" alt="Discord server"></a>
      <a href="https://www.paypal.me/sakaruzero"><img src="https://img.shields.io/badge/paypal-donate-blue.svg?style=for-the-badge&maxAge=300" alt="Paypal.me"></a>
    </p>
  </div>
</div>
<br>

Cure Bot is a Discord bot written in JavaScript for [Node.js](https://nodejs.org/en/) with Discord.js library and the [Klasa](https://github.com/dirigeants/klasa) framework.

<br><br>

### **Development/WIP Status
Please note that **the project is not completed yet** and is still undergoing development. If you find any issues you should not panic instead, you should let us know so we can improve on the code. In a situation where you clone and download the project to your local machine.

<br><br>

### Want to use Cure Bot but don't want to host it yourself?
It's fine, we maintain a public bot called **Cure Bot** that you can invite to your server, visit https://curebot.xyz/invite.
<br><br>

### Installation (for Selfhosting/Testing)
#### Requirements

* Linux system
* [Git](https://git-scm.com/download/linux)
* This bot runs on [Node.js](https://nodejs.org/en/), You will need at least **node v14.0.0** or above.
* MySQL 5.6 or newer (MariaDB compatible), this bot will use MySQL by default.
* We also recommend installing some basic build tools like `node-canvas`. Follow these instructions to install the dependencies;
    * `node-canvas`: **[Linux (Ubuntu/etc)](https://github.com/Automattic/node-canvas/wiki/Installation%3A-Ubuntu-and-other-Debian-based-systems)** (required)

#### Getting started
Make sure you have all the required tools installed on your local machine then continue with these steps.

You can clone this repository and host the bot yourself for test.
```
git clone https://github.com/sakaruzero/Cure-Bot.git
```
* After cloning, change to `cd Cure-Bot` directory that git just created (should be called **Cure-Bot**).
* Run a `npm install` to install all dependencies needed for **Cure Bot** and listed in package.json file.
* Once done, you need to create a `config.json` file in the main directory. Replace `DISCORD_TOKEN_HERE` with your token from [
Discord Developer Portal](https://discord.com/developers/applications). The format of `config.json` is as follows:
```
{
	"token": "DISCORD_TOKEN_HERE"
}
```
* You need to edit the `app.js` and `/providers/mysql.js`
* Run a `npm start` or `node app.js` to start bot.


<br><br><br>
If you have any suggestions, feel free to join us on [Discord](https://discord.gg/epnnhk4qRv)
