<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Welcome: {{ name }}</div>
    <div class="dashboard-text"> After you download result, Please view Detail  <a target="_blank" style="color:red; font-size: 50px" href="http://161.35.227.64/JPlag/">here</a> </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      date: new Date()
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
