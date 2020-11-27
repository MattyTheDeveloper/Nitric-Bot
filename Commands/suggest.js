module.exports = {
    name: 'suggest',
    execute(message, args, Discord, command, client) {
        const config = require('./../config.json');
        const suggest = require('./../Storage/suggestions.json');
        const con = './../config.json';
        const fs = require('fs');

        if (args[0] === 'respond') {
            const role = message.guild.roles.cache.find(r => r.name === "Staff");
            if (message.member.roles.cache.has(role.id)) {
                if (args.length > 2) { // !suggest respond <ID> response
                    // MESSAGE AUTHOR
                    // DELETE MESSAGE
                    let rawdata = fs.readFileSync('./Storage/suggestions.json');
                    let data = JSON.parse(rawdata);
                    let msgID;

                    findID(data, args[1]);
                    function findID(data, IDnum) {
                        
                        msgID = data.find(crewMember => crewMember.ID == IDnum);
                        return msgID;
                        
                    }

                    if (!msgID) {
                        return message.reply('Suggestion not found');
                    }

                    if (!message.guild.members.cache.get(msgID.authID)) {
                        return message.reply('Target has messages off! OR player not found.');
                    }

                   let msg = message.content.slice(16);
                   let msg1 = msg.replace(msgID.ID, '').trim();

                    const embed = new Discord.MessageEmbed()
                        .setAuthor("Your suggestion has been reviewed.")
                        .setColor(0x00AE86)
                        .setThumbnail(message.author.displayAvatarURL())
                        .addFields(
                            { name: 'Your suggestion (#'+msgID.ID+')', value: msgID.content },
                            { name: 'Staff response', value: msg1 }

                        )

                        .setTimestamp()
                    message.guild.members.cache.get(msgID.authID).send(embed);

                    message.channel.send('You have responded to **'+msgID.authTAG+'** suggestion!');
                    

    
   
                    
                    
                } else {
                    message.reply('Incorrect Usage: ``'+config.prefix+'suggest respond <SUGGESTION ID> <SUGGESTION REASON>``');
                }
            

            } else {
                message.reply('You need to be staff to execute this command.');
            }

        } else if (args.length >= 1) {
            
            const channel = message.guild.channels.cache.find(channel => channel.name === '🍩suggestions'); // CHANNEL TO SEND SUGGESTION COMMAND
            let reason = message.content.slice(8);
            
            if (!channel) return;
            try { // EMBED MESSAGE
                const embed = new Discord.MessageEmbed()
                    .setTitle("Suggestion #"+config.Suggestions.ID)
                    .setAuthor(message.author.tag, message.author.displayAvatarURL())
                    .setColor(0x00AE86)
                    .setDescription(reason)
                    .setThumbnail(message.author.displayAvatarURL())
                    .setTimestamp()
                channel.send({embed}).then(function (message) {
                    message.react('✅')
                    message.react('❎')
                });

                message.delete();
                message.reply('Successfully created your suggestion!');
                // ./Storage/suggestions.json

                // Defining new message
            
                let t = config.Suggestions.ID.toString();
                fs.readFile('./Storage/suggestions.json', 'utf8', (err, data) => {

                    if (err) {
                        console.log(`Error reading file from disk: ${err}`);
                    } else {
                
                        // parse JSON string to JSON object
                        const messages = JSON.parse(data);
                
                        // add a new record
                        messages.push({"ID":config.Suggestions.ID,"content":reason,"authID":message.author.id,"msgID":message.id,"authTAG":message.author.tag});
                    
                
                        // write new data back to the file
                        fs.writeFile('./Storage/suggestions.json', JSON.stringify(messages, null, 4), (err) => {
                            if (err) {
                                console.log(`Error writing file: ${err}`);
                            }
                        });
                    }
                
                });


                fs.readFile('./config.json', 'utf8', (err, data) => {
                    if (err) {
                        console.log(`Error reading file from disk: ${err}`);
                    } else {
    
                        config.Suggestions.ID++;
                
                        // write new data back to the file
                        fs.writeFile('./config.json', JSON.stringify(config, null, 4), (err) => {
                            if (err) {
                                console.log(`Error writing file: ${err}`);
                            }
                        });
                    }
                
                });
                
                
            } catch (error) {
                console.error(error);
                message.reply('there was an error trying to execute that command!');
            }

        } else {

            message.reply('Incorrect Usage: ``'+config.prefix+'suggest <SUGGESTION``');
        }
    }
}