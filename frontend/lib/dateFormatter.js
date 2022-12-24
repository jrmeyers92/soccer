export function formatDateDots(value, locale = "en-US") {
  return new Date(value).toLocaleDateString(locale).replaceAll("/", ".");
}

export function formatDateSlashes(value, locale = "en-US") {
  return new Date(value).toLocaleDateString(locale);
}

export function formateDateTest(value) {
  new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
