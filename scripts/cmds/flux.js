const fs = require("fs");
const path = require("path");
const axios = require("axios");

module.exports = {
  config: {
    name: "flux",
    author: "UPoL 🐔",
    version: "3.3",
    cooldowns: 5,
    role: 0,
    category: "ai",
    guide: {
      en: "{pn} [prompt] (--model modelName)"
    },
  },
  onStart: async function ({ message, args, api, event }) {
    const models = ["dev", "schnell", "realismLora", "mini-lora"];
    let model;
    let prompt;

    const modelArgIndex = args.findIndex(arg => arg.startsWith("--model"));
    if (modelArgIndex !== -1 && args[modelArgIndex + 1]) {
      model = args[modelArgIndex + 1];
      args.splice(modelArgIndex, 2); 
    } else {
      model = models[Math.floor(Math.random() * models.length)]; 
    }

    prompt = args.join(" ");
    if (!prompt) {
      return message.reply(
        "⚠️ Please provide a prompt.\n\nUsage:\n - `{pn} your prompt`\n - `{pn} your prompt --model modelName` (Optional)",
        event.threadID
      );
    }

    const wait = await message.reply(`⏳ Generating image...\n📦 Model: [${model}]`, event.threadID);

    let imagineApiUrl;
    switch (model) {
      case "dev":
        imagineApiUrl = `https://upol-meaw-newapi.onrender.com/flux/v2?prompt=${encodeURIComponent(prompt)}`;
        break;
      case "schnell":
        imagineApiUrl = `https://upol-meaw-meaw-fluxx.onrender.com/flux?prompt=${encodeURIComponent(prompt)}`;
        break;
      case "realismLora":
        imagineApiUrl = `https://upol-flux-realismlora.onrender.com/flux/realismlora?prompt=${encodeURIComponent(prompt)}`;
        break;
      case "mini-lora":
        imagineApiUrl = `https://huggifk-flux-extra.onrender.com/flux?prompt=${encodeURIComponent(prompt)}`;
        break;
      default:
        return message.reply("❌ Invalid model! Choose from: dev, schnell, realismLora, mini-lora.", event.threadID);
    }

    try {
      const startTime = Date.now();
      const imagineResponse = await axios.get(imagineApiUrl, { responseType: "arraybuffer" });
      const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

      const cacheFolderPath = path.join(__dirname, "cache");
      if (!fs.existsSync(cacheFolderPath)) fs.mkdirSync(cacheFolderPath);

      const imagePath = path.join(cacheFolderPath, `${Date.now()}_generated.png`);
      fs.writeFileSync(imagePath, Buffer.from(imagineResponse.data, "binary"));

      if (!fs.existsSync(imagePath)) throw new Error("Image file was not created.");

      const stream = fs.createReadStream(imagePath);
      message.reply({
        body: `🖼️ Image generated in ${timeTaken}s.\n👤 Requested by: ${event.senderID}\n📦 Model used: ${model}`,
        attachment: stream
      }, event.threadID, () => {
        fs.unlink(imagePath, (err) => { if (err) console.error("File deletion error:", err); });
      });

      api.unsendMessage(wait.messageID);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      message.reply("❌ An error occurred. Please try again later.", event.threadID);
    }
  }
};