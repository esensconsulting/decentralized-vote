<template>

</template>

<script>
  import EsensVote from '@/js/esensVote'

  export default {
    name: 'propositions',
    props: ['scrutinId'],
    data () {
      return {
        name: ''
      }
    },
    computed: {},
    methods: {},
    mounted: function () {
      let self = this
      EsensVote.init().then(() => {
        EsensVote.getPropositionsIdByScrutinId(self.scrutinId).then((ids) => {
          console.log(ids)
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
