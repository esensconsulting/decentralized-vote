import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    scrutins: {},
    connectedUser: {
      isLogged: false,
      login: null
    },
    isLoading: false
  },
  mutations: {
    setConnectedUserLogin (state, newLogin) {
      state.connectedUser.login = newLogin
      state.connectedUser.isLogged = true
    },
    setLoading (state, status) {
      state.isLoading = status
    },
    addScrutin (state, scrutin) {
      Vue.set(state.scrutins, scrutin.scrutinId, scrutin)
    },
    updateScrutin (state, scrutin) {
      Object.keys(state.scrutins[scrutin.scrutinId]).forEach(key => {
        if (scrutin[key] !== undefined) {
          state.scrutins[scrutin.scrutinId][key] = scrutin[key]
        }
      }
    )
    },
    addProposition (state, proposition) {
      Vue.set(state.scrutins[proposition.scrutinId].propositions, proposition.propositionId, proposition)
    },
    addVote (state, vote) {
      state.scrutins[vote.scrutinId].propositions[vote.propositionId].vote = vote.counter
    },
    logCurrentUserVote (state, currentUserVote) {
      state.scrutins[currentUserVote.scrutinId].isAlreadyVoted = true
      state.scrutins[currentUserVote.scrutinId].propositions[currentUserVote.propositionId].isAlreadyVoted = true
    }
  }
})
export default store
