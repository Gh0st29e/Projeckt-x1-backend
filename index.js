const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`Bot ist online als ${client.user.tag}`);
});

// SIMPLE UMFRAGE COMMAND
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!umfrage')) {
    const args = message.content.split('|');
    
    if (args.length < 3) {
      return message.reply('Format: !umfrage Frage | Option1 | Option2');
    }

    const frage = args[0].replace('!umfrage', '').trim();
    const option1 = args[1].trim();
    const option2 = args[2].trim();

    const pollMessage = await message.channel.send(
      `📊 **${frage}**\n\n1️⃣ ${option1}\n2️⃣ ${option2}`
    );

    await pollMessage.react('1️⃣');
    await pollMessage.react('2️⃣');
  }
});

client.login(process.env.TOKEN);