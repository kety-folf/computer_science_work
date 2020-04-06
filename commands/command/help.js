const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const { readdir } = require('fs');
module.exports.run = async (bot, message, args, embedErr, embedimg, embedlink, embedtxt) => {
   
    const embed = new MessageEmbed()

        .setColor()
        .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL)
        .setThumbnail(bot.user.displayAvatarURL);

    if (!args[0]) {
        channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                },
                title: "Bot prefix is --",
                description: "Commands",
                fields: [{
                    name: "time",
                    value: "world clock command. if you want a timezone added just ask me"
                },
                    {
                        name: "schedule",
                        value: "schedules a time there can only be 1 running at once. time format is for command is year, month 0 = jan 11= dec, day of month 1-31, hour, minute, am/pm 0-1"
                    },
                {
                    name: 'help',
                    value: 'if you do help and a command name you can get more info on that command.'
                }



                ],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "©Kety_the_folf#0001"
                }
            }
        });


        return;


    } else {
        embed.setDescription(` commands for ${bot.user.tag}\nThe bot prefix is: **${bot.prefix}**`);
        embed.setFooter(`${bot.user.username} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL);

        let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase());
        if (!command) return channel.send({ embed: embed.setTitle('Invalid Command.').setDescription(`Do \`${bot.prefix}help\` for a list of the commands.`) });
        command = command.help;
        embed.setDescription(stripIndents`The bot prefix is: \`${bot.prefix}\`\n
    ❯ Command: ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
    ❯ Description: ${command.description || 'No Description'}
    ❯ Usage: ${command.usage ? `\`${bot.prefix}${command.name} ${command.usage}\`` : 'No Usage'}
    ❯ Accessable by: ${command.accessableby || 'Members'}
    ❯ Aliases: ${command.aliases ? command.aliases.join(', ') : 'None'}`);

        return message.channel.send({ embed: embed });
    }
};

module.exports.help = {
    name: 'help',
    description: 'Displays all commands that the bot has.',
    usage: '<command Name>',
    category: 'miscellaneous',
    accessableby: 'Members',
    aliases: ['h', 'hlp', 'commands']
};