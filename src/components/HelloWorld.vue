<template>
  <div class="hello">
    <button @click="handleLightUp">打點我開燈箱</button>
    <teleport to="body">
      <LightBox :is-open="isOpen" @closeBox="handleClose">
        {{ msg }}
      </LightBox>
    </teleport>
    <div>
      <Process></Process>
    </div>
    <!-- <Form></Form> -->
  </div>
</template>

<script>
import LightBox from "./LightBox.vue";
import Process from "@/components/Process.vue";

export default {
  name: "HelloWorld",
  data() {
    return {
      isOpen: false,
      msg: "",
    };
  },
  components: {
    LightBox,
    Process,
  },
  methods: {
    handleLightUp() {
      this.isOpen = true;
    },
    handleClose() {
      this.isOpen = false;
    },
  },
};
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
