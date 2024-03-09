const axios = require("axios");

module.exports = {
    config: {
        name: "butler",
        aliases: ["butl", "butlbot"],
        author: "AkhiroDEV || LiANE",
        description: "Chat with Butler AI",
        usage: "{p}butler {query}",
    },
    onRun: async ({ args, events, api }) => {
        const query = args.join(" ");

        if (!query) {
            api.sendMessage("ℹ️ | 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗊𝗎𝖾𝗋𝗒.", events.messageID, events.threadID);
            api.setMessageReaction("ℹ️", events.messageID);
            return;
        }

        api.setMessageReaction("⏳", events.messageID);
        api.sendMessage(`⏳ | 𝗕𝘂𝘁𝗹𝗲𝗿 𝗂𝗌 𝖺𝗇𝗌𝗐𝖾𝗋𝗂𝗇𝗀 𝗍𝗈 𝗒𝗈𝗎𝗋 𝗊𝗎𝖾𝗋𝗒, 𝖯𝗅𝖾𝖺𝗌𝖾 𝗐𝖺𝗂𝗍....\𝗇\𝗇✎ | 𝗤𝘂𝗲𝗿𝘆: ${query}`, events.threadID);

        try {
            const response = await axios.get(`https://lianeapi.onrender.com/@coffee_mark/api/butler?key=j86bwkwo-8hako-12C&query=${encodeURIComponent(query)}`);
            const answer = response.data.answer;
            api.sendMessage(answer, events.threadID);
        } catch (error) {
            console.error("Error:", error);
            api.sendMessage("⚠️ | Sorry, there was an error processing your request.", events.threadID);
        }
    }
};
