<template>
  <div class="bet-box">
    <input type="text"/>
    <input type="number"/>
    <button>Place Bet</button>
  </div>
</template>

<script>
export default {
  name: 'BetBox',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
</style>
