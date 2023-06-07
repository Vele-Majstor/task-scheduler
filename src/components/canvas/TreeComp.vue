<script lang="ts" setup>
import { ref, watchEffect, type Ref } from 'vue'
import type { Node } from '../../tree/tree'
import type { Todo } from '../form/CreateTask.vue'

const props = defineProps<{
  node: Node<Todo> | null
}>()

const canvas = ref(null) as Ref
const tooltip = ref(null) as Ref

watchEffect(() => {
  drawTree()
})

function drawTree() {
  if (canvas.value) {
    const canvasRef = canvas.value
    const context = canvasRef.getContext('2d') as CanvasRenderingContext2D

    context.clearRect(0, 0, canvasRef.width, canvasRef.height)

    const spacing = canvasRef.width / 8
    drawNode(context, props.node, canvasRef.width / 2, 50, 50, spacing)
  }
}

function drawNode(
  context: CanvasRenderingContext2D,
  node: Node<Todo> | null,
  x: number,
  y: number,
  radius: number,
  spacing: number
) {
  context.fillStyle = 'lightblue'
  context.beginPath()
  context.arc(x, y, radius, 0, 2 * Math.PI)
  context.fill()

  context.fillStyle = 'black'
  context.font = '12px Arial'
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  const text = truncateText(String(node?.val.text), 100, context)
  context.fillText(text, x, y)

  context.fillStyle = 'black'
  context.font = '12px Arial'
  context.fillText(String(node?.val.priority), x, y + 20)

  if (node?.left) {
    const childX = x - spacing
    const childY = y + radius * 2
    drawNode(context, node.left, childX, childY, radius, spacing / 2)

    context.beginPath()
    context.moveTo(x, y + radius)
    context.lineTo(childX, childY - radius / 2)
    context.stroke()
  }

  if (node?.right) {
    const childX = x + spacing
    const childY = y + radius * 2
    drawNode(context, node.right, childX, childY, radius, spacing / 2)

    context.beginPath()
    context.moveTo(x, y + radius)
    context.lineTo(childX, childY - radius / 2)
    context.stroke()
  }

  const debounceFn = debounce((event: MouseEvent) => {
    const rect = canvas.value.getBoundingClientRect()
    const mouseX = event.clientX - rect.left
    const mouseY = event.clientY - rect.top

    if (context.isPointInPath(mouseX, mouseY)) {
      return
    }

    context.beginPath()
    context.arc(x, y, radius, 0, 2 * Math.PI)

    if (context.isPointInPath(mouseX, mouseY)) {
      tooltip.value = node?.val.text || ''
    } else {
      tooltip.value = ''
    }
  }, 500)

  context.canvas.addEventListener('mousemove', debounceFn)
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId as ReturnType<typeof setTimeout>)
    timeoutId = setTimeout(() => {
      ;(func as Function).apply(null, args)
    }, delay)
  }
}

function truncateText(text: string, maxWidth: number, context: CanvasRenderingContext2D) {
  const ellipsis = '...'
  let truncatedText = text
  let textWidth = context.measureText(text).width

  if (textWidth > maxWidth) {
    const ellipsisWidth = context.measureText(ellipsis).width

    while (textWidth + ellipsisWidth > maxWidth && truncatedText.length > 0) {
      truncatedText = truncatedText.slice(0, -1)
      textWidth = context.measureText(truncatedText).width
    }

    return (truncatedText += ellipsis)
  }
  return truncatedText
}
</script>

<template>
  <div>
    <div class="tooltip" v-if="tooltip">{{ tooltip }}</div>
    <canvas ref="canvas" width="1200" height="800" />
  </div>
</template>

<style></style>
