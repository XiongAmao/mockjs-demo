<template>
  <div class="hello">
    <h1>Mockjs + json-server</h1>
    <button @click="test"> try</button>
    <p>the data is : {{ apiData }}</p>
    <div>
      <button @click="test2">try two</button>
    </div>
    <div>
      <p> 作者 : {{ article.name }}</p>
      <p> 创建时间 : {{ article.createTime }}</p>
      <p> 文章 : {{ article.article }} </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      apiData: '',
      article: ''
    };
  },
  methods: {
    test() {
      this.$axios
        .get('/test/json')
        .then(res => {
          this.apiData = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    test2() {
      this.$axios
        .get('/api/article')
        .then(res => {
          console.log(res)
          this.article = res.data;
        })
        .catch(err => {
          console.log(err);
        })
    }
  },
  created() {
    this.test2()
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
