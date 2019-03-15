<template>
  <div>
    <h4 v-if="loading">Loading......</h4>
    <div v-for="order in allOrders" :key="order.id">
      <router-link :to="order.id" exact>
         <h3>Order:{{order.id}}</h3>
      </router-link>
      <p>
        User: {{order.userId}}
        Quantity:{{order.quantity}}
      </p>
    </div>
  </div>
</template>
<script>
import { ALL_ORDERS_QUERY } from '../graphql/allOrders'
export default {
  name: 'order',
  data () {
    return {
      loading: 0,
      allOrders: []
    }
  },
  apollo: {
    allOrders: {
      query: ALL_ORDERS_QUERY
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
