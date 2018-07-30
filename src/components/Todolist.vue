<template>
  <div id="e3" style="max-width: 400px; margin: auto;">
    <v-card class="todolist">
      <v-container fluid grid-list-lg>
        <v-btn outline round v-on:click="inputTask">Add New Tasks</v-btn>
        
        <v-layout row wrap>

          <v-flex xs12 py-3 v-for="(task, i) in tasks" :key="`${i}`">
            <v-card color="blue-grey darken-2" class="white--text" v-if="task.status === 0">
              <v-card-title primary-title>
                <div class="headline">{{ task.taskTitle }}</div>
              </v-card-title>
              <v-card-title primary-title>
                <div>Due Date: {{ task.due }}</div>
              </v-card-title>

              <v-card-actions>
                <v-btn color="success" flat>View</v-btn>
                <v-btn color="info" flat v-on:click='setTaskDone(task.taskId)'> Done</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="error" flat v-on:click='deleteTask(task.taskId)'>Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import { mapActions } from 'vuex'
import { mapState } from 'vuex'

export default {
    methods: {
        ...mapActions([
            'postTaskByUserId',
            'getTaskByUserId',
            'updateTaskByUserId'
        ]),
        inputTask: async function () {
              const {value: newTask} = await swal({
                title: 'Multiple inputs',
                html:
                  'Task to do : <input id="todoTask" class="swal2-input">' +
                  'Due date : <input type="date" id="todoDue" class="swal2-input">',
                focusConfirm: false,
                preConfirm: () => {
                  return {
                    inputTodoTask: document.getElementById('todoTask').value,
                    inputTodoDueDate: document.getElementById('todoDue').value
                  }
                }
              })

              if (newTask.inputTodoTask === "" || newTask.inputTodoDueDate === "") {
                swal({
                  type: 'error',
                    title: 'Ouch ..',
                    text: 'All field must not be empty!'
                  })
              } else {
                let payload = {
                    taskTitle: newTask.inputTodoTask,
                    taskDue: newTask.inputTodoDueDate
                }

                this.postTaskByUserId(payload)

              }
        }, 
        deleteTask: function (taskId) {
          let payload = {
            taskId: taskId,
            status: 3
          }

          this.updateTaskByUserId(payload)
        },
        setTaskDone: function (taskId) {
          let payload = {
            taskId: taskId,
            status: 1
          }

          this.updateTaskByUserId(payload)
        }
    },
    computed: {
        ...mapState([
          'tasks'
        ])
    }, created: function () {
        this.getTaskByUserId()
    }
}
</script>

<style>

</style>
