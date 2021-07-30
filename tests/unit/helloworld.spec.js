import { mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import LightBox from "@/components/LightBox.vue";

//snapshot 測試
test("teleport", async () => {
  const wrapper = mount(HelloWorld, {
    data() {
      return {
        isOpen: true,
        msg: "哈哈哈",
      };
    },
  });

  const lightbox = wrapper.getComponent(LightBox); // got it!
  expect(lightbox.html()).toContain("哈哈哈");
});
