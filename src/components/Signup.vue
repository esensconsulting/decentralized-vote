<template>
  <v-container class="dashboard" fluid>
    <v-layout row>
      <v-flex md4 offset-md4>
        <v-layout row>
          <v-text-field prepend-icon="person" name="pseudo" label="Pseudo" type="text"
                        v-model="form.pseudo" />
        </v-layout>
        <v-layout row>
          <v-btn block @click="signup" name="signup" dark color="red">Sign up</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Users from '@/js/users'

  export default {
    name: 'signup',
    data () {
      return {
        form: {
          pseudo: undefined
        }
      }
    },
    beforeCreate: function () {
      Users.init()
    },
    methods: {
      signup: function () {
        let self = this
        if (typeof this.form.pseudo !== 'undefined' && this.form.pseudo !== '') {
          Users.create(this.form.pseudo).then(tx => {
            console.log(tx)
            self.$router.push('/')
          }).catch(err => {
            console.log(err)
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
