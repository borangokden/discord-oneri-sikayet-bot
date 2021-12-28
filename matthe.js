const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const önerilimit = new Map()

client.on("ready", () => {
    client.user.setPresence({ activity: { name: "Developed by BoranGkdn" }, status: "online" });
})
client.on("ready", () => {
    const ses = client.channels.cache.get(config.seskanal);
    if (!ses) return
    ses.join();
})
setInterval(() => {
    const ses = client.channels.cache.get(config.seskanal);
    if (!ses) return
    ses.join();
}, 1);

client.on("message", async message => {
    if (message.author.id === client.user.id || message.author.bot) return;
    if (message.guild) return;
    if (config.önerilimit > 0 && önerilimit.has(message.author.id) && önerilimit.get(message.author.id) == config.önerilimit) return message.channel.send("Saatlik öneri limitine ulaştın!");
    message.channel.send("Önerin başarıyla sunucu yetkililerine iletildi! Bir dahaki önerini 1 saat sonra yapabileceksin!")
    client.channels.cache.get(config.logkanal).send(new Discord.MessageEmbed().setAuthor("Yeni Bir Öneri Var", client.user.avatarURL()).setFooter("Developed by BoranGkdn").setDescription(`**Gönderenin Bilgileri:** ${message.author} - ${message.author.id}`).setTimestamp().addField("**Mesaj**", message.content).setColor("RANDOM"))
    if (1 > 0) {
        if (!önerilimit.has(message.author.id)) önerilimit.set(message.author.id, 1);
        else önerilimit.set(message.author.id, önerilimit.get(message.author.id) + 1);
        setTimeout(() => {
            if (önerilimit.has(message.author.id)) önerilimit.delete(message.author.id);
        }, 1000 * 60 * 60)
    };
})

client.login(config.token).then(() => console.log(`[ MATTHE ] ${client.user.username} olarak giriş yaptı!`)).catch(() => console.log(`[ BORANGKDN ] Bot giriş yapamadı!`));
