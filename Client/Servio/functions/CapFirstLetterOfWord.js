export const capFirstLetter = (word) => {
  return word
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  // return word.charAt(0).toUpperCase() + word.slice(1);
};
