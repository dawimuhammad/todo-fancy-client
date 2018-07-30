import Vue from 'vue'
import Vuex from 'vuex'
import database from './firebase/firebase.js'
import jwt from 'jsonwebtoken'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialogLogin: false,
    dialogRegister: false,
    users: [],
    tasks: [],
    todayWeather: [],
    forecastWeather: []
  },
  mutations: {
    changeLoginFormStatus (state, payload) {
      return state.dialogLogin  = payload
    },
    changeRegisterFormStatus (state, payload) {
      return state.dialogRegister  = payload
    },
    getUsers(state, payload) {
        return state.users = payload
    },
    emptyCommit() {

    },
    getTasks (state, payload) {
        return state.tasks = payload
    },
    changeTodayWeather (state, payload) {
        return state.todayWeather = payload
    },
    changeForecastWeather (state, payload) {
      return state.forecastWeather = payload
  }
  },
  actions: {
    changeLoginFormStatus({ commit }) {
      if (this.state.dialogLogin === false) {
          commit('changeLoginFormStatus', true)
      } else {
        commit('changeLoginFormStatus', false)
      }
    },
    changeRegisterFormStatus({ commit }) {
      if (this.state.dialogRegister === false) {
          commit('changeRegisterFormStatus', true)
      } else {
        commit('changeRegisterFormStatus', false)
      }
    },
    createUser({ commit }, payload) {
      const ref = database.ref('todo')
      const postUser = ref.child('users')
      let newPostUser = postUser.push()
      let userId = newPostUser.key

      newPostUser.set({
          userId: userId,
          email: payload.email,
          password: payload.password
      })

      commit('emptyCommit')
    },
    getUsers(context) {
      const ref = database.ref('todo')
      const users = ref.child('users')
      
      users.on("value", function(snapshot) {
          context.commit('getUsers', snapshot.val())
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        })
    },
    postTaskByUserId ({ commit }, payload) {
      let token = jwt.decode(localStorage.getItem('token'))  
      let userId = token.userId

      let ref = database.ref(`todo/users/${userId}`)
      let postTask = ref.child('tasks')
      let newPostTask = postTask.push()
      let taskId = newPostTask.key
      let defaultTaskStatus = 0

      newPostTask.set({
          taskId: taskId,
          taskTitle: payload.taskTitle,
          due: payload.taskDue,
          status: defaultTaskStatus
      })

      commit('emptyCommit')
    },
    getTaskByUserId ({ commit }) {
      // get userId from token
      let token = jwt.decode(localStorage.getItem('token'))  
      let userId = token.userId

      // reference to firebase rdb
      let ref = database.ref(`todo/users/${userId}/tasks`)

      // get data
      ref.on("value", function(snapshot) {
        commit('getTasks', snapshot.val())
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      })
    },
    updateTaskByUserId ({ commit }, payload) {
      // get userId from token
      let token = jwt.decode(localStorage.getItem('token'))  
      let userId = token.userId

      let taskId = payload.taskId

      // reference to firebase rdb
      let ref = database.ref(`todo/users/${userId}/tasks/${taskId}`)

      ref.update({
        status: payload.status
      })

      commit('emptyCommit')
    },
    getWeatherForecast ({ commit }) {
        axios.get('https://api.weatherbit.io/v2.0/forecast/daily?lat=-6.21462&lon=106.84513&days=10&key=37b243e97c6840d08294c747a4728640')
        .then(function (response) {
            // console.log(response.data)
            commit('changeForecastWeather', response)
        })
        .catch(function (err) {
            console.log(err)
        })
    },
    getTodayWeather ({ commit }) {
        axios.get('https://api.weatherbit.io/v2.0/current?lat=-6.21462&lon=106.84513&key=37b243e97c6840d08294c747a4728640')
        .then(function (response) {
            // console.log(response.data.data[0])
            commit('changeTodayWeather', response.data.data[0])
        })
        .catch(function (err) {
            console.log(err)
        })
    }
  }
})
