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
