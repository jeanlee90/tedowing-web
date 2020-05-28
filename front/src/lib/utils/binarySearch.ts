export type TBinarySearch<T> = (array: T[], target: T) => number;

export const getCurrentCaptionTime: TBinarySearch<number> = function (arr = [], target) {
  if (target === undefined) return -1;

  let start = 0;
  let end = arr.length - 1;
  let index = Math.floor((end - start) / 2) + start;
  let value = -1;

  if (target > arr[arr.length - 1]) {
    index = arr.length;
  } else {
    while (start < end) {
      value = arr[index];

      if (value === target) {
        break;
      } else if (target < value) {
        end = index;
      } else {
        start = index + 1;
      }

      index = Math.floor((end - start) / 2) + start;
    }
  }

  return index;
};
