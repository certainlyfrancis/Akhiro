const axios = require("axios");

module.exports = {
    config: {
        name: "butler",
        aliases: ["butl", "butlbot"],
        author: "AkhiroDEV || LiANE || Rui",
        description: "Chat with Butler AI",
        usage: "butler {query}",
    },
    onRun: async ({ args, event, api }) => {
        const query = args.join(" ");

        if (!query) {
            api.sendMessage("ℹ | 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗋𝗒.", event.messageID, event.threadID);
            api.setMessageReaction("ℹ", event.messageID);
            return;
        }

        api.setMessageReaction("⏳", event.messageID);
        api.sendMessage(`⏳ | 𝗕𝘂𝘁𝗹𝗲𝗿 𝗂𝗌 𝖺𝗇𝗌𝗐𝖾𝗋𝗂𝗇𝗀 𝗍𝗈 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗋y, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍....\𝗇\𝗇✎ | 𝗤𝘂𝗲𝗿𝘆: ${query}`, event.threadID);

        try {
            const response = await axios.get(`https://lianeapi.onrender.com/@coffee_mark/api/butler?key=j86bwkwo-8hako-12C&query=${encodeURIComponent(query)}`);
            const answer = response.data.answer;
            api.sendMessage(answer, event.threadID);
        } catch (error) {
            console.error("Error:", error);
            api.sendMessage("⚠ | Sorry, there was an error processing your request.", event.threadID);
        }
    }
};
