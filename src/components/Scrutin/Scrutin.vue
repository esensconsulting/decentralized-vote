<template>
      <v-flex xs12 lg6 mb3>
        <v-card v-bind:class="{'is-already-vote-layout': scrutin.isAlreadyVoted  }">
          <v-card-title primary-title class="justify-space-between">
            <div>
              <span class="headline">
                {{scrutin.name}}
              </span>
              <span v-if="scrutin.isAlreadyVoted ">
                  (Déja voté)
              </span>
            </div>
            <div align-end>
              <v-btn icon v-if="scrutin.isAdmin">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn icon @click.native="showProposition = !showProposition">
                <v-icon>{{ !showProposition ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-slide-y-transition>
            <v-card-text v-if="showProposition">
              <Propositions :scrutin="scrutin"/>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
</template>

<script>
  import EsensVote from '@/js/esensVote'
  import Propositions from '../Proposition/Propositions.vue'

  export default {
    name: 'scrutin',
    props: ['scrutin'],
    components: {Propositions},
    data () {
      return {
        isAdmin: false,
        showProposition: false
      }
    },
    computed: {},
    methods: {},
    mounted: function () {
      let self = this
      EsensVote.init().then(() => {
        EsensVote.isAdmin(this.scrutin.scrutinId).then((isAdmin) => {
          this.scrutin.isAdmin = isAdmin
        })
        EsensVote.getPropositionIdIfUserHasAlreadyVotedOnScrutinId(self.scrutin.scrutinId).then(propositionId => {
          if (propositionId !== -1) {
            self.$store.commit('logCurrentUserVote', {
              scrutinId: self.scrutin.scrutinId,
              propositionId: propositionId
            })
          }
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

  .is-already-vote-layout {
    background-color: #90CAF9;
  }
</style>
