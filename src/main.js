// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Web3 from 'web3'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'

Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c'
  }
})

Vue.config.productionTip = false

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.log('Web3 injected browser: OK.')
    window.web3 = new Web3(window.web3.currentProvider)
    // window.web3.eth.getAccounts().then(accounts => {
    store.commit('setLoading', true)
    window.web3.eth.getAccounts().then(accounts => {
      Vue.prototype.$account = accounts[0]
    })
    window.web3.eth.net.getId().then(id => {
      // see https://github.com/ethereumbook/ethereumbook/issues/110
      // user must be connected to Ropsten or local node
      if (id !== 3 && id < 10) {
        alert('Veuillez vous connecter au réseau Ropsten')
      }
    })
    // })
  } else {
    console.log('Web3 injected browser: Fail. You should consider trying MetaMask.')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
    Vue.prototype.$noMetamask = true
  }

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
  })
})

