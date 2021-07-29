<template>
  <form id="myForm">
    <label for="myName">告訴我你的名字：</label>
    <input v-model="name" id="myName" data-test="name" name="name" />
    <label for="myEmail">你的聯絡方法：</label>
    <input id="myEmail" data-test="mail" name="mail" v-model="mail" />
    <label for="myWish">你想許的願望：</label>
    <input v-model="wish" id="myWish" data-test="wish" name="wish" />
    <label for="luck">選一個幸運小物:</label>
    <select id="luck" v-model="luck" name="cars">
      <option value="玩具車">玩具車</option>
      <option value="戒指">戒指</option>
      <option value="束口袋">束口袋</option>
      <option value="橡皮擦">橡皮擦</option>
    </select>
    <label for="luck">是否想收到我們的更多資訊:</label>
    <input type="radio" id="yes" :value="true" v-model="moreInfo" />
    <label for="yes">是</label>
    <br />
    <input type="radio" id="no" :value="false" v-model="moreInfo" />
    <label for="no">否</label>
    <br />
    <button @submit.prevent="onSubmeit" id="submit" type="submit" value="提交">
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
      luck: "橡皮擦",
      moreInfo: false,
    };
  },
  methods: {
    onSubmeit() {
      axios.post("http://hello.my.test", {
        name: this.name,
        mail: this.mail,
        wish: this.wish,
        luck: this.luck,
        moreInfo: this.moreInfo,
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
