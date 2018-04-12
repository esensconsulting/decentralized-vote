import contract from 'truffle-contract'
import EsensVoteContract from '@contracts/EsensVote.json'

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
        {from: window.web3.eth.accounts[0]}
      ).then(length => {
        resolve(length.c[0])
      }).catch(err => {
        reject(err)
      })
    })
  },

  getScrutinNameById: function (id) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.scrutins.call(id,
        {from: window.web3.eth.accounts[0]}
      ).then(name => {
        resolve(window.web3.utils.toAscii(name[0]))
      }).catch(err => {
        reject(err)
      })
    })
  },

  getPropositionsIdByScrutinId: function (id) {
    let self = this

    return new Promise((resolve, reject) => {
      self.instance.getPropositionsIdByScrutinId.call(id,
        {from: window.web3.eth.accounts[0]}
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
        {from: window.web3.eth.accounts[0]}
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
      self.instance.submitVote.call(propositionId,
        {from: window.web3.eth.accounts[0]}
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
        {from: window.web3.eth.accounts[0]}
      ).then((countVoteScrutin) => {
        resolve(countVoteScrutin)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default EsensVote
