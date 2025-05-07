module.exports = {
  config: {
    name: "age",
    author: "SAIF",
    countDown: 5,
    role: 0,
    category: "birthday🎀",
    shortDescription: {
      en: "mention your friend and write something to post✍️",
    },
  },

  onStart: async function ({ api, event, args }) {
    const birthday = args[0];

    if (!birthday) {
      return api.sendMessage("🎂 Please provide your birthday in YYYY-MM-DD format.", event.threadID);
    }

    const currentDate = new Date();
    const birthDate = new Date(birthday);
    const age = currentDate.getFullYear() - birthDate.getFullYear();

    birthDate.setFullYear(currentDate.getFullYear());
    const isBeforeBirthday = currentDate < birthDate;

    const finalAge = isBeforeBirthday ? age - 1 : age;

    const message = `
 Your Age Is ${finalAge} Am I Right? <😽

📅 Birthday: ${birthDate.toDateString()}
📅 Today: ${currentDate.toDateString()}

✨ Have a wonderful day! 
    `;

    api.sendMessage(message, event.threadID);
  },
};
