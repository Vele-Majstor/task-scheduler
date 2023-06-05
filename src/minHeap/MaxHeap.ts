import type { Todo } from '@/components/form/CreateTask.vue'

export default class MaxHeap {
  public length: number
  public data: Todo[]

  constructor() {
    this.data = []
    this.length = 0
  }

  insert(value: Todo): void {
    this.data[this.length] = value
    this.heapifyUp(this.length)
    this.length++
  }
  delete(): Todo | -1 {
    if (this.length === 0) {
      return -1
    }
    const item = this.data[0]
    this.length--
    this.data[0] = this.data[this.length]
    this.data.pop()
    this.heapifyDown(0)
    return item
  }

  private heapifyDown(idx: number): void {
    const lIdx = this.leftChild(idx)
    const rIdx = this.rightChild(idx)

    if (idx >= this.length || lIdx >= this.length) {
      return
    }

    const rV = this.data[rIdx]
    const lV = this.data[lIdx]
    const v = this.data[idx]

    if (lV.priority < rV.priority && v.priority < rV.priority) {
      this.data[idx] = rV
      this.data[rIdx] = v
      this.heapifyDown(rIdx)
    } else if (rV.priority < lV.priority && v.priority < lV.priority) {
      this.data[idx] = lV
      this.data[lIdx] = v
      this.heapifyDown(lIdx)
    }
  }

  private heapifyUp(idx: number): void {
    if (idx === 0) {
      return
    }

    const p = this.parent(idx)
    const parentV = this.data[p]
    const v = this.data[idx]

    if (parentV.priority < v.priority) {
      this.data[idx] = parentV
      this.data[p] = v
      return this.heapifyUp(p)
    }
  }

  private parent(idx: number): number {
    return Math.floor((idx - 1) / 2)
  }

  private leftChild(idx: number): number {
    return idx * 2 + 1
  }

  private rightChild(idx: number): number {
    return idx * 2 + 2
  }
}
