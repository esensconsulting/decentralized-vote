<template>
  <div>
    <template>
      <v-form ref="form" v-model="valid" lazy-validation>
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
        <v-btn :disabled="!valid" @click="submit">Créer scrutin</v-btn>
        <v-btn @click="clear">Réinitialiser formulaire</v-btn>
      </v-form>
    </template>
  </div>
</template>

<script>
  import EsensVote from '@/js/esensVote'

  export default {
    name: 'form-add-scrutin',
    props: [],
    components: {},
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Nom du scrutin est obligatoire',
        v => (v && v.length <= 32) || 'Nom du scrutin doit contenir 32 charactères maximun'
      ],
      isVisibleResult: false,
      isOpenToProposal: false
    }),
    computed: {},
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          EsensVote.createScrutin(this.name, this.isVisibleResult !== undefined, this.isOpenToProposal !== undefined).then(() => {
            this.$emit('changeIsCreatedScrutin', false)
          })
        }
      },

      clear () {
        this.$refs.form.reset()
      },

      changeIsCreatedScrutin () {
        this.$emit('changeIsCreatedScrutin', false)
      }
    },
    mounted: function () {}
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
