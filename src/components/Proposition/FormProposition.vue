<template class="max-width">
    <v-form v-on:submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="description"
        :rules="descriptionRules"
        :counter="32"
        label="Nom de la proposition"
        required
      ></v-text-field>
      <v-btn icon :disabled="!valid" @click="submit">
        <v-icon>done</v-icon>
      </v-btn>
      <v-btn icon @click="clear">
        <v-icon>undo</v-icon>
      </v-btn>
      <v-btn icon @click="close">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-form>
</template>

<script>
  import EsensVote from '@/js/esensVote'
  import StringUtils from '../../js/utils/StringUtils'

  export default {
    name: 'form-proposition',
    props: ['scrutinId', 'proposition'],
    components: {},
    data: () => ({
      valid: true,
      description: '',
      descriptionRules: [
        v => !!v || 'Nom de la proposition est obligatoire',
        v => (v && v.length <= 32) || 'Nom de la proposition doit contenir 32 charactères maximun'
      ]
    }),
    computed: {},
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          if (this.isUpdateProposition()) {
            EsensVote.updateProposition(this.proposition.propositionId, this.description).then(() => {
              this.$emit('isEndFormProposition', false)
            })
          } else {
            EsensVote.createProposal(this.scrutinId, this.description).then(() => {
              this.clear()
              this.$emit('isEndFormProposition', false)
            })
          }
        }
      },

      clear () {
        this.$refs.form.reset()
      },

      close () {
        this.$emit('closeCreateProposition', false)
      },

      isUpdateProposition () {
        return this.proposition !== undefined
      },

      changeValueForm () {
        this.description = StringUtils.trimCharacter(this.proposition.description)
      }
    },
    mounted: function () {
      let self = this
      EsensVote.init().then(() => {
        if (self.isUpdateProposition()) {
          self.changeValueForm()
        }
      })
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

  .v-list .v-input, .v-list .v-input__slot{
    margin: 8px !important;
  }

  form{
    display: flex;
    align-items: center;
    width: 100%;
  }

  .v-counter {
    margin-top: 8px !important;
  }

  .max-width{
    width: 100%;
  }
</style>
<style>
  .v-list .v-input__slot{
    margin-bottom: 8px ;
  }
</style>
