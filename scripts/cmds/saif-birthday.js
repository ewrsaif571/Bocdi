module.exports = {
    config: {
        name: "saif-birthday",
        version: "1.0",
        author: "Samir",
        aliases: ["bday"],
        countDown: 5,
        role: 0,
        category: "birthday🎀",
        shortDescription: "See Admin's Birthday",
        longDescription: "Admin Birthday Countdowns",
        guide: {
            vi: "{p}{n}",
            en: "{p}{n}"
        }
    },

    onStart: async function ({ event, api }) {
        const targetDate = new Date("May 1, 2025 00:00:00").getTime(); // 2025 use korlam upcoming birthday show korar jonno
        const now = new Date().getTime();
        const t = targetDate - now;

        if (t <= 0) {
            return api.sendMessage("🎉🎂 Happy birthday dear owner!!", event.threadID, event.messageID);
        }

        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const days = Math.floor(t / (1000 * 60 * 60 * 24));

        const countdownMessage = `
🤍🎀 𝗦𝗔𝗜𝗙 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆_♡︎ 
━━━━━━━━━━━━━━━━━━━━━━
🐼 𝗕𝗶𝗿𝘁𝗵𝗱𝗮𝘆 𝗗𝗮𝘁𝗲: 1st May, 2025
📅 𝗧𝗶𝗺𝗲 𝗟𝗲𝗳𝘁: 
» ${days} days  
» ${hours} hours  
» ${minutes} minutes  
» ${seconds} seconds
━━━━━━━━━━━━━━━━━━━━━━`;

        return api.sendMessage(countdownMessage, event.threadID, event.messageID);
    }
};
