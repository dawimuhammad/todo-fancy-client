import Vue from 'vue'
import Vuex from 'vuex'
import database from './firebase/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dialogLogin: false,
    dialogRegister: false,
    users: []
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
    }
  }
})
