<template>
  <div>
    <v-text-field
      v-model="searchWord"
      append-icon="search"
      label="Recherche (Scrutins, propositions)"
      v-on:keyup="changeSearch()"
      single-line
      hide-details
    ></v-text-field>
  </div>
</template>

<script>
  import EsensVote from '@/js/esensVote'
  export default {
    name: 'search',
    components: {},
    data: () => ({
      searchWord: ''
    }),
    computed: {},
    methods: {
      changeSearch () {
        this.$store.state.storeSearch.searchWord = this.searchWord
        if (this.searchWord !== '') {
          this.$store.dispatch('initSearchResult')
          return
        }
        this.$store.state.storeSearch.searchScrutins = this.$store.state.scrutins
      }
    },
    mounted: function () {
      EsensVote.init().then(() => {
        this.$store.state.storeSearch.searchScrutins = this.$store.state.scrutins
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
