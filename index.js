import BinarySearchTree from "./src/binary-search-tree.js";

let bst = new BinarySearchTree();

const array = [20, 7, 30, 8, 98, 34, 17, 3, 110, 25, 28, 5];
const array2 = [6, 8, 5, 5, 5, 5, 5, 4, 1, 7, 2, 20, 12, 100];

bst.buildTree(array2);

bst.insert(20);
bst.insert(7);
bst.insert(30);
bst.insert(8);
bst.insert(98);
bst.insert(34);
bst.insert(17);
bst.insert(3);
bst.insert(110);
bst.insert(25);
bst.insert(28);
bst.insert(5);
bst.insert(200);

// bst.print()
// bst.remove(20)
bst.prettyPrint();
console.log(bst.find(200));
//console.log(bst.levelOrder());

// console.log(bst.inOrder());
// console.log(bst.preOrder());
//console.log(bst.postOrder());

//console.log(bst.getSortedArray())

console.log(bst.height(bst.root.right));
console.log(bst.depth(bst.root.right.right.right));
