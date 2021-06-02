import { shallowMount } from "@vue/test-utils";
import Process from "@/components/Process.vue";
import { nextTick } from "vue";

beforeEach(() => {
  jest.useFakeTimers();
});

describe("Process.vue", () => {
  it("假定時器前進", async () => {
    const wrapper = shallowMount(Process);
    expect(wrapper.find('[data-test="process"]').attributes().style).toBe(
      "width: 0%;"
    );
    wrapper.vm.counting();
    jest.runTimersToTime(100);
    await nextTick();
    expect(wrapper.find('[data-test="process"]').attributes().style).toBe(
      "width: 1%;"
    );
    jest.runTimersToTime(900);
    await nextTick();
    expect(wrapper.find('[data-test="process"]').attributes().style).toBe(
      "width: 10%;"
    );
  });

  it("假定時器結束 clearInterval", async () => {
    jest.spyOn(window, "clearInterval");
    setInterval.mockReturnValue(123);
    const wrapper = shallowMount(Process);
    wrapper.vm.counting();
    wrapper.vm.countingFinish();
    expect(window.clearInterval).toHaveBeenCalledWith(123);
  });
});
