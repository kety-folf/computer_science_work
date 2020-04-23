const schedule = require('node-schedule');
const db = require('quick.db');
const key = require('keygenerator');
module.exports.run = async (bot, message, embedErr, embedimg, embedlink, embedtxt, prefix) => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

 let dateNum = args[0];
 let month = args[1];
 let year = args[2];
 let hour = args[3];
 let minute = args[4];
 let midDay = args[5];
 let reason = args[6];
    if (midDay = 'AM') {
        midDay = 1;
    }
    else {
        midDay = 0;
    };
    

    let dateStructure = `${year}, ${month}, ${dateNum}, ${hour}, ${minute}, ${midDay}`;
    let date = new Date(dateStructure);
    let setTime = `${dateNum}/${month}/${year} ${hour}:${minute} for ${reason}`;
    embedtxt("reminder set", `the reminder has been set for ${setTime}`);
    let job = schedule.scheduleJob(date, function () {
        embedtxt("reminder", `reminder for ${reason}`);
        job.cancel
    });
  
};


module.exports.help = {
    name: 'schedule',
    description: 'adds a date to a calender for that server. can only have 1 reminder per a server and you cant set a reminder name ',
    usage: '<date> <month 0=jan 11=dec> <year> <hour> <minute> <AM/PM> <reason> ',
    category: 'misc',
    accessableby: 'members'
    // aliases: []
};