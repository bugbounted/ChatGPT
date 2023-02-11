const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");


require('dotenv').config()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const token = process.env.TELEGRAM_BOT_TOKEN
const openai = new OpenAIApi(configuration);

const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${msg.text}.\n`,
      temperature: 0,
      max_tokens: 3800,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
  })
  
  const chatId = msg.chat.id
  
  const ans = response.data.choices.pop()

  if(!ans?.text) {

      return bot.sendMessage(chatId, "لطفا دوباره امتحان کنید، هوش مصنوعی نمی تواند داده ها را ارسال کند")
  }

  bot.sendMessage(chatId, ans?.text)
})
