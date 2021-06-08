import { shallowMount, flushPromises, mount } from "@vue/test-utils";
import Form from "@/components/Form.vue";
import axios from "axios";
import { nextTick } from "vue";

jest.mock("axios");

describe("Form.vue", () => {
  it("檢查 Submit 發出去的資料", async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ code: 200, data: "OK" })
    );
    const wrapper = shallowMount(Form);
    const inputName = wrapper.find('input[data-test="name"]');
    inputName.setValue("Jim");
    const inputMail = wrapper.find('input[data-test="mail"]');
    inputMail.setValue("wowdacom@gmail.com");
    const inputWish = wrapper.find('input[data-test="wish"]');
    inputWish.setValue("Have a vacation");
    wrapper.find("button").trigger("submit");
    const url = "http://hello.my.test";
    const expectedData = expect.objectContaining({
      name: "Jim",
      mail: "wowdacom@gmail.com",
      wish: "Have a vacation",
    });
    expect(axios.post).toHaveBeenCalledWith(url, expectedData);
  });
});
