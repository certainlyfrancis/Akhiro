const axios = require("axios");

module.exports = {
    config: {
        name: "butler",
        aliases: ["butl", "butlbot"],
        author: "AkhiroDEV || LiANE",
        description: "Chat with Butler AI",
        usage: "{p}butler {query}",
    },
    onRun: async ({ args, events, api, usersData }) => {
        const { name } = await usersData.get(events.senderID);
        const query = args.join(" ") || "hello";

        if (!query) {
            api.sendMessage("ℹ️ | Please provide a query", events.messageID, events.threadID);
            api.setMessageReaction("ℹ️", events.messageID);
            return;
        }

        api.setMessageReaction("⏳", events.messageID);
        api.sendMessage("⏳ | Butler is answering, please wait....", events.threadID);

        try {
            const response = await axios.get(`https://lianeapi.onrender.com/@coffee_mark/api/butler?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name || "a user")}&query=${encodeURIComponent(query)}`);
            const answer = response.data.answer;
            api.sendMessage(answer, events.threadID);
        } catch (error) {
            console.error("Error:", error);
            api.sendMessage("⚠️ | Sorry, there was an error processing your request.", events.threadID);
        }
    }
};
