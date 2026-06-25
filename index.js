const {
    Client,
    GatewayIntentBits,
    AttachmentBuilder
} = require('discord.js');

const Canvas = require('canvas');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});
client.once('ready', () => {
    console.log(`${client.user.tag} شغال`);
});

client.on('guildMemberAdd', async member => {

    // حط آيدي روم الترحيب هنا
    const channel = member.guild.channels.cache.get('1510694717107601561');

    if (!channel) return;

    // إنشاء الصورة
    const canvas = Canvas.createCanvas(1000, 500);
    const ctx = canvas.getContext('2d');

    // الخلفية
    const background = await Canvas.loadImage('./images/background.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // اسم العضو
    ctx.font = 'bold 60px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(member.user.username, 300, 120);

    // رسالة الترحيب
    ctx.font = '40px sans-serif';
    ctx.fillText('WELCOME TO VOID', 300, 70);

    // صورة العضو
    const avatar = await Canvas.loadImage(
        member.user.displayAvatarURL({ extension: 'png', size: 256 })
    );

    ctx.save();
    ctx.beginPath();
    ctx.arc(120, 100, 70, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 50, 30, 140, 140);
    ctx.restore();

    const attachment = new AttachmentBuilder(
        canvas.toBuffer(),
        { name: 'welcome.png' }
    );

    channel.send({
        content: `🎉 أهلاً وسهلاً ${member}`,
        files: [attachment]
    });
});

// حط توكن البوت هنا
client.login(process.env.TOKEN);