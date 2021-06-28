export const getRandomNumber = (min = 0, max) => min + Math.floor(Math.random() * (max - min));
export const getId = () => {
  let id = '';

  while (id.length < 8) {
    const n = getRandomNumber(0, 3);

    if (n === 1) {
      // A-Z
      const code = getRandomNumber(65, 90);
      id += String.fromCharCode(code);
    } else if (n === 2) {
      // a-z
      const code = getRandomNumber(97, 122);
      id += String.fromCharCode(code);
    } else if (n === 3) {
      const code = getRandomNumber(48, 57);
      id += String.fromCharCode(code);
    }
  }
  return id;
};
