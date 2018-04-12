<template>
  <v-list>
    <v-list-tile href="javascript:;" v-on:click="submitVote(proposition[2])" v-for="proposition in propositions">
      <v-list-tile-content>
        <v-list-tile-title>{{proposition[0]}}</v-list-tile-title>
        <v-list-tile-sub-title>Résultat : {{proposition[1]}}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>

</template>

<script>
  import EsensVote from '@/js/esensVote'

  export default {
    name: 'propositions',
    props: ['scrutinId'],
    data () {
      return {
        name: '',
        propositions: []
      }
    },
    computed: {},
    methods: {
      submitVote (propositionId) {
        EsensVote.submitVote(propositionId).then(() => {
          EsensVote.getVoteCountByScrutinId(this.scrutinId).then((result) => {
            console.log(result.c[0])
          })
          console.log('A voté')
        }).catch((Err) => {
          EsensVote.getVoteCountByScrutinId(this.scrutinId).then((result) => {
            console.log(result.c[0])
          })
          console.log(Err)
          console.log('Vous avez deja voté pour ce scrutin')
        })
      }
    },
    mounted: function () {
      let self = this

      EsensVote.init().then(() => {
        callGetPropositionsIdBySrcutinId()
      })

      function callGetPropositionsIdBySrcutinId () {
        EsensVote.getPropositionsIdByScrutinId(self.scrutinId).then((ids) => {
          callGetPropositionByScrutinIdAndPropositionId(ids)
        })
      }

      function callGetPropositionByScrutinIdAndPropositionId (ids) {
        ids.forEach(idBigNumber => {
          let id = idBigNumber.c[0]
          let promisePropositions = EsensVote.getPropositionByScrutinIdAndPropositionId(self.scrutinId, id)
          promisePropositions.then(proposition => {
            let formatProposition = []
            formatProposition.push(window.web3.utils.toAscii(proposition[0]))
            formatProposition.push(proposition[1].c[0])
            formatProposition.push(id)
            self.propositions.push(formatProposition)
          })
        })
      }
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
