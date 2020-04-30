

const { Client, Collection, MessageEmbed, Channel, User } = require('discord.js');
const db = require('quick.db');
const { readdirSync } = require('fs');
const { token, prefix } = require('./config.json');
const bot = new Client();
bot.commands = new Collection();
bot.aliases = new Collection();
bot.prefix = prefix;

const load = dirs => {
	const commands = readdirSync(`./commands/${dirs}/`).filter(d => d.endsWith('.js'));
	for (const file of commands) {
		const pull = require(`./commands/${dirs}/${file}`);
		bot.commands.set(pull.help.name, pull);
		if (pull.help.aliases) pull.help.aliases.forEach(a => bot.aliases.set(a, pull.help.name));
	}
};
const commandsDir = readdirSync('./commands/');
commandsDir.forEach(x => load(x));

bot.on('ready', async () => {
	console.log(`Connected as ${bot.user.tag} in  ${bot.guilds.cache.size} server/s `);
	bot.user.setPresence({  activity: {  name: `reminding you of times | prefix: ${prefix}`, type:'PLAYING' }, status: 'idle' })
		.then(console.log)
		.catch(console.error);
  
});
bot.on('message', async message => {
	function embedErr(title, decrption) {// embed function for errors
		let embed = new MessageEmbed()
			.setColor('#f92e02')
			.setTitle(title)
			.setDescription(decrption);
		message.channel.send(embed);
	}

	function embedtxt(title, decrption) {// embed text
		let embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(title)
			.setDescription(decrption);
		message.channel.send(embed);
	}

	function embedlink(title, decrption, url) {// embed url
		let embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(title)
			.setDescription(decrption)
			.setURL(url);
		message.channel.send(embed);
	}

	function embedimg(title, decrption, img) { //embed image
		let embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle(title)
			.setDescription(decrption)
			.setImage(img);
		message.channel.send(embed);
	}

	const arg = message.content.substring(1).trim(' ');
	if (message.author.bot || message.channel.type !== 'text') return;

	const args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (!message.content.startsWith(bot.prefix)) return;
	const commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
	if (commandfile) commandfile.run(bot, message, args, embedErr, embedimg, embedlink, embedtxt, arg, prefix, Channel, User);
});
bot.login(token).catch(e => console.log(e));