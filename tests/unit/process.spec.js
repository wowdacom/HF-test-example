import { shallowMount, flushPromises, mount } from "@vue/test-utils";
import Process from "@/components/Process.vue";
import axios from "axios";
import { nextTick } from "vue";

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

jest.mock("axios", () => ({
  get: jest.fn(() => [
    { id: 1, title: "title1" },
    { id: 2, title: "title2" },
  ]),
}));
describe("Process.vue", () => {
  let wrapper = null;
  beforeEach(() => {
    //jest.useFakeTimers(); //放哪裡，只跑一次就好
    wrapper = shallowMount(Process);
  });
  it("0%", async () => {
    expect(wrapper.find('[data-test="process"]').attributes().style).toBe(
      "width: 0%;"
    );
  });
  it("1%", async () => {
    jest.runTimersToTime(100);

    await nextTick();

    expect(wrapper.find('[data-test="process"]').attributes().style).toBe(
      "width: 1%;"
    );
  });
  it("10%", async () => {
    jest.runTimersToTime(1000);
    await nextTick();

    expect(wrapper.find('[data-test="process"]').attributes().style).toBe(
      "width: 10%;"
    );
  });
});

describe("Process.vue", () => {
  it("假定時器結束 clearInterval", async () => {
    jest.spyOn(window, "clearInterval");

    setInterval.mockReturnValue(123);

    const wrapper = shallowMount(Process);
    wrapper.vm.counting();
    wrapper.vm.countingFinish();
    expect(window.clearInterval).toHaveBeenCalledWith(123);
  });

  it("驗證 loading 在 mounted 之前執行", async () => {
    shallowMount(Process);

    // await wrapper.get("button").trigger("click");

    // Let's assert that we've called axios.get the right amount of times and
    // with the right parameters.
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
  });
});
