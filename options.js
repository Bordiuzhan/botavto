module.exports = {
  registerOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Зареєструвати виїзд", callback_data: "/register" }],
      ],
    }),
  },

  viewExitsOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "Переглянути всі виїзди", callback_data: "/view_exits" }],
      ],
    }),
  },
};
