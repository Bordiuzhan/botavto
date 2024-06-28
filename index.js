const TelegramApi = require("node-telegram-bot-api");
const mongoose = require("./db");
const ExitModel = require("./models");
const Bluebird = require("bluebird");
const { registerOptions, viewExitsOptions } = require("./options");

const token = "7459932806:AAGQK0mqSOkt-AuH5AgXw3szzzCHbY6vpgk";

const bot = new TelegramApi(token, { polling: true });
bot.Promise = Bluebird;
Bluebird.config({
  cancellation: true,
});

const start = async () => {
  try {
    // Підключення до MongoDB вже виконується в db.js
  } catch (e) {
    console.log("Підключення до БД не вдалося", e);
  }

  bot.setMyCommands([
    { command: "/start", description: "Початкове вітання" },
    { command: "/register", description: "Реєстрація виїзду автомобіля" },
    { command: "/view_exits", description: "Перегляд всіх виїздів" },
  ]);

  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    try {
      if (text === "/start") {
        return bot.sendMessage(
          chatId,
          `Ласкаво просимо до системи реєстрації виїзду автомобілів! Використовуйте команду /register для реєстрації виїзду, або /view_exits для перегляду всіх виїздів.`,
        );
      }
      if (text === "/register") {
        await bot.sendMessage(chatId, "Введіть номерний знак автомобіля:");
        bot.once("message", async (msg) => {
          const licensePlate = msg.text;
          const exit = new ExitModel({ licensePlate });
          await exit.save();
          return bot.sendMessage(
            chatId,
            `Виїзд автомобіля з номером ${licensePlate} успішно зареєстровано!`,
          );
        });
        return;
      }
      if (text === "/view_exits") {
        const exits = await ExitModel.find();
        if (exits.length === 0) {
          return bot.sendMessage(
            chatId,
            "На даний момент немає зареєстрованих виїздів.",
          );
        }
        let response = "Список зареєстрованих виїздів:\n";
        exits.forEach((exit, index) => {
          response += `${index + 1}. Номерний знак: ${exit.licensePlate}, Час виїзду: ${exit.exitTime}\n`;
        });
        return bot.sendMessage(chatId, response);
      }
      return bot.sendMessage(chatId, "Я тебе не розумію, спробуй ще раз!)");
    } catch (e) {
      return bot.sendMessage(chatId, "Сталася якась помилка!)");
    }
  });
};

start();
