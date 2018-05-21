<template>
  <v-container fluid>
    <v-layout>
      <v-flex md12>
        <scrutin v-for="index in scrutinLength" :key="index" v-bind:data="index" :scrutinId="index-1"></scrutin>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import EsensVote from '@/js/esensVote'
  import Scrutin from './Scrutin.vue'

  export default {
    name: 'dashboard',
    components: {Scrutin},
    data () {
      return {
        msg: 'Welcome to your truffle-vue dApp',
        scrutinLength: 0
      }
    },
    computed: {},
    methods: {},
    mounted: function () {
      let self = this
      EsensVote.init().then(() => {
        EsensVote.getScrutinLength().then(length => {
          self.scrutinLength = length
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
