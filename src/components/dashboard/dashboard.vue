<template>
  <div id="dashboard">
    <h1>That's the dashboard!</h1>
    <p>You should only get here if you're authenticated!</p>
    <p>Your email address: {{ email }}</p>
    <p>Your User Name : {{ userName }}</p>
  </div>
</template>

<style scoped>
h1, p {
  text-align: center;
}

p {
  color: red;
}
</style>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      userName: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      axios.get('/user')
          .then(res => {
            this.userName = res.data.username
            this.email = res.data.email
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
}
</script>