<template>
  <form>
    <label for="userId">userId</label>
    <br>
    <input type="text" name="userId" v-model="userId">
    <br>
    <br>
    <label for="quantity">Quantity</label>
    <br>
    <input type="text" name="quantity" v-model="quantity">
    <br>
    <label for="status">Status</label>
    <br>
    <input type="text" name="status" v-model="status">
    <br>
    <label for="complete">Complete</label>
    <br>
    <input type="text" name="complete" v-model="complete">
    <br>
    <button type="submit" @click="addOrder" >Add</button>
  </form>
</template>
<script>
import { ADD_ORDER } from '../graphql/createOrder'
export default {
  data () {
    return {
      userId: '',
      quantity: '',
      status: '',
      complete: ''
    }
  },
  methods: {
    addOrder () {
      console.log(this.userId, this.quantity, this.status, this.complete)
      const userId = parseInt(this.userId)
      const quantity = parseInt(this.quantity)
      const status = this.status
      const complete = this.complete === 'true'

      this.$apollo.mutate({
        mutation: ADD_ORDER,
        variables: {
          userId,
          quantity,
          status,
          complete
        }
      })
      this.$router.push('/')
    }
  }
}
</script>
