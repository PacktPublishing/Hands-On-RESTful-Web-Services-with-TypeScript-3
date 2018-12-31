<template>
<div>
<h3>UserID: {{listByOrderId.userId}}</h3>
<p>Quantity: {{listByOrderId.quantity}}</p>
<p>Status: {{listByOrderId.status}}</p>
<p>Complete: {{listByOrderId.complete}}</p>
</div>
</template>
<script>
import {ORDER_BY_ID} from '../graphql/listByOrderId'
export default {
  data () {
    return {
      listByOrderId: {},
      loading: 0
    }
  },
  props: ['id'],
  apollo: {
    listByOrderId: {
      query: ORDER_BY_ID,
      variables () {
        return {
          id: this.id
        }
      }
    }
  }
}
</script>
