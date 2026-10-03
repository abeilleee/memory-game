export const shuffle = (array) => {
  const arr = [...array];
  let arrLength = arr.length;
  let temp;
  let randomIndex;

  while (arrLength) {
    randomIndex = Math.floor(Math.random() * arrLength);
    arrLength--;

    temp = arr[arrLength];
    arr[arrLength] = arr[randomIndex];
    arr[randomIndex] = temp;
  }

  return arr;
};
