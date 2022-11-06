export function formatDateDots(value, locale = "en-GB") {
  return new Date(value).toLocaleDateString(locale).replaceAll("/", ".");
}

export function formatDateSlashes(value, locale = "en-GB") {
  return new Date(value).toLocaleDateString(locale);
}
