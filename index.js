const {Client, MessageEmbed} = require('discord.js'),
tcpp = require('tcp-ping');
client = new Client();

const config = require("./config.json");
client.config = config;

client.login(config.token);

client.on('ready', () => {
    console.log('ready')

    let addr = config.server,
    port = config.port;
    let ping = new MessageEmbed()
    .setTitle(`Ping`)
    .setColor(`ORANGE`)
    .addField(addr, `pinging`)
    client.channels.resolve(config.channel).send(ping)
    .then(msg => {
        setInterval(() => {
            tcpp.probe(addr, port, function(err, available) {
                if (available) {
                    tcpp.ping({ address: addr, port: port }, function(err, data) {
                        console.log(data);
                        let ping = new MessageEmbed()
                        .setTitle(`NODE JEUX`)
                        .setColor(`GREEN`)
                        .addField(Math.floor(data.avg) + `ms`, `Le serveur est actuellement en ligne`)
                        .setFooter(`Dernière actualisation ${new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"}).split(',')[0]} | powered by Linetim.fr`)
                        msg.edit(ping)
                    });
                } else {
                    let ping = new MessageEmbed()
                    .setTitle(`NODE JEUX`)
                    .setColor(`RED`)
                    .addField(`->`, `down`)
                    .setFooter(`Dernière actualisation ${new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"}).split(',')[0]} | powered by Linetim.fr`)
                    msg.edit(ping)
                }
            })
        }, 5000)
    })
})

