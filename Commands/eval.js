module.exports = {
    name: 'eval',
    execute(message,args,Discord) {
        const config = require('./../config.json');
        if (message.author.id !== config.OwnerID) return message.reply('Insufficient Permissions');

        const clean = text => {
            if (typeof(text) === "string")
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
          }

        try {
            const code = args.join(" ");
            let evaled = eval(code);
      
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);

  
    
            const embed = new Discord.MessageEmbed()
                    .setAuthor("Evaluate")
                    .setColor(0x00AE86)
            
                    .addFields(
                        { name: 'Input', value: `\`\`\`js\n${message.content.slice(5)}\n\`\`\``},
                        { name: 'Output', value: `\`\`\`xl\n${clean(evaled)}\n\`\`\``}

                    )

                    .setTimestamp()
                    message.channel.send(embed);


          } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
          }
    }
}