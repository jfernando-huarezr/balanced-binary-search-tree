import BinarySearchTree from "./src/binary-search-tree.js";

function generateRandomNumbers(n, min, max) {
  let randomNumbers = [];
  for (let i = 0; i < n; i++) {
    randomNumbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return randomNumbers;
}

const array = generateRandomNumbers(30, 0, 100);
let bst = new BinarySearchTree();

bst.buildTree(array);

console.log(bst.isBalanced());
bst.prettyPrint();

console.log(bst.inOrder());
console.log(bst.preOrder());
console.log(bst.postOrder());

for (let i = 0; i < 20; i++) {
  bst.insert(Math.floor(Math.random() * (100 - 0 + 1)) + 0);
}

bst.prettyPrint();
console.log(bst.isBalanced());

bst.rebalance();
bst.prettyPrint();
console.log(bst.isBalanced());

console.log(bst.inOrder());
console.log(bst.preOrder());
console.log(bst.postOrder());
