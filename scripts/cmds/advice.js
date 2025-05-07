const axios = require('axios');
const srod = require('srod-v2');

module.exports = {
  config: {
    name: 'advice',
    version: '1.0',
    author: 'OtinXSandip',
    countDown: 5,
    role: 0,
    shortDescription: '',
    longDescription: {
      en: 'Get a random advice.',
    },
    category: 'study',
    guide: {
      en: '{prefix} <>',
    },
  },

  onStart: async function ({ api, event, args, message }) {
    try {
      // Fetching advice from srod API
      const adviceResult = await srod.GetAdvice();
      const advice = adviceResult.embed.description;

      // Translate the advice if needed
      let translatedAdvice = await translateAdvice(advice);

      // Prepare the message
      let messageToSend = `Advice: ${translatedAdvice}`;

      // Send the message
      return api.sendMessage(messageToSend, event.threadID, event.messageID);
    } catch (error) {
      console.error('Error fetching or sending advice:', error);
      return api.sendMessage('Sorry, I could not fetch the advice at the moment.', event.threadID, event.messageID);
    }
  },
};

// Translate function using Google Translate API
async function translateAdvice(advice) {
  try {
    // Google Translate API call
    const response = await axios.get(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(advice)}`
    );

    // Extract translated advice
    const translatedAdvice = response.data[0][0][0];
    return translatedAdvice;
  } catch (error) {
    console.error('Error translating advice:', error);
    return 'Error translating advice.';
  }
}
