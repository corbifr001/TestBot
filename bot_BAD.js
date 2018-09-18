const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone: true});

// Initilalize the invites cache
//const invites = {};

// A pretty useful method to create a delay without blocking the whole script.
//const wait = require('util').promisify(setTimeout);
​
bot.on("ready", async () => {
    console.log(`Bot is ready! ${bot.user.username}`);

    /*
    bot.generateInvite(["ADMINSTRATOR"]).then(link => {
        cosole.log(link);
    }).catch(err => {
        console.log(err.stack);
    });
    */

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }

    // "ready" isn't really ready. We need to wait a spell.
    //wait(1000);
  ​
    // Load all invites for all guilds and save them to the cache.
    /*
    client.guilds.forEach(g => {
      g.fetchInvites().then(guildInvites => {
        invites[g.id] = guildInvites;
      });
    });
*/
    
});
/*
bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    if (command === `${prefix}userinfo`) {
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setDescription("This is the user's info!")
            .setColor("#9B59B6")
            .addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
            .addField("ID", message.author.id)
            .addField("Created At", message.author.createdAt)
            .addField("Last Message", message.author.lastMessage)
        ;
        message.channel.sendEmbed(embed);
    }

    if (command === `${prefix}mute`) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You are not allowed to do this! (you do not have 'manage_messages'");

        let toMute = message.guild.member(message.mentions.users.first());
        if (!toMute) return message.channel.sendMessage("You did not specify a user mention");

        if (toMute.id === message.author.id) return message.channel.sendMessage("You cannot mute yourself!");
        if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.sendMessage("You cannot mute a user ranked higher than you!");

        let role = message.guild.roles.find(r => r.name === "SADB Muted");
        if (!role) {
            try {
                role = await message.guild.createRole({
                    name: "SADB Muted",
                    color: "#000000",
                    permissions: []
                });
    
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
    
                });
            } catch(e) {
                console.log(e.stack);        
            }
        }

        if (toMute.roles.has(role.id)) return message.channel.sendMessage("This user is already muted");
        await toMute.addRole(role);
        
        return message.reply(`${toMute.user.username} has been muted.`);
    }

    if (command === `${prefix}unmute`) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("You are not allowed to do this! (you do not have 'manage_messages'");

        let toMute = message.guild.member(message.mentions.users.first());
        if (!toMute) return message.channel.sendMessage("You did not specify a user mention");

        let role = message.guild.roles.find(r => r.name === "SADB Muted"); 

        if (!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("This user is not muted");
        await toMute.removeRole(role);
        
        return message.reply(`${toMute.user.username} has been unmuted.`);
    }

    //if (command === `${prefix}getinvites`) {
        //let invites = channel.
    //}

    
    console.log(messageArray);
    console.log(command);
    console.log(args);
    
});
*/

bot.login(botSettings.token);