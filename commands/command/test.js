

const db = require('quick.db');
const key = require('keygenerator');
module.exports.run = async (bot, message, embedErr, embedimg, embedlink, embedtxt, prefix,channel,user) => {
    let today = new Date();   
   let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes();
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let GuildID = message.guild.id;
    let messageID = message.channel.id;
    let dateNum = args[0];
    let month  = args[1];
    let year = args[2];
    let hour = args[3];
    let minute = args[4];
    let reason = args[5];
    month = month + 1;
    let userDate = year + '-' + month + '-' + dateNum;
    let userTime = hour + ':' + minute;
    db.set(GuildID, {userDate: userDate, userTime: userTime, ChannelID: messageID})
    function checkTime() {

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