<script setup lang="ts">
import type { Node } from '../../tree/tree'
import type { Todo } from '../form/CreateTask.vue'

defineProps<{
  node: Node<Todo> | null
}>()
</script>

<template>
  <li :title="node?.val.text">
    <a href="#">
      <h2>{{ node?.val.text }}</h2>
      <hr />
      <h3>Priority:{{ node?.val.priority }}</h3>
    </a>

    <ul>
      <TreeNode v-if="node?.left" :node="node.left" />
      <TreeNode v-if="node?.right" :node="node.right" />
    </ul>
  </li>
</template>
