const config = require("../config.json");

module.exports.parseDate = async function parseDate(data) {
  var parsed = Date.parse(data);
  var date = new Date(parsed);
  var day = config.days[date.getDay()];
  var month = config.months[date.getMonth()];
  var hours =
    `${date.getHours()}`.length === 1
      ? `0$${date.getHours()}`
      : `${date.getHours()}`;
  var minutes =
    `${date.getMinutes()}`.length === 1
      ? `0$${date.getMinutes()}`
      : `${date.getMinutes()}`;
  var seconds =
    `${date.getSeconds()}`.length === 1
      ? `0$${date.getSeconds()}`
      : `${date.getSeconds()}`;

  return `${day}, ${date.getDate()} ${month} ${date.getFullYear()} ${hours}:${minutes}:${seconds} GMT`;
};
