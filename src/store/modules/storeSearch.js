import * as fuzzysearch from 'fuzzysearch'

export default {
  state: {
    searchScrutins: {},
    searchWord: ''
  },
  mutations: {},
  actions: {
    initSearchResult (state) {
      state.state.searchScrutins = {}
      let scrutins = state.rootState.scrutins

      Object.keys(scrutins).forEach((scrutinId) => {
        addScrutinAndCheckValueIsEqualToSearchWord(scrutins[scrutinId])
      })

      function addScrutinAndCheckValueIsEqualToSearchWord (scrutin) {
        if (checkWordOnScrutinAndProposition(scrutin)) {
          state.state.searchScrutins[scrutin.scrutinId] = scrutin
        }
      }

      function checkWordOnScrutinAndProposition (scrutin) {
        return checkIdWordSearchIsPresentInString(scrutin.name) || checkWordSearchPresentOnProposition(scrutin.propositions)
      }

      function checkWordSearchPresentOnProposition (propositions) {
        let isPresent = false
        Object.keys(propositions).forEach((propositionId) => {
          if (checkIdWordSearchIsPresentInString(propositions[propositionId].description)) {
            isPresent = true
            return
          }
        })
        return isPresent
      }

      function checkIdWordSearchIsPresentInString (word) {
        return fuzzysearch(state.state.searchWord.toLowerCase(), word.toLowerCase())
      }
    }
  },
  getters: {}
}
