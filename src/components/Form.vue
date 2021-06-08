<template>
  <form id="myForm">
    <label for="myName">告訴我你的名字：</label>
    <input v-model="name" id="myName" data-test="name" name="name" />
    <label for="myEmail">你的聯絡方法：</label>
    <input id="myEmail" data-test="mail" name="mail" v-model="mail" />
    <label for="myWish">你想許的願望：</label>
    <input v-model="wish" id="myWish" data-test="wish" name="wish" />
    <button @submit="onSubmeit" id="submit" type="submit" value="提交">
      提交
    </button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: null,
      mail: null,
      wish: null,
    };
  },
  methods: {
    onSubmeit() {
      axios.post("http://hello.my.test", {
        name: this.name,
        mail: this.mail,
        wish: this.wish,
      });
    },
  },
};
</script>

<style lang="scss">
#myForm {
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  max-width: 960px;
  label {
    text-align: left;
    margin-bottom: 5px;
  }
  input {
    margin-bottom: 20px;
  }
  #submit {
    margin-top: 15px;
    width: 100px;
  }
}
</style>
