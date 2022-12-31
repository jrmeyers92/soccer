export function sortByDateAsc(arr) {
  return arr.sort(function (a, b) {
    let keyA = new Date(a.date);
    let keyB = new Date(b.date);

    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
}

export function sortByDateDesc(arr) {
  return arr.sort(function (a, b) {
    let keyA = new Date(a.date);
    let keyB = new Date(b.date);

    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });
}
