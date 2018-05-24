<template>
  <v-flex xs12 lg6 mb3>
    <v-card>
      <div v-if="isCreatedScrutin">
        <v-card-title primary-title class="justify-space-between">
          <div>
              <span class="headline">
                Ajout scrutin
              </span>
          </div>
          <div align-end>
            <v-btn icon v-on:click='isCreatedScrutin = false'>
              <v-icon>clear</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-slide-y-transition>
          <v-card-text>
            <form-scrutin @isEndFormScrutin="isEndFormScrutin"></form-scrutin>
          </v-card-text>
        </v-slide-y-transition>
      </div>
      <div v-else>
        <v-card-title primary-title class="reduce-title">
          <v-btn v-on:click='isCreatedScrutin = true' class="remove-background-btn" block>
            <v-icon>add</v-icon>
          </v-btn>
        </v-card-title>
      </div>
    </v-card>
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
  </v-flex>
</template>

<script>
  import FormScrutin from './FormScrutin'

  export default {
    name: 'add-scrutin',
    props: [],
    components: {FormScrutin},
    data () {
      return {
        isCreatedScrutin: false,
        showSnackBar: false,
        colorSnackBar: '',
        textSnackBar: ''
      }
    },
    computed: {},
    methods: {
      isEndFormScrutin () {
        this.isCreatedScrutin = false
        this.callSnackBar('success', 'Votre scrutin à bien été créé, il va apparaitre d\'ici quelques secondes.')
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
    height: 88px;
  }

  .reduce-title{
    padding: 0;
  }
</style>
