import { shallowMount } from "@vue/test-utils";
import LightBox from "@/components/LightBox.vue";
import { nextTick } from "vue";

// 引用的元件可以傳入 true / false 控制開關
// 可以用 slot 放元件進去
// 點擊 close btn 可以關掉燈箱
// 點擊 lightbox 內不會關掉燈箱
// 點擊 lightbox 外會關掉燈箱

//1. 2. 可以一起測試
describe("LightBox.vue", () => {
  it("引用的元件可以傳入 true / false 控制開關", async () => {
    const isOpen = true;
    const wrapper = shallowMount(LightBox, {
      props: { isOpen },
    });

    await nextTick();

    expect(wrapper.find('[data-test="lightbox-close-btn"]').exists()).toBe(
      true
    );
  });
});

describe("LightBox.vue", () => {
  it("可以用 slot 放元件進去", async () => {
    const isOpen = true;
    const wrapper = shallowMount(LightBox, {
      props: { isOpen },
      slots: {
        default: "我是燈箱的內容",
      },
    });

    await nextTick();

    expect(wrapper.html()).toContain("我是燈箱的內容");
  });
});

describe("LightBox.vue", () => {
  it("點擊 close btn 可以關掉燈箱", async () => {
    const isOpen = true;
    const wrapper = shallowMount(LightBox, {
      props: { isOpen },
      slots: {
        default: "我是燈箱的內容",
      },
    });

    const buttonClose = wrapper.find('[data-test="lightbox-close-btn"]');
    await buttonClose.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("closeBox");
  });
});

describe("LightBox.vue", () => {
  it("點擊 lightbox 內不會關掉燈箱", async () => {
    const isOpen = true;
    const wrapper = shallowMount(LightBox, {
      props: { isOpen },
      slots: {
        default: "我是燈箱的內容",
      },
    });

    const lightboxContent = wrapper.find('[data-test="lightbox-content"]');
    await lightboxContent.trigger("click");
    expect(wrapper.emitted().closeBox).toEqual(undefined);
  });
});

describe("LightBox.vue", () => {
  it("點擊 lightbox 外會關掉燈箱", async () => {
    const isOpen = true;
    const wrapper = shallowMount(LightBox, {
      props: { isOpen },
      slots: {
        default: "我是燈箱的內容",
      },
    });

    const lightboxWrapper = wrapper.find('[data-test="lightbox-wrapper"]');
    await lightboxWrapper.trigger("click");

    expect(wrapper.emitted().closeBox.length).toEqual(1);
    // expect(wrapper.emitted()).toHaveProperty("closeBox");
  });
});
