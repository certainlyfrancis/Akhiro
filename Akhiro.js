const login = require("./fb-chat-api/index");
const fs = require("fs-extra");
const express = require("express");
const chalk = require("chalk");
const gradient = require("gradient-string");
const path = require("path");

const PORT = 3000;
const app = express();

const configPath = path.join(process.cwd(), "akhiro_config.json");

const config = fs.readJsonSync(configPath, { throws: true });

global.AkhiroBot = {
  botName: config.botName,
  botPrefix: config.botPrefix,
  botDev: config.botDev,
  contact: config.contact,
  botOwner: config.botOwner,
  ownerUID: config.ownerUID,
  botAdmins: config.botAdmins,
  commands: {},
  loadCmd: loadCmd,
  unloadCmd: unloadCmd,
  loadAll: loadAll,
};

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/README.md", (req, res) => {
  res.sendFile(__dirname + "/README.md");
});

function loadCommands() {
  const commandsPath = path.join(__dirname, "akhiro", "cmds");
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  commandFiles.forEach((file) => {
    const startTime = new Date();
    const commandName = file.replace(".js", "");
    const command = require(path.join(commandsPath, file));
    const endTime = new Date();

    if (command.config && command.onRun) {
      global.AkhiroBot.commands[commandName] = command;

      const duration = endTime - startTime;
    const loadingLog = gradient.rainbow(
      `[ COMMAND ] Loaded ${commandName}.js (${duration}ms)`,
    );
    console.log(loadingLog);

    } 
  });
  console.log("");
}

function loadCmd(file) {
  const filePath = path.join(__dirname, 'akhiro', 'cmds', `${file}.js`);

  try {
    const command = require(filePath);
    const { name } = command.config;
    global.AkhiroBot.commands[name] = command;
    return { success: true, message: `Command "${name}" loaded successfully.` };
  } catch (error) {
    return { success: false, message: `Error loading command from file "${file}.js": ${error.message}` };
  }
}

function unloadCmd(name) {
  const command = global.AkhiroBot.commands[name];

  if (command) {
    delete global.AkhiroBot.commands[name];
    return { success: true, message: `Command "${name}" unloaded successfully.` };
  } else {
    return { success: false, message: `Command "${name}" not found.` };
  }
}

function loadAll() {
  const commandsDir = path.join(__dirname, 'akhiro', 'cmds');
  const files = fs.readdirSync(commandsDir);

  const results = [];

  for (const file of files) {
    if (file.endsWith('.js')) {
      const result = loadCmd(file.replace('.js', ''));
      results.push(result);
    }
  }

  return results;
}

function initializeBot() {
  try {
    const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));
    login({ appState }, (err, api) => {
      try {
        if (err) {
          throw new Error(`❌ | Error while logging in: ${err}`);
        }

        fs.writeFileSync("appstate.json", JSON.stringify(api.getAppState()));

        api.setOptions({
          listenEvents: true,
          logLevel: "silent",
        });

          api.listen(async (err, event, message) => {
            try {
              if (err) {
                throw new Error(`❌ | Error while listening: ${err}`);
              }

              const applyFonts = (text, fontType) => {
  const selectedFont = fonts[fontType.toLowerCase()];
  if (!selectedFont) return text;

  const result = text
    .split('')
    .map(char => selectedFont[char] || char)
    .join('');

  return result;
};

          const fonts = {
            sans: {
              a: "𝖺", b: "𝖻", c: "𝖼", d: "𝖽", e: "𝖾", f: "𝖿", g: "𝗀", h: "𝗁", i: "𝗂", j: "𝗃",
              k: "𝗄", l: "𝗅", m: "𝗆", n: "𝗇", o: "𝗈", p: "𝗉", q: "𝗊", r: "𝗋", s: "𝗌", t: "𝗍",
              u: "𝗎", v: "𝗏", w: "𝗐", x: "𝗑", y: "𝗒", z: "𝗓",
              A: "𝖠", B: "𝖡", C: "𝖢", D: "𝖣", E: "𝖤", F: "𝖥", G: "𝖦", H: "𝖧", I: "𝖨", J: "𝖩",
              K: "𝖪", L: "𝖫", M: "𝖬", N: "𝖭", O: "𝖮", P: "𝖯", Q: "𝖰", R: "𝖱", S: "𝖲", T: "𝖳",
              U: "𝖴", V: "𝖵", W: "𝖶", X: "𝖷", Y: "𝖸", Z: "𝖹",
              0: "𝟢", 1: "𝟣", 2: "𝟤", 3: "𝟥", 4: "𝟦", 5: "𝟧", 6: "𝟨", 7: "𝟩", 8: "𝟪", 9: "𝟫",
            },
            bold: {
              a: "𝗮", b: "𝗯", c: "𝗰", d: "𝗱", e: "𝗲", f: "𝗳", g: "𝗴", h: "𝗵", i: "𝗶", j: "𝗷",
              k: "𝗸", l: "𝗹", m: "𝗺", n: "𝗻", o: "𝗼", p: "𝗽", q: "𝗾", r: "𝗿", s: "𝘀", t: "𝘁",
              u: "𝘂", v: "𝘃", w: "𝘄", x: "𝘅", y: "𝘆", z: "𝘇",
              A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜", J: "𝗝",
              K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥", S: "𝗦", T: "𝗧",
              U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",
              0: "𝟢", 1: "𝟣", 2: "𝟤", 3: "𝟥", 4: "𝟦", 5: "𝟧", 6: "𝟨", 7: "𝟩", 8: "𝟪", 9: "𝟫",
            },
            applyFonts: applyFonts,
          };

              const processCommand = async () => {
                const [inputCommand, ...args] = event.body
                  .slice(global.AkhiroBot.botPrefix.length)
                  .trim()
                  .split(" ");

                const commandName = Object.keys(global.AkhiroBot.commands).find(
                  (key) =>
                    global.AkhiroBot.commands[key].config.aliases?.includes(inputCommand) ||
                    key === inputCommand,
                );

                if (commandName) {
                  const command = global.AkhiroBot.commands[commandName];

                  if (command && command.onRun) {
                    if (command.config && command.config.role) {
                      const requiredRole = command.config.role;

                      if (requiredRole === 1) {
                        function isAdmin(userId) {
                          return global.AkhiroBot.botAdmins.includes(userId);
                        }

                        if (!isAdmin(event.senderID)) {
                          api.sendMessage(
                            "❌ | You don't have the required role to execute this command.",
                            event.threadID,
                            event.messageID,
                          );
                          return;
                        }
                      }
                    }

                    await command.onRun({ api, event, args, fonts });
                  } else {
                    api.sendMessage(
                      `❌ | Invalid command, use \`${global.AkhiroBot.botPrefix}help\` to show available commands.`,
                      event.threadID,
                      event.messageID,
                    );
                  }
                } else {
                  api.sendMessage(
                    `❌ | Invalid command, use \`${global.AkhiroBot.botPrefix}help\` to show available commands.`,
                    event.threadID,
                    event.messageID,
                  );
                }
              };

              if (event.body && event.body.toLowerCase() === "bot") {
       api.sendMessage({body: `▄▀█ █▄▀ █░█ █ █▀█ █▀█
█▀█ █░█ █▀█ █ █▀▄ █▄█
━━━━━━━━━━━━━━━━━━━
 𝖧𝖾𝗅𝗅𝗈 𝗍𝗁𝖾𝗋𝖾 𝗎𝗌𝖾𝗋 𝗈𝖿 𝗔𝗸𝗵𝗶𝗿𝗼𝗕𝗢𝗧, 𝖬𝖺𝗒 𝖨 𝗂𝗇𝗍𝗋𝗈𝖽𝗎𝖼𝖾 𝗆𝗒 𝗌𝖾𝗅𝖿 𝖿𝗂𝗋𝗌𝗍, 𝖨𝗆 𝗔𝗸𝗵𝗶𝗿𝗼𝗕𝗢𝗧, 𝖺 𝖿𝗋𝗂𝖾𝗇𝖽𝗅𝗒 𝖠𝗋𝗍𝗂𝖿𝗂𝖼𝗂𝖺𝗅 𝖨𝗇𝗍𝖾𝗅𝗅𝗂𝗀𝖾𝗇𝖼𝖾 𝖬𝖾𝗌𝗌𝖾𝗇𝗀𝖾𝗋 𝖢𝗁𝖺𝗍𝖡𝗈𝗍 𝗆𝖺𝖽𝖾 𝖻𝗒 𝗥𝘂𝗶 𝗥𝗲𝗼𝗴𝗼, 𝗙𝗿𝗮𝗻𝗰𝗶𝘀 𝗟𝗼𝘆𝗱 𝗥𝗮𝘃𝗮𝗹 𝖺𝗇𝖽 𝗟𝗶𝗮𝗻𝗲 𝗖𝗮𝗴𝗮𝗿𝗮. 𝖬𝗒 𝖼𝗎𝗋𝗋𝖾𝗇𝗍 𝗉𝗋𝖾𝖿𝗂𝗑 𝗂𝗌 𝗍𝗁𝗂𝗌 ${global.AkhiroBot.botPrefix}, 𝖸𝗈𝗎 𝗆𝖺𝗒 𝗎𝗌𝖾 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 ${global.AkhiroBot.botPrefix}𝗁𝖾𝗅𝗉 𝗍𝗈 𝗌𝖾𝖾 𝗍𝗁𝖾 𝖼𝗈𝗆𝗆𝖺𝗇𝖽𝗌. 

𝖳𝗁𝖺𝗇𝗄 𝗒𝗈𝗎 𝖿𝗈𝗋 𝖼𝗁𝗈𝗈𝗌𝗂𝗇𝗀 𝗆𝖾 𝖺𝗌 𝗒𝗈𝗎𝗋 𝖠𝖨 𝖻𝗎𝖽𝖽𝗒. 𝖬𝗒 𝖽𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋𝗌 𝖺𝗋𝖾 𝖼𝗎𝗋𝗋𝖾𝗇𝗍𝗅𝗒 𝗎𝗉𝖽𝖺𝗍𝗂𝗇𝗀 𝗆𝗒 𝗌𝗒𝗌𝗍𝖾𝗆 𝖻𝗎𝗍 𝗍𝗁𝖾𝗒 𝖽𝗈 𝗍𝗁𝖾𝗂𝗋 𝖻𝖾𝗌𝗍 𝗍𝗈 𝗎𝗉𝖽𝖺𝗍𝖾 𝗆𝗒 𝗌𝗒𝗌𝗍𝖾𝗆.`, attachment: fs.createReadStream(__dirname + "/akhiro/cmds/noprefix/prefix.mp4")});
              } else if (event.body && event.body.toLowerCase().startsWith(global.AkhiroBot.botPrefix)) {
                await processCommand();
              }
            } catch (error) {
              console.error(chalk.red(`${error}`));
            }
        });
      } catch (error) {
        console.error(chalk.red(`${error}`));
      }
    });
  } catch (error) {
    console.error(chalk.red(`❌ | Error initializing bot: ${error}`));
  }
}

app.listen(PORT, () => {
  console.log(gradient.retro(`    ▄▀█ █▄▀ █░█ █ █▀█ █▀█ █▄▄ █▀█ ▀█▀
    █▀█ █░█ █▀█ █ █▀▄ █▄█ █▄█ █▄█ ░█░
              Version 1.0.0`));
  console.log(gradient.retro("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"));
  console.log(gradient.retro("[ SYSTEM ] Getting started..."));
  console.log(gradient.retro(`[ SYSTEM ] Website running on port ${PORT}`));
  console.log(gradient.retro("[ SYSTEM ] Successfully connected to Database"));
  console.log(gradient.retro(`[ SYSTEM ] Starting AkhiroBot`));
  console.log(gradient.retro(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`))
  console.log(gradient.rainbow(`
   █▀ █▀█ █▀▄▀█ █▀▄▀█ ▄▀█ █▄░█ █▀▄ █▀
   █▄ █▄█ █░▀░█ █░▀░█ █▀█ █░▀█ █▄▀ ▄█`));
  console.log();
  loadCommands();
  console.log(gradient.retro(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`));
  console.log(gradient.retro(`    ▄▀█ █▄▀ █░█ █ █▀█ █▀█ █▄▄ █▀█ ▀█▀
    █▀█ █░█ █▀█ █ █▀▄ █▄█ █▄█ █▄█ ░█░
            BOT INFORMATION`));
  console.log();
  console.log(gradient.retro(`[ BOT NAME ] AKHIROBOT`));
  console.log(gradient.retro(`[ BOT PRFX ] ${global.AkhiroBot.botPrefix} `));
  console.log(gradient.retro(`[ BOT OWNER ] ${global.AkhiroBot.botOwner}`));
  console.log(gradient.retro(`[ BOT DEVS ] ${global.AkhiroBot.botDev}`));
  initializeBot()
}); 
