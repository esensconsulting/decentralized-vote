<template>
  <div>
    <v-list v-bind:class="{'is-already-vote-layout': isAlreadyVote }">
      <v-list-tile href='javascript:;'
                   v-on:click='submitVote(proposition[2])'
                   v-for='proposition in propositions'
                   :key="proposition[2]"
                   v-bind:data="proposition">
        <v-list-tile-content>
          <v-list-tile-title>
            <v-icon v-if="propositionIdAlreadyVote === proposition[2]">done</v-icon>
            {{proposition[0]}}
          </v-list-tile-title>
          <v-list-tile-sub-title v-if='isVisibleResult'>Résultat : {{proposition[1]}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-snackbar
      :timeout='6000'
      :color='colorSnackBar'
      :top='true'
      :right='true'
      v-model='showSnackBar'
    >
      {{ textSnackBar }}
      <v-btn dark flat @click.native='showSnackBar = false'>Fermer</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import EsensVote from '@/js/esensVote'

  export default {
    components: {},
    name: 'propositions',
    props: ['scrutinId', 'isVisibleResult'],
    data () {
      return {
        name: '',
        propositions: [],
        propositionIdAlreadyVote: -1,
        showSnackBar: false,
        colorSnackBar: '',
        textSnackBar: '',
        isAlreadyVote: false
      }
    },
    computed: {},
    methods: {
      submitVote (propositionId) {
        if (!this.isAlreadyVote) {
          EsensVote.submitVote(propositionId).then(() => {
            this.setAlreadyVoteAndPropositionAlreadyVote(propositionId)
            this.addCounterInPropositionByPropositionId(propositionId)
            this.callSnackBar('success', 'Votre vote à bien été pris en compte.')
          }).catch((err) => {
            console.log(err)
            this.callSnackBar('error', 'Vous avez certainement déja voté pour ce scrutin.')
          })
        }
      },

      addCounterInPropositionByPropositionId: function (propositionId) {
        this.propositions.forEach(proposition => {
          if (proposition[2] === propositionId) {
            proposition[1]++
          }
        })
      },

      callSnackBar (color, text) {
        this.showSnackBar = true
        this.colorSnackBar = color
        this.textSnackBar = text
      },

      callGetPropositionsIdBySrcutinId () {
        if (this.scrutinId !== undefined) {
          EsensVote.getPropositionsIdByScrutinId(this.scrutinId).then((ids) => {
            this.callGetPropositionByScrutinIdAndPropositionId(ids)
          })
        }
      },

      callGetPropositionByScrutinIdAndPropositionId (ids) {
        ids.forEach(idBigNumber => {
          let id = idBigNumber.c[0]
          EsensVote.getPropositionByScrutinIdAndPropositionId(this.scrutinId, id).then(proposition => {
            this.propositions.push(this.getFormatProposition(proposition, id))
          })
        })
      },

      getFormatProposition (proposition, id) {
        let formatProposition = []
        formatProposition.push(window.web3.utils.toAscii(proposition[0]))
        formatProposition.push(proposition[1].c[0])
        formatProposition.push(id)
        return formatProposition
      },

      getPropositionIdIfUserHasAlreadyVotedOnScrutinId () {
        if (this.scrutinId !== undefined) {
          EsensVote.getPropositionIdIfUserHasAlreadyVotedOnScrutinId(this.scrutinId).then(propositionId => {
            this.setAlreadyVoteAndPropositionAlreadyVote(propositionId)
          })
        }
      },

      setAlreadyVoteAndPropositionAlreadyVote (propositionId) {
        if (propositionId !== -1) {
          this.isAlreadyVote = true
          this.propositionIdAlreadyVote = propositionId
        }
      }
    },
    mounted: function () {
      EsensVote.init().then(() => {
        this.callGetPropositionsIdBySrcutinId()
        this.getPropositionIdIfUserHasAlreadyVotedOnScrutinId()
      })
    }
  }
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
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

  .is-already-vote-layout{
    background-color: #90CAF9;
  }
</style>
