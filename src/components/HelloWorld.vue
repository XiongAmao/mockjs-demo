<template>
  <div class="hello">
    <h1>Mockjs + json-server</h1>
    <button @click="test"> try</button>
    <p>the data is : {{ apiData }}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      apiData: ""
    };
  },
  methods: {
    test() {
      this.$axios
        .get("/api/data")
        .then(res => {
          this.apiData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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
