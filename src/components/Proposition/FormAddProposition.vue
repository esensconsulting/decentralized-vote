<template class="max-width">
    <v-form v-on:submit.prevent="submit" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
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

  export default {
    name: 'form-add-proposition',
    props: ['scrutinId'],
    components: {},
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Nom de la proposition est obligatoire',
        v => (v && v.length <= 32) || 'Nom de la proposition doit contenir 32 charactères maximun'
      ]
    }),
    computed: {},
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          EsensVote.createProposal(this.scrutinId, this.name).then(() => {
            this.clear()
            this.$emit('isCreatedProposition', false)
          })
        }
      },

      clear () {
        this.$refs.form.reset()
      },

      close () {
        this.$emit('closeCreateProposition', false)
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

  form{
    display: flex;
    align-items: center;
    width: 100%;
  }

  .max-width{
    width: 100%;
  }
</style>
