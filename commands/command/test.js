

const db = require('quick.db');
module.exports.run = async (bot, message, embedErr, embedimg, embedlink, embedtxt, prefix,Channel,user) => {
	let today = new Date();   
	let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	let time = today.getHours() + ':' + today.getMinutes();
    
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	let GuildID = message.guild.id;// fix this
	let ChannelID = message.channel.id;// fix this
	let dateNum = args[0];
	let month  = args[1];
	let year = args[2];
	let hour = args[3];
	let minute = args[4];
	let reason = args[5];
	month = month + 1;
	let userDate = year + '-' + month + '-' + dateNum;
	let userTime = hour + ':' + minute;

	db.set(GuildID, { userDate: userDate, userTime: userTime, ChannelID: ChannelID, reason:reason });

	function checkTime() {
		let   dbDate = db.get(GuildID.userDate);
		let dbTime = db.get(GuildID.userTime);
		let dbMsgId = db.get(GuildID.ChannelID);
		let   dbReason = db.get(GuildID.reason);
		if (dbDate == date) {
			if (dbTime == time) {
				bot.guild.get(GuildID).Channel.get(dbMsgId).then(Channel => {
					Channel.send(dbReason);
				});



			}
		}
	}
    
	setInterval(checkTime, 60000);
};
module.exports.help = {
	name: 'test',
	description: 'test command',
	usage: '',
	category: 'misc',
	accessableby: 'members'
	// aliases: [] 
};