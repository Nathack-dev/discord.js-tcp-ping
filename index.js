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
    .setTitle(`🔍 Ping en cours...`)
    .setColor(`ORANGE`)
    .setDescription(addr)
    client.channels.resolve(config.channel).send(ping)
    .then(msg => {
        setInterval(() => {
            tcpp.probe(addr, port, function(err, available) {
                if (available) {
                    tcpp.ping({ address: addr, port: port }, function(err, data) {
                        console.log(data);
                        let ping = new MessageEmbed()
                        .setTitle(`✅ Le serveur est actuellement en ligne`)
                        .setColor(`GREEN`)
                        .addField("📍 Le ping est de :", Math.floor(data.avg) + `ms` )
                        .setFooter(`🕓 Dernière actualisation ${new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"}).split(',')[0]}`)
                        msg.edit(ping)
                    });
                } else {
                    let ping = new MessageEmbed()
                    .setTitle(`📍 Oups...`)
                    .setColor(`RED`)
                    .setDescription('⚠️ Le serveur semble down...')
                    .setFooter(`🕓 Dernière actualisation ${new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"}).split(',')[0]}`)
                    msg.edit(ping)
                }
            })
        }, 5000)
    })
})

