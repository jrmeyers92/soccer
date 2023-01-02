export function formatDateDots(value, locale = "en-US") {
  return new Date(value).toLocaleDateString(locale).replaceAll("/", ".");
}

export function formatDateSlashes(value, locale = "en-US") {
  return new Date(value).toLocaleDateString(locale);
}

const localeInfo = {
  name: "en-US",
  options: {
    year: "numeric",
    month: "long",
    day: "numeric",
  },
};
export function formatDate(date, localeInfo) {
  var locale = localeInfo.name;
  var options = localeInfo.options;
  return date.toLocaleDateString(locale, options);
}

export function formatTime(time) {
  let timeArr = time.split(".");
  timeArr.pop();
  let timeStr = timeArr.toString();
  let newTimeArr = timeStr.split(":");
  let AmPm = newTimeArr[0] > 11 ? "PM" : "AM";
  if (newTimeArr[0] > 12) {
    newTimeArr[0] = newTimeArr[0] - 12;
  }

  let finalTime = `${newTimeArr[0]}:${newTimeArr[1]} ${AmPm}`;

  return finalTime;
}
