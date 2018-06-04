<template>
  <div>
    <v-list v-bind:class="{'is-already-vote-layout': scrutin.isAlreadyVoted }">
      <v-list-tile href='javascript:;'
                   v-for='proposition in getPropositions'
                   :key="proposition.propositionId"
                   v-bind:data="proposition"
                   class="proposition"
                   >
          <v-list-tile-content
            v-on:click='submitVote(proposition.propositionId)'
            v-if="proposition.showUpdateProposition == false">
            <v-list-tile-title>
              <v-icon v-if="proposition.isAlreadyVoted">done</v-icon>
              {{proposition.description}}
            </v-list-tile-title>
            <v-list-tile-sub-title v-if='scrutin.isVisibleResult'>
              Résultat : {{proposition.vote}}
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-btn icon v-if="(scrutin.isAdmin || proposition.isAdmin) && proposition.showUpdateProposition == false"
                 @click="proposition.showUpdateProposition = true">
            <v-icon>edit</v-icon>
          </v-btn>
          <form-proposition :scrutinId="scrutin.scrutinId"
                            :proposition="proposition"
                            v-if="proposition.showUpdateProposition"
                            @isEndFormProposition="isEndFormProposition(proposition)"
                            @closeCreateProposition="proposition.showUpdateProposition = false"></form-proposition>
      </v-list-tile>
      <add-proposition v-if="scrutin.isOpenToProposal || scrutin.isAdmin" :scrutinId="scrutin.scrutinId"></add-proposition>
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
  import AddProposition from './AddProposition'
  import FormProposition from './FormProposition.vue'

  export default {
    components: {
      FormProposition,
      AddProposition},
    name: 'propositions',
    props: ['scrutin'],
    data () {
      return {
        name: '',
        showSnackBar: false,
        colorSnackBar: '',
        textSnackBar: ''
      }
    },
    computed: {
      getPropositions () {
        return this.scrutin.propositions
      }
    },
    methods: {
      initIsAdminProposition () {
        Object.keys(this.getPropositions).forEach((propositionId) => {
          EsensVote.isAdminProposition(propositionId).then((isAdmin) => {
            this.getPropositions[propositionId].isAdmin = isAdmin
          })
        })
      },

      submitVote (propositionId) {
        if (!this.scrutin.isAlreadyVoted) {
          EsensVote.submitVote(propositionId).then(() => {
            this.scrutin.isAlreadyVoted = true
            this.getPropositions[propositionId].isAlreadyVoted = true
            this.callSnackBar('success', 'Votre vote à bien été pris en compte.')
          }).catch((err) => {
            console.log(err)
            this.callSnackBar('error', 'Vous avez certainement déja voté pour ce scrutin.')
          })
        }
      },

      isEndFormProposition (proposition) {
        proposition.showUpdateProposition = false
        this.callSnackBar('success', 'Votre proposition à bien été mise à jour, vos modifications vont apparaitre d\'ici quelques secondes.')
      },

      callSnackBar (color, text) {
        this.showSnackBar = true
        this.colorSnackBar = color
        this.textSnackBar = text
      }
    },
    mounted: function () {
      let self = this

      EsensVote.init().then(() => {
        self.initIsAdminProposition()
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

  .proposition{
    height: 60px;
  }
</style>
