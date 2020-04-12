    const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://3dd1a874b960468685862e533b63c559@o376518.ingest.sentry.io/5197414' });
const Discord = require('discord.js');

exports.run = (client, message, args) => {
    message.channel.send(":books: I've sent some help commands to your DMs.").then(msg => {

        msg.delete(5000);
        message.delete(5000);
    
      });
    
        message.author.send(new Discord.RichEmbed()
        .setColor('#ad0917')
        .setTitle('User Help')
        .setURL('https://helsinkicruises.web.app')
        .setDescription('Here are the user commands for the Helsinki Cruises Discord bot.')
        .addField('!admin help', 'Get administrator help commands.')
        .addField('!verify <username>', 'Verify yourself with the supplied ROBLOX username.')
        .addField('!unverify', 'Unverify yourself.')
        .addField('!cancelverify', 'Cancel your current request to verify yourself.')
        .addField('!getroles', 'Give yourself the role which matches your rank on the HC ROBLOX group.')
        .addField('!whois <@mention>', 'Search for and display information about the mentioned user.')
        .setTimestamp());
}
