const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

var fs = require('fs');
const fetch = require('node-fetch');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
        client.commands.get(command).execute(message, args, Discord, fetch, fs, command, fetch);
        console.log(message.author.tag+" Has executed the command: "+command)
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});



client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity(config.Status.STRING, {type: config.Status.type});
});


client.on('messageReactionAdd', (reaction, user) => { // 📢 📰🎉 
	if(user.bot) return;
	if (reaction.message.channel.id == '778703946704224286') {
		let member = reaction.message.guild.members.cache.get(user.id);
		if (reaction.emoji.name === '📢') {
			const role =  reaction.message.guild.roles.cache.find((r) => r.name === 'Announcements');
			member.roles.add(role, 'Reaction role').catch((error) => this.client.logger.error(error));
		} else if (reaction.emoji.name === '📰') {
			const role =  reaction.message.guild.roles.cache.find((r) => r.name === 'Changelog');
			member.roles.add(role, 'Reaction role').catch((error) => this.client.logger.error(error));
		} else if (reaction.emoji.name === '🎉') {
			const role =  reaction.message.guild.roles.cache.find((r) => r.name === 'Events');
			member.roles.add(role, 'Reaction role').catch((error) => this.client.logger.error(error));
		}
	}
});

client.on('messageReactionRemove', (reaction, user) => { // 📢 📰🎉 
	if(user.bot) return;
	if (reaction.message.channel.id == '778703946704224286') {
		let member = reaction.message.guild.members.cache.get(user.id);
		if (reaction.emoji.name === '📢') {
			const role =  reaction.message.guild.roles.cache.find((r) => r.name === 'Announcements');
			member.roles.remove(role, 'Reaction role').catch((error) => this.client.logger.error(error));
		} else if (reaction.emoji.name === '📰') {
			const role =  reaction.message.guild.roles.cache.find((r) => r.name === 'Changelog');
			member.roles.remove(role, 'Reaction role').catch((error) => this.client.logger.error(error));
		} else if (reaction.emoji.name === '🎉') {
			const role =  reaction.message.guild.roles.cache.find((r) => r.name === 'Events');
			member.roles.remove(role, 'Reaction role').catch((error) => this.client.logger.error(error));
		}
	}
});

client.login(config.token);