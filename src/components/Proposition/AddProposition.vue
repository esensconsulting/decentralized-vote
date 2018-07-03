<template>
  <div>
    <div v-if="isCreatedProposition">
      <v-card-title>
        <form-proposition
          :scrutinId="scrutinId"
          @isEndFormProposition="showSnackbar"
          @closeCreateProposition="isCreatedProposition = false"></form-proposition>
      </v-card-title>
    </div>
    <div v-else>
      <v-card-title>
        <v-btn v-on:click='isCreatedProposition = true' class="remove-background-btn" block>
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-title>
    </div>
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
  import FormProposition from './FormProposition'

  export default {
    name: 'add-proposition',
    props: ['scrutinId'],
    components: {FormProposition},
    data () {
      return {
        isCreatedProposition: false,
        showSnackBar: false,
        colorSnackBar: '',
        textSnackBar: ''
      }
    },
    computed: {},
    methods: {
      showSnackbar () {
        this.callSnackBar('success', 'Votre proposition à bien été créé, elle va apparaitre d\'ici quelques secondes.')
      },

      callSnackBar (color, text) {
        this.showSnackBar = true
        this.colorSnackBar = color
        this.textSnackBar = text
      }
    },
    mounted: function () {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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

  button.remove-background-btn.btn:not(.btn--icon):not(.btn--flat) {
    i{
      font-size: 30px;
    }
    box-shadow: none;
    background-color: #ffffff00;
    margin: 0;
  }
</style>
