<template>
  <v-container grid-list-xl>
    <search></search>
    <v-layout row wrap>
      <add-scrutin></add-scrutin>
      <scrutin v-for="scrutin in reverseScrutins" :key="scrutin.scrutinId" :scrutin="scrutin"/>
    </v-layout>
  </v-container>
</template>

<script>
  import EsensVote from '@/js/esensVote'
  import Scrutin from './Scrutin/Scrutin.vue'
  import AddScrutin from './Scrutin/AddScrutin.vue'
  import Search from './Search.vue'

  export default {
    name: 'dashboard',
    components: {
      Search,
      Scrutin,
      AddScrutin
    },
    computed: {
      reverseScrutins () {
        let resultScrutins = []
        let scrutins = this.$store.state.storeSearch.searchScrutins
        Object.keys(scrutins).sort().reverse().forEach((key) => {
          resultScrutins.push(scrutins[key])
        })
        return resultScrutins
      }
    },
    methods: {
      watchScrutinCreated () {
        let self = this
        EsensVote.instance.ScrutinCreated({}, {fromBlock: 0, toBlock: 'latest'}).watch(function (error, result) {
          if (!error) {
            let scrutin = result.args
            self.$store.commit('addScrutin', {
              scrutinId: scrutin._scrutinId.c[0],
              name: window.web3.utils.toAscii(scrutin._name),
              isVisibleResult: scrutin._isVisibleResult,
              isOpenToProposal: scrutin._isOpenToProposal,
              propositions: {},
              isAdmin: false,
              isAlreadyVoted: false,
              isStartVoted: false
            })
            self.$store.dispatch('initSearchResult')
            self.watchPropositionCreated()
            self.watchScrutinUpdated()
          }
        })
      },

      watchScrutinUpdated () {
        let self = this
        EsensVote.instance.ScrutinUpdated({}, {fromBlock: 0, toBlock: 'latest'}).watch(function (error, result) {
          if (!error) {
            let scrutin = result.args
            self.$store.commit('updateScrutin', {
              scrutinId: scrutin._scrutinId.c[0],
              name: window.web3.utils.toAscii(scrutin._name),
              isVisibleResult: scrutin._isVisibleResult,
              isOpenToProposal: scrutin._isOpenToProposal
            })
            self.$store.dispatch('initSearchResult')
          }
        })
      },

      watchPropositionCreated () {
        let self = this
        EsensVote.instance.PropositionCreated({}, {fromBlock: 0, toBlock: 'latest'}).watch(function (error, result) {
          if (!error) {
            let proposition = result.args
            self.$store.commit('addProposition', {
              propositionId: proposition._propositionId.c[0],
              scrutinId: proposition._scrutinId.c[0],
              description: window.web3.utils.toAscii(proposition._description),
              vote: 0,
              isAdmin: false,
              showUpdateProposition: false,
              isAlreadyVoted: false
            })
            self.watchVoteSubmitted()
            self.watchPropositionUpdated()
            self.$store.dispatch('initSearchResult')
          }
        })
      },

      watchPropositionUpdated () {
        let self = this
        EsensVote.instance.PropositionUpdated({}, {fromBlock: 0, toBlock: 'latest'}).watch(function (error, result) {
          if (!error) {
            let proposition = result.args
            self.$store.commit('updateProposition', {
              scrutinId: proposition._scrutinId.c[0],
              propositionId: proposition._propositionId.c[0],
              description: window.web3.utils.toAscii(proposition._description)
            })
            self.$store.dispatch('initSearchResult')
          }
        })
      },

      watchVoteSubmitted () {
        let self = this
        EsensVote.instance.VoteSubmitted({}, {fromBlock: 0, toBlock: 'latest'}).watch(function (error, result) {
          if (!error) {
            let vote = result.args
            self.$store.commit('addVote', {
              propositionId: vote._propositionId.c[0],
              scrutinId: vote._scrutinId.c[0],
              counter: vote._counter.c[0]
            })
          }
        })
      }
    },
    mounted: function () {
      let self = this

      EsensVote.init().then(() => {
        self.watchScrutinCreated()
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
    display: block;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
