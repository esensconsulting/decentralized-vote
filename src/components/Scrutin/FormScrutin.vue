<template>
  <div>
    <v-form v-on:submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        :counter="32"
        label="Nom du scrutin"
        required
      ></v-text-field>
      <v-checkbox
        v-model="isVisibleResult"
        label="Cocher pour rendre visible le résultat"
      ></v-checkbox>
      <v-checkbox
        v-model="isOpenToProposal"
        label="Cocher pour permettre au utiliseur de créer des propositions"
      ></v-checkbox>
      <v-btn :disabled="!valid" @click="submit">{{textButtonCreateScrutin}}</v-btn>
      <v-btn @click="clear">Réinitialiser formulaire</v-btn>
    </v-form>
  </div>
</template>

<script>
  import EsensVote from '@/js/esensVote'

  export default {
    name: 'form-scrutin',
    props: ['scrutin'],
    components: {},
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Nom du scrutin est obligatoire',
        v => (v && v.length <= 32) || 'Nom du scrutin doit contenir 32 charactères maximun'
      ],
      isVisibleResult: false,
      isOpenToProposal: false,
      textButtonCreateScrutin: `Créer scrutin`
    }),
    computed: {},
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          if (this.isUpdateScrutin) {
            EsensVote.updateScrutin(this.scrutin.scrutinId, this.name, this.isVisibleResult, this.isOpenToProposal).then(() => {
              this.$emit('isEndFormScrutin', false)
            })
          } else {
            EsensVote.createScrutin(this.name, this.isVisibleResult, this.isOpenToProposal).then(() => {
              this.$emit('isEndFormScrutin', false)
            })
          }
        }
      },

      clear () {
        this.$refs.form.reset()
      },

      trimCharacter: function (strToTrim) {
        let result = strToTrim
        for (let i = strToTrim.length - 1; i >= 0; i--) {
          if (result[i].charCodeAt() === 0 || result[i].charCodeAt() === 32) {
            result = result.substring(0, result.length - 1)
            continue
          }
          break
        }
        return result
      },

      changeValueForm () {
        this.name = this.trimCharacter(this.scrutin.name)
        this.isVisibleResult = this.scrutin.isVisibleResult
        this.isOpenToProposal = this.scrutin.isOpenToProposal
        this.textButtonCreateScrutin = 'Modifier scrutin'
      },

      isUpdateScrutin () {
        return this.scrutin !== undefined
      }
    },
    mounted: function () {
      let self = this
      EsensVote.init().then(() => {
        if (self.isUpdateScrutin()) {
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

  .reduce-title{
    padding: 0;
  }
</style>
