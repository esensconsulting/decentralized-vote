<template>
  <v-container fluid>
    <v-layout>
      <v-flex md12>
        <scrutin v-for="scrutin in this.$store.state.scrutins" :key="scrutin.scrutinId" v-bind:data="scrutin.scrutinId"
                 :scrutin="scrutin"></scrutin>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import EsensVote from '@/js/esensVote'
  import Scrutin from './Scrutin.vue'
  import Vue from 'vue'

  export default {
    name: 'dashboard',
    components: {Scrutin},
    data () {
      return {}
    },
    computed: {},
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
              propositions: {},
              isAlreadyVoted: false
            })
            self.watchPropositionCreated()
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
              isAlreadyVoted: false
            })
            self.watchVoteSubmitted()
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
            self.watchCurrentUserVoteSubmited()
          }
        })
      },

      watchCurrentUserVoteSubmited () {
        let self = this
        EsensVote.instance.CurrentUserVoteSubmited({_user: Vue.prototype.$account}, {fromBlock: 0, toBlock: 'latest'}).watch(function (error, result) {
          if (!error) {
            let currentUserVote = result.args
            self.$store.commit('logCurrentUserVote', {
              scrutinId: currentUserVote._scrutinId.c[0],
              propositionId: currentUserVote._propositionId.c[0]
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
