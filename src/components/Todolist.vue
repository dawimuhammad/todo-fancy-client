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
                <v-btn color="success" flat v-on:click="getWeather(task.due)">View</v-btn>
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
            'updateTaskByUserId',
            'getWeatherForecast',
            'getTodayWeather'
        ]),
        inputTask: async function () {
              const {value: newTask} = await swal({
                title: 'Multiple inputs',
                html:
                  'Task to do : <input id="todoTask" class="swal2-input">' +
                  'Due date : <input type="date" id="todoDue" class="swal2-input">' + 
                  '<small>Important! Maximun due is 7 days ahead.</small>',
                focusConfirm: false,
                preConfirm: () => {
                  return {
                    inputTodoTask: document.getElementById('todoTask').value,
                    inputTodoDueDate: document.getElementById('todoDue').value
                  }
                }
              })

              // let dueDateTask = newTask.inputTodoDueDate.split('-')
              // let dueYear = dueDateTask[0]
              // let dueMonth = dueDateTask[0]
              // let dueDay = dueDateTask[0]

              // let todayDate = new Date().getDate()
              // let todayMonth = new Date().getMonth()
              // let todayYear = new Date().getYear() + 1900

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

          swal('Ouch', 'Data has been deleted', 'success')
        },
        setTaskDone: function (taskId) {
          let payload = {
            taskId: taskId,
            status: 1
          }

          this.updateTaskByUserId(payload)
        },
        getWeather: function (due) {
            let weatherData = this.forecastWeather.data.data
            let weatherDataFound = 0

            for (let i = 0; i < weatherData.length; i++) {
                let weatherDataInDay = weatherData[i]
                if (weatherDataInDay.datetime === due) {
                    
                    weatherDataFound = 1
                    
                    swal({
                      title: `Forecast Weather at ${due}`,
                      html: `Forecast       : ${weatherDataInDay.weather.description} <br> <br>
                             Wind Speed     : ${weatherDataInDay.wind_spd} m/s<br> <br>
                             Wind Direction : ${weatherDataInDay.wind_dir} '<br> <br>
                             Temperature    : ${weatherDataInDay.temp} Celcius<br> <br>
                             Pressure       : ${weatherDataInDay.pres} mb<br> <br>
                             Humidity       : ${weatherDataInDay.rh} %<br> <br>
                             Visibility     : ${weatherDataInDay.vis} Km<br> <br>
                             <small>Some data shown above were average value of prediction</small>`,
                      imageUrl: '',
                      imageWidth: 400,
                      imageAlt: 'JAKARTA'
                    })
                }
            }


            if (weatherDataFound === 0) {
                swal({
                  type: 'error',
                  title: 'Weather data not Found!'
                })
            }
        }
    },
    computed: {
        ...mapState([
          'tasks',
          'todayWeather',
          'forecastWeather'
        ])
    }, created: function () {
        this.getTodayWeather()
        this.getWeatherForecast()
        this.getTaskByUserId()
    }
}
</script>

<style>

</style>
