const { execute } = require("./suggest")

module.exports = {
    name: 'pokemon',
    async execute(message,args,Discord, fetch) { // pokemon random

        if (args.length == 10) {
            const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/arceus').then(response => response.json());
            const embed = new Discord.MessageEmbed()
            .setAuthor("ID: ["+pokemon.id+"] "+message.author.tag+'s Catch!')
            .setColor(0x00AE86)
            .setThumbnail(pokemon.sprites.front_default)
           .addFields(
                { name: 'A wild Pokemon appears!', value: 'arceus' },
                { name: 'Level', value: '100' }
          

            )
            .setTimestamp()
        return message.channel.send({embed});
        }

        let rando = Math.floor((Math.random() * 898) + 1);
        let rando1 = Math.floor((Math.random() * 100) + 1);

        const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon-form/'+rando).then(response => response.json());

        const embed = new Discord.MessageEmbed()
            .setAuthor("ID: ["+pokemon.id+"] "+message.author.tag+'s Catch!')
            .setColor(0x00AE86)
            .setThumbnail(pokemon.sprites.front_default)
           .addFields(
                { name: 'A wild Pokemon appears!', value: pokemon.name },
                { name: 'Level', value: rando1 }
          

            )
            .setTimestamp()
        message.channel.send({embed});


        

    }
}