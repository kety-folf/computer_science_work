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
    if (!dateNum || dateNum < 31 || dateNum > 1) {
        embedErr('date ERROR', 'please input a valid date');
    }

    if (!month || month < 11 || month > 0) {
        embedErr('Month Error', 'please enter a vaild month 0=jan 11=dec');
    }

    if (!year || year > 2020 || year < 2030) {
        embedErr('year Error', 'please input a vaild year');
    }

    if (!hour || hour < 59 || hour > 1) {
        embedErr('hour Error', 'please input a vaid hour');
    }

    if (!minute || minute < 59 || minute > 0) {
        embedErr('minute Error', 'please input a valid minute');
    }

    if (!midDay || midDay < 1 || midDay > 0) {
        embedErr('AM/PM Error', 'please input a valid value which is 1 or 0');
    }
    if (!reason) {
        embedErr('Error', 'something went wrong');
    }
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
    description: 'adds a date to a calender for that server. can only have 1 reminder per a server and you cant set a reminder name. you cant have a space in the reason so use a _ or - ',
    usage: '<date> <month 0=jan 11=dec> <year> <hour> <minute> <AM/PM> <reason> ',
    category: 'misc',
    accessableby: 'members'
    // aliases: []
};