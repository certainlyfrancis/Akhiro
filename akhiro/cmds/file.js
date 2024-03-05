const fs = require('fs'); 

module.exports.config = {
  name: "file",
  description: "File command by cliff, converted to akhiro by Rui",
  author: "Rui | Cliff",
  usage: "file [fileName]",
  role: 1,
}; 
module.exports.onRun = async function ({ args, api, event }) {
  const fileName = args[0]; if (!fileName) {
    return api.sendMessage("Please provide a file name.", event.threadID, event.messageID);
  } const filePath = __dirname + `/${fileName}.js`; if (!fs.existsSync(filePath)) {
    return api.sendMessage(`File not found: ${fileName}.js`, event.threadID, event.messageID);
  } const fileContent = fs.readFileSync(filePath, 'utf8'); api.sendMessage({
      body: fileContent
    }, event.threadID);
};
