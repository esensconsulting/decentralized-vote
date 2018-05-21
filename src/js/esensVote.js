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

  getScrutinLength: function () {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.getScrutinLength.call(
        {from: Vue.prototype.$account}
      ).then(length => {
        resolve(length.c[0])
      }).catch(err => {
        reject(err)
      })
    })
  },

  getScrutinId: function (id) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.scrutins.call(id,
        {from: Vue.prototype.$account}
      ).then(scrutin => {
        resolve(scrutin)
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

  getPropositionsIdByScrutinId: function (id) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.getPropositionsIdByScrutinId.call(id,
        {from: Vue.prototype.$account}
      ).then(ids => {
        resolve(ids)
      }).catch(err => {
        reject(err)
      })
    })
  },

  getPropositionByScrutinIdAndPropositionId: function (scrutinId, propositionId) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.getPropositionByScrutinIdAndPropositionId.call(scrutinId,
        propositionId,
        {from: Vue.prototype.$account}
      ).then(proposition => {
        resolve(proposition)
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
  },

  getVoteCountByScrutinId: function (scrutinId) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.getVoteCountByScrutinId.call(scrutinId,
        {from: Vue.prototype.$account}
      ).then((countVoteScrutin) => {
        resolve(countVoteScrutin.c[0])
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default EsensVote
