import { shallowMount, flushPromises, mount } from "@vue/test-utils";
import Form from "@/components/Form.vue";
import axios from "axios";

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

    const inputSelect = wrapper.find("select");
    inputSelect.setValue("戒指");

    const inputRadio = wrapper.find("input[type=radio][value=true]");
    inputRadio.setValue();

    wrapper.find("button").trigger("submit");
    const url = "http://hello.my.test";
    const expectedData = expect.objectContaining({
      name: "Jim",
      mail: "wowdacom@gmail.com",
      wish: "Have a vacation",
      luck: "戒指",
      moreInfo: true,
    });
    expect(axios.post).toHaveBeenCalledWith(url, expectedData);
  });
});
