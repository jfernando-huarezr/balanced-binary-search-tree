import mergeSort from "./merge-sort.js";

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export default class BinarySearchTree {
  constructor() {
    this.root = null;
    this.sortedArray = [];
    this.bfsArray = [];
    this.dfsArray = [];
    this.balanced = false;
  }

  //build a balanced search tree from an array input (only numbers)
  buildTree(array) {
    this.sortedArray = [...new Set(mergeSort(array))];
    const copyArray = this.sortedArray.slice();
    this.root = this.buildTreeRecursive(copyArray);
  }

  buildTreeRecursive(array) {
    if (array.length === 0) {
      return null;
    }

    const midIndex = Math.floor(array.length / 2);
    const node = new Node(array[midIndex]);

    node.left = this.buildTreeRecursive(array.slice(0, midIndex));
    node.right = this.buildTreeRecursive(array.slice(midIndex + 1));

    return node;
  }

  insert(value) {
    // create new node
    const newNode = new Node(value);

    // if tree empty
    if (!this.root) {
      this.root = newNode;
      return;
    }

    // else, use recursion
    this.insertRecursive(newNode, this.root);
  }

  insertRecursive(newNode, node) {
    // if left
    if (newNode.value < node.value) {
      // if empty space, insert
      if (!node.left) node.left = newNode;
      // else use recursion again
      else this.insertRecursive(newNode, node.left);
    }

    // if right
    if (newNode.value > node.value) {
      // if empty insert
      if (!node.right) node.right = newNode;
      // else use recursion
      else this.insertRecursive(newNode, node.right);
    }
  }

  remove(value) {
    if (!this.root) return null;
    // use remove recursion
    this.root = this.removeRecursive(value, this.root);
  }

  removeRecursive(value, node) {
    // if node doesnt exist/is empty
    if (!node) return null;

    // if node found
    if (value === node.value) {
      // case 1: node without children, it goes null
      if (!node.left && !node.right) {
        node = null;
        return node;
      }
      // caso 2: node with single child, replace the node with the child
      if (node.left && !node.right) {
        node = node.left;
        return node;
      }

      if (node.right && !node.left) {
        node = node.right;
        return node;
      }

      // case 3: node with two children
      if (node.left && node.right) {
        // (redundant validation but i like it)
        // search minimum in the right branch
        let minNode = this.findMin(node.right);
        // replace node with minNode
        node.value = minNode.value;
        // delete minNode
        this.right = this.removeRecursive(minNode.value, node.right);

        return node;
      }
    }

    // if node we want to delete is on the left
    if (value < node.value) {
      node.left = this.removeRecursive(value, node.left);
      return node;
    }

    // if node we want to delete is on the right
    if (value > node.value) {
      node.right = this.removeRecursive(value, node.right);
      return node;
    }
  }

  find(value) {
    if (!this.root) return null;

    let current = this.root;

    while (current) {
      if (current.value === value) return current;

      value < current.value
        ? (current = current.left)
        : (current = current.right);
    }

    return null;
  }

  levelOrder(callback) {
    if (!this.root) return null;

    let queue = [];
    this.bfsArray = [];

    let current = null;
    queue.unshift(this.root);

    while (queue.length !== 0) {
      current = queue.pop();
      typeof callback === "function"
        ? callback(current)
        : this.bfsArray.push(current.value);
      if (current.left) queue.unshift(current.left);
      if (current.right) queue.unshift(current.right);
    }

    if (this.bfsArray.length !== 0) return this.bfsArray;
  }

  inOrder(callback) {
    if (!this.root) return null;

    this.dfsArray = [];

    this.inOrderRecursive(this.root, callback);

    if (this.dfsArray.length !== 0) return this.dfsArray;
  }

  inOrderRecursive(node, callback) {
    // inorder
    if (node.left) this.inOrderRecursive(node.left, callback);
    typeof callback === "function"
      ? callback(node)
      : this.dfsArray.push(node.value);
    if (node.right) this.inOrderRecursive(node.right, callback);
  }

  preOrder(callback) {
    if (!this.root) return null;

    this.dfsArray = [];

    this.preOrderRecursive(this.root, callback);

    if (this.dfsArray.length !== 0) return this.dfsArray;
  }

  preOrderRecursive(node, callback) {
    // preorder
    typeof callback === "function"
      ? callback(node)
      : this.dfsArray.push(node.value);
    if (node.left) this.preOrderRecursive(node.left, callback);
    if (node.right) this.preOrderRecursive(node.right, callback);
  }

  postOrder(callback) {
    if (!this.root) return null;

    this.dfsArray = [];

    this.postOrderRecursive(this.root, callback);

    if (this.dfsArray.length !== 0) return this.dfsArray;
  }

  postOrderRecursive(node, callback) {
    // postorder
    if (node.left) this.postOrderRecursive(node.left, callback);
    if (node.right) this.postOrderRecursive(node.right, callback);
    typeof callback === "function"
      ? callback(node)
      : this.dfsArray.push(node.value);
  }

  findMin(node) {
    if (!node) node = this.root;

    // go all the way to the left
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  findMax(node) {
    // if node is empty, guess it's root
    if (!node) node = this.root;

    // go all the way to the right
    let current = node;
    while (current.right) {
      current = current.right;
    }
    return current;
  }

  getSortedArray() {
    this.sortedArray = [];
    this.getSortedArrayRecursive(this.root);
    return this.sortedArray;
  }

  getSortedArrayRecursive(node) {
    // inorder
    if (node.left) this.getSortedArrayRecursive(node.left);
    this.sortedArray.push(node.value);
    if (node.right) this.getSortedArrayRecursive(node.right);
  }

  height(node) {
    if (!node) node = this.root;
    return this.heightRecursive(node);
  }

  heightRecursive(node) {
    if (node == null) {
      // The height of an empty tree is -1
      return -1;
    } else {
      // Compute the height of each subtree
      let leftHeight = this.heightRecursive(node.left);
      let rightHeight = this.heightRecursive(node.right);

      // The height of the node is the maximum height of its two subtrees, plus 1
      return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  depth(node) {
    if (!node) return 0;

    let current = this.root;
    let depth = 0;

    while (current) {
      if (current === node) return depth;

      node.value < current.value
        ? (current = current.left)
        : (current = current.right);

      depth++;
    }

    return 0;
  }

  isBalanced() {
    return this.checkBalance(this.root) !== -1;
  }

  checkBalance(node) {
    if (node == null) {
      return 0;
    }

    let leftHeight = this.checkBalance(node.left);
    let rightHeight = this.checkBalance(node.right);

    if (
      leftHeight === -1 ||
      rightHeight === -1 ||
      Math.abs(leftHeight - rightHeight) > 1
    ) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  rebalance() {
    if (this.isBalanced()) return;

    this.getSortedArray();
    this.buildTree(this.sortedArray);
  }

  print() {
    // if tree empty
    if (!this.root) {
      console.log("El árbol está vacío.");
      return;
    }

    this.printRecursive(this.root);
  }

  printRecursive(node) {
    // DFS - Depth First Traversal

    // preorder traverse from the root to the left subtree then to the right subtree.
    // Root, Left, Right.

    // console.log(node.value)
    // if (node.left) this.printRecursive(node.left)
    // if (node.right) this.printRecursive(node.right)

    // inorder:  traverse from the left subtree to the root then to the right subtree
    // Left, Root, Right.
    if (node.left) this.printRecursive(node.left);
    console.log(node.value);
    if (node.right) this.printRecursive(node.right);

    // postorder: traverse from the left subtree to the right subtree then to the root
    // Left, Right, Root.
    // if (node.left) this.printRecursive(node.left)
    // if (node.right) this.printRecursive(node.right)
    // console.log(node.value)
  }

  printVisual() {
    // if empty tree
    if (!this.root) {
      console.log("El árbol está vacío.");
      return;
    }

    // else
    this.printVisualRecursive(this.root, 0);
  }

  printVisualRecursive(node, level) {
    // generate tabulation
    let tabulation = "├" + "──".repeat(level);

    // print node
    console.log(tabulation + node.value);

    // print children
    if (node.left) this.printVisualRecursive(node.left, level + 1);
    if (node.right) this.printVisualRecursive(node.right, level + 1);
  }

  prettyPrint() {
    // empty tree
    if (!this.root) {
      console.log("El árbol está vacío.");
      return;
    }

    // else
    this.prettyPrintRecursive(this.root);
  }

  prettyPrintRecursive(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrintRecursive(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

    if (node.left !== null) {
      this.prettyPrintRecursive(
        node.left,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }
}
