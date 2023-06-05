<script setup lang="ts">
export type Todo = {
  text: string
  priority: number
}

import { ref, computed } from 'vue'
import { buildTree, type Node } from '../../tree/tree'
import MaxHeap from '../../minHeap/MaxHeap'
import TreeNode from '../tree/TreeNode.vue'

const minHeap = ref(new MaxHeap())
minHeap.value.insert({ text: 'Buy groceries for the week.', priority: 1 })
minHeap.value.insert({ text: 'Pay the electricity bill.', priority: 2 })
minHeap.value.insert({ text: "Schedule a doctor's appointment.", priority: 3 })
minHeap.value.insert({ text: 'Clean and organize the garage.', priority: 4 })
minHeap.value.insert({ text: 'Submit the report to your supervisor.', priority: 5 })
minHeap.value.insert({ text: 'Call and schedule a haircut.', priority: 6 })
minHeap.value.insert({ text: 'Research and book a vacation rental.', priority: 7 })

const tree = computed<Node<Todo> | null>(() => {
  return buildTree(minHeap.value.data)
})

const taskText = ref('')
const taskPriority = ref('1')

function resetFields() {
  taskText.value = ''
  taskPriority.value = '1'
}

function createTask() {
  // This is because if you try to give more that 10 items that the tree styling breaks for some reason; Need to investigate
  if (minHeap.value.length >= 10) {
    return
  }
  minHeap.value.insert({ text: taskText.value, priority: Number(taskPriority.value) })
  resetFields()
}

console.log(minHeap.value.data, tree)

function onDelete() {
  minHeap.value.delete()
}
</script>

<template>
  <div>
    <form @submit.prevent="createTask">
      <div class="control">
        <label for="inputTask">Enter task:</label>
        <input id="inputTask" type="text" required v-model="taskText" autocomplete="off" />
      </div>

      <div class="control">
        <label>Priority:</label>

        <input type="radio" id="one" value="1" v-model="taskPriority" />
        <label for="one">One</label>

        <input type="radio" id="two" value="2" v-model="taskPriority" />
        <label for="two">Two</label>

        <input type="radio" id="three" value="3" v-model="taskPriority" />
        <label for="three">Three</label>

        <input type="radio" id="four" value="4" v-model="taskPriority" />
        <label for="four">Four</label>

        <input type="radio" id="five" value="5" v-model="taskPriority" />
        <label for="five">Five</label>

        <input type="radio" id="six" value="6" v-model="taskPriority" />
        <label for="six">Six</label>

        <input type="radio" id="seven" value="7" v-model="taskPriority" />
        <label for="seven">Seven</label>

        <input type="radio" id="eight" value="8" v-model="taskPriority" />
        <label for="eight">Eight</label>

        <input type="radio" id="nine" value="9" v-model="taskPriority" />
        <label for="nine">Nine</label>

        <input type="radio" id="ten" value="10" v-model="taskPriority" />
        <label for="ten">Ten</label>
      </div>

      <div class="actions">
        <button type="submit">Create</button>
        <button type="button" @click="onDelete">Pop the most crucial task</button>
      </div>

      <p class="disclaimer">*You can't add more than 10 tasks at a time</p>
    </form>

    <div class="tree">
      <ul>
        <TreeNode :node="tree" />
      </ul>
    </div>
  </div>
</template>

<style>
.disclaimer {
  margin-top: 1rem;
  color: rgb(100 116 139);
}

.actions {
  display: flex;
  justify-content: space-evenly;
}

.control {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}

form {
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 1.5rem;
  padding-bottom: 2rem;
  margin-bottom: 1rem;
  background-color: #ffffff;
  border-radius: 0.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

button[type='button'] {
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: #047857;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  border-radius: 0.5rem;
}

button[type='button']:hover {
  background-color: #065f46;
}

button[type='submit'] {
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: #1d4ed8;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  border-radius: 0.5rem;
}

button[type='submit']:hover {
  background-color: #1e40af;
}

label {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: #111827;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
}

input[type='text'] {
  display: block;
  padding: 0.625rem;
  background-color: #f9fafb;
  color: #111827;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100%;
  border-radius: 0.5rem;
  border-width: 1px;
  border-color: #d1d5db;
}

input[type='text']:focus {
  outline-color: #1d4ed8;
  outline-width: 1px;
}

input[type='radio'] {
  background-color: #f3f4f6;
  color: #1d4ed8;
  width: 1rem;
  height: 1rem;
  border-color: #d1d5db;
}

.tree ul {
  padding-top: 20px;
  position: relative;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

.tree li {
  float: left;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 20px 5px 0 5px;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

/*We will use ::before and ::after to draw the connectors*/

.tree li::before,
.tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid #ccc;
  width: 50%;
  height: 20px;
}
.tree li::after {
  right: auto;
  left: 50%;
  border-left: 1px solid #ccc;
}

/*We need to remove left-right connectors from elements without 
any siblings*/
.tree li:only-child::after,
.tree li:only-child::before {
  display: none;
}

/*Remove space from the top of single children*/
.tree li:only-child {
  padding-top: 0;
}

/*Remove left connector from first child and 
right connector from last child*/
.tree li:first-child::before,
.tree li:last-child::after {
  border: 0 none;
}
/*Adding back the vertical connector to the last nodes*/
.tree li:last-child::before {
  border-right: 1px solid #ccc;
  border-radius: 0 5px 0 0;
  -webkit-border-radius: 0 5px 0 0;
  -moz-border-radius: 0 5px 0 0;
}
.tree li:first-child::after {
  border-radius: 5px 0 0 0;
  -webkit-border-radius: 5px 0 0 0;
  -moz-border-radius: 5px 0 0 0;
}

/*Time to add downward connectors from parents*/
.tree ul ul::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid #ccc;
  width: 0;
  height: 20px;
}

.tree li a {
  display: inline-block;
  width: 10rem;
  border: 1px solid #ccc;
  padding: 20px 30px;
  text-decoration: none;
  color: #666;
  font-family: arial, verdana, tahoma;
  font-size: 11px;
  background: #1d4ed8;
  color: #fff;

  border-radius: 0.5rem;
  -webkit-border-radius: 0.5rem;
  -moz-border-radius: 0.5rem;

  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
}

.tree li a h2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/*Time for some hover effects*/
/*We will apply the hover effect the the lineage of the element also*/
.tree li a:hover,
.tree li a:hover + ul li a {
  background: #c8e4f8;
  color: #000;
  border: 1px solid #94a0b4;
}
/*Connector styles on hover*/
.tree li a:hover + ul li::after,
.tree li a:hover + ul li::before,
.tree li a:hover + ul::before,
.tree li a:hover + ul ul::before {
  border-color: #94a0b4;
}
</style>
