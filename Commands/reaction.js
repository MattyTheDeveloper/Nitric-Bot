const { execute } = require("./suggest");

module.exports = {
    name: 'reaction',
    execute(message,args) {
        const role = message.guild.roles.cache.find(r => r.name === "Manager");
        if (message.member.roles.cache.has(role.id)) {
            const channel = message.guild.channels.cache.find(channel => channel.name === '📜info');

            channel.send('> **Reaction Roles**@everyone\n\nReact to a message to get a specific role! These roles will ping you for different updates.  Simply react to gain a role, and un react to remove it.\n\n:loudspeaker:  | Announcements\n:newspaper:  | Changelog\n:tada:  | Events\n\n- Nitric Network').then(function (message) {
                message.react('📢') 
                message.react('📰')
                message.react('🎉')
            });
            
        } else {
            console.log('no')
        }
    }
}