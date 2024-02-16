export default function mergeSort(array) {
  // base case
  if (array.length <= 1) return array;

  // recursive definition
  let mid = Math.floor(array.length / 2);
  let left = [];
  let right = [];

  for (let i = 0; i < array.length; i++) {
    if (i < mid) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  result = [...result, ...left.slice(i), ...right.slice(j)];
  return result;
}

let array = [];
for (let i = 0; i < 30; i++) {
  array.push(Math.floor(Math.random() * 1000) + 1);
}
