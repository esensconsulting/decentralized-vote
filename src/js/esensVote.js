import contract from 'truffle-contract'
import EsensVoteContract from '@contracts/EsensVote.json'
import Vue from 'vue'

const EsensVote = {

  contract: null,

  instance: null,

  init: function () {
    let self = this

    return new Promise(function (resolve, reject) {
      self.contract = contract(EsensVoteContract)
      self.contract.setProvider(window.web3.currentProvider)

      self.contract.deployed().then(instance => {
        self.instance = instance
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  isAdmin: function (id) {
    let self = this
    return new Promise((resolve, reject) => {
      self.instance.isAdmin.call(id,
        {from: Vue.prototype.$account}
      ).then(isAdmin => {
        resolve(isAdmin)
      }).catch(err => {
        reject(err)
      })
    })
  },

  submitVote: function (propositionId) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.submitVote(propositionId,
        {from: Vue.prototype.$account}
      ).then((msg) => {
        resolve(msg)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default EsensVote
