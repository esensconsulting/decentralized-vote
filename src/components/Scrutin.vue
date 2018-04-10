<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 lg6 mb-3>
        <v-card>
          <v-card-title primary-title class="justify-space-between">
            <div class="headline">
              {{name}}
            </div>
            <v-btn icon @click.native="showProposition = !showProposition" align-end>
              <v-icon>{{ !showProposition ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-title>
          <v-slide-y-transition>
            <v-card-text v-if="showProposition">
              <Propositions :scrutinId="scrutinId"></Propositions>
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
        showProposition: false
      }
    },
    computed: {},
    methods: {},
    mounted: function () {
      let self = this
      EsensVote.init().then(() => {
        EsensVote.getScrutinNameById(self.scrutinId).then((name) => {
          self.name = name
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
</style>
