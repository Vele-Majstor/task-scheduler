export type Node<T> = {
  val: T
  left: TreeNode<T> | null
  right: TreeNode<T> | null
}

class TreeNode<T> {
  val: T
  left: TreeNode<T> | null
  right: TreeNode<T> | null

  constructor(val: T) {
    this.val = val
    this.left = null
    this.right = null
  }
}

export function buildTree<T>(nums: T[]): TreeNode<T> | null {
  if (nums.length === 0) {
    return null
  }
  const root = new TreeNode<T>(nums[0])
  const q: TreeNode<T>[] = [root]
  let i = 1
  while (i < nums.length) {
    const curr = q.shift() as TreeNode<T>
    if (i < nums.length) {
      curr.left = new TreeNode<T>(nums[i++])
      q.push(curr.left)
    }
    if (i < nums.length) {
      curr.right = new TreeNode<T>(nums[i++])
      q.push(curr.right)
    }
  }
  return root
}

export function printTree<T>(root: TreeNode<T> | null) {
  if (!root) {
    return
  }
  printTree(root.left)
  printTree(root.right)
}
