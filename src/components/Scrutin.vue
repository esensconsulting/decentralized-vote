<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 lg6 mb-3>
        <v-card v-bind:class="{'is-already-vote-layout': isAlreadyVote }">
          <v-card-title primary-title class="justify-space-between">
            <div>
              <span class="headline">
                {{name}}
              </span>
              <span v-if="isAlreadyVote">
                  (Déja voté)
              </span>
            </div>
            <div align-end>
              <v-btn icon v-if="isAdmin">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn icon @click.native="showProposition = !showProposition">
                <v-icon>{{ !showProposition ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-slide-y-transition>
            <v-card-text v-if="showProposition">
              <Propositions :scrutinId="scrutinId" :isVisibleResult="isVisibleResult"></Propositions>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import EsensVote from '@/js/esensVote'
  import Propositions from './Propositions.vue'

  export default {
    name: 'scrutin',
    props: ['scrutinId'],
    components: {Propositions},
    data () {
      return {
        name: '',
        isVisibleResult: false,
        isAdmin: false,
        showProposition: false,
        isAlreadyVote: false
      }
    },
    computed: {},
    methods: {
      getPropositionIdIfUserHasAlreadyVotedOnScrutinId () {
        if (this.scrutinId !== undefined) {
          EsensVote.getPropositionIdIfUserHasAlreadyVotedOnScrutinId(this.scrutinId).then(propositionId => {
            if (propositionId !== -1) {
              this.isAlreadyVote = true
            }
          })
        }
      }
    },
    mounted: function () {
      let self = this
      EsensVote.init().then(() => {
        this.getPropositionIdIfUserHasAlreadyVotedOnScrutinId()
        EsensVote.getScrutinId(self.scrutinId).then((scrutin) => {
          self.name = window.web3.utils.toAscii(scrutin[0])
          self.isVisibleResult = scrutin[2]
        })
        EsensVote.isAdmin(self.scrutinId).then((isAdmin) => {
          self.isAdmin = isAdmin
        })
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

  .is-already-vote-layout{
    background-color: #90CAF9;
  }
</style>
