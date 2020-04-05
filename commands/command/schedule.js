const schedule = require('node-schedule')
const db = require('quick.db')
module.exports.run = async (bot, message, args, embedErr, embedimg, embedlink, embedtxt) => {
    var dateInput = args;
    var date = new Date(args)
    var j = schedule.scheduleJob(date, function () {
        
    });

};


module.exports.help = {
    name: 'schedule',
    description: 'adds a date to a calender for that server. can only have 1 reminder per a server and you cant set a reminder name ',
    usage: 'year, month 0 = jan 11= dec, day of month 1-31, hour, minute, ',
    category: 'misc',
    accessableby: 'members'
    // aliases: []
};