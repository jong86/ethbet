<template>
  <div class="bet-box">
    <input
      type="text"
      v-model="betAddress"
    />
    <input
      type="number"
      v-model="betAmount"
    />
    <button
      @click="placeBet"
    >Place Bet</button>
  </div>
</template>

<script>
import web3 from '../util/web3.js'

export default {
  name: 'BetBox',
  data: () => ({
    betAddress: '',
    betAmount: 0,
  }),
  props: {
    msg: String
  },
  methods: {
    placeBet() {
      const { betAmount, betAddress } = this.$data
      
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
