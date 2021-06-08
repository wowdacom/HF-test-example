<template>
  <div class="Process progress-wrap loading">
    <div class="progress-bar">
      <div
        data-test="process"
        class="progress-inner"
        :style="{ width: process + '%' }"
      ></div>
    </div>
    <!-- <button @click="getPosts">Get posts</button> -->
  </div>
</template>

<script>
import axios from "axios";
import { ref, onBeforeMount } from "vue";

export default {
  name: "Process",
  props: {},
  setup() {
    const process = ref(0);
    const counterID = ref("");
    const posts = ref("");

    const counting = () => {
      counterID.value = setInterval(() => {
        if (process.value + 1 > 100) {
          countingFinish();
          return;
        }
        process.value = process.value + 1;
      }, 100);
    };

    const countingFinish = () => {
      clearInterval(counterID.value);
    };

    const getPosts = async () => {
      try {
        posts.value = await axios.get(
          "https://jsonplaceholder.typicode.com/todos/1"
        );
      } catch (error) {}
    };

    onBeforeMount(() => {
      counting();
      getPosts();
    });

    return {
      counting,
      countingFinish,
      process,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
/* progressbar */
.progress-wrap {
  display: none;
  vertical-align: middle;
  height: 15px;
  width: 60px;
}

.progress-wrap.loading {
  display: inline-block;
}

.progress-wrap .progress-bar {
  position: relative;
  background-color: transparent;
  padding: 0;
  width: 400px;
  margin-right: 0;
  height: 30px;
  display: inline-block;
}

.progress-wrap .progress-inner {
  display: block;
  height: 100%;
  border-radius: 20px;
  background-color: #f0a3a3;
  background-image: -moz-linear-gradient(top, #f0a3a3, #ff0197);
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, #f0a3a3),
    color-stop(1, #ff0197)
  );
  background-image: -webkit-linear-gradient(#f0a3a3, #ff0197);
  -webkit-box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
    inset 0 -2px 6px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
    inset 0 -2px 6px rgba(0, 0, 0, 0.4);
  box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3),
    inset 0 -2px 6px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
}

.progress-wrap .progress-inner:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: -webkit-gradient(
    linear,
    0 0,
    100% 100%,
    color-stop(0.25, rgba(255, 255, 255, 0.2)),
    color-stop(0.25, transparent),
    color-stop(0.5, transparent),
    color-stop(0.5, rgba(255, 255, 255, 0.2)),
    color-stop(0.75, rgba(255, 255, 255, 0.2)),
    color-stop(0.75, transparent),
    to(transparent)
  );
  background-image: -moz-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  z-index: 1;
  -webkit-background-size: 50px 50px;
  -moz-background-size: 50px 50px;
  -webkit-animation: moveProgress 2s linear infinite;
  -webkit-border-top-right-radius: 8px;
  -webkit-border-bottom-right-radius: 8px;
  -moz-border-radius-top-right: 8px;
  -moz-border-radius-bottom-right: 8px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  -webkit-border-top-left-radius: 20px;
  -webkit-border-bottom-left-radius: 20px;
  -moz-border-radius-top-left: 20px;
  -moz-border-radius-bottom-left: 20px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  overflow: hidden;
}

@keyframes moveProgress {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: 50px 50px;
  }
}
</style>
