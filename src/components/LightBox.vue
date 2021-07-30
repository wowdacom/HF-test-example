<template>
  <div
    v-if="isOpen"
    data-test="lightbox-wrapper"
    @click.self="closeBox"
    class="LightBox"
  >
    <div class="lightbox">
      <div
        @click="closeBox"
        data-test="lightbox-close-btn"
        class="lightbox-close-btn"
      >
        X
      </div>
      <div data-test="lightbox-content" class="lightbox-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LightBox",
  props: {
    isOpen: {
      type: Boolean,
    },
  },
  setup(props, context) {
    const closeBox = () => {
      context.emit("closeBox");
    };

    return {
      closeBox,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.LightBox {
  width: 100vw;
  height: 100vh;
  background-color: rgba(black, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .lightbox {
    width: 980px;
    margin: 0 auto;
    background-color: #fff;
    position: relative;
    border-radius: 5px;
    .lightbox-close-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
  }
}
</style>
