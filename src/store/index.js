import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    connectedUser: {
      isLogged: false,
      login: null
    }
  },
  mutations: {
    setConnectedUserLogin (state, newLogin) {
      state.connectedUser.login = newLogin
      state.connectedUser.isLogged = true
    }
  }
})
export default store
