import { getters } from "../../src/store/demo/getters";
import { mutations } from "../../src/store/demo/mutations";
import { actions } from "../../src/store/demo/actions";
import { mount, flushPromises } from "@vue/test-utils";
import { createStore } from "vuex";
import axios from "axios";
import { createRouter, createWebHistory } from "vue-router";
import Home from "../../src/views/Home.vue";
import App from "../../src/App.vue";

const createVuexStore = (initialState) =>
  createStore({
    state: {
      count: 0,
      ...initialState,
    },
    mutations: {
      increment(state, value) {
        state.count += value;
      },
    },
    getters: {
      displayLists: (state) => state.lists.length,
    },
    actions: {
      fetchListsData: jest.fn(() => Promise.resolve()),
    },
  });

jest.mock("axios");

describe("mutation", () => {
  it("測試單一個mutation", () => {
    const items = [{ id: 1 }, { id: 2 }];
    const state = {
      items: [],
    };
    mutations.setItems(state, { items });
    expect(state.items).toBe(items);
  });
});

describe("getter", () => {
  it("測試單一個getter", () => {
    const state = {
      products: [{ stock: 2 }, { stock: 0 }, { stock: 3 }],
    };
    const result = getters.inStockProducts(state);
    expect(result).toHaveLength(2);
  });
});

//不會真的去儲存資料，但確定 API 有被打到
describe("actions", () => {
  it("測試單一個 commit 是否在一個 action 中被調用", async () => {
    const items = [{}, {}];
    const type = "top";

    axios.get.mockImplementationOnce((calledWidth) => {
      return calledWidth === type ? Promise.resolve(items) : Promise.resolve();
    });

    const context = {
      commit: jest.fn(),
    };
    actions.fetchListData(context, { type });
    await flushPromises();
    expect(context.commit).toHaveBeenCalledWith("setItems", { items });
  });
});

describe("factory function", () => {
  it("測試單一個工廠函數的調用", async () => {
    const items = [{}, {}];
    const type = "top";

    axios.get.mockImplementationOnce((calledWidth) => {
      return calledWidth === type ? Promise.resolve(items) : Promise.resolve();
    });

    const context = {
      commit: jest.fn(),
    };
    actions.fetchListData(context, { type });
    await flushPromises();
    expect(context.commit).toHaveBeenCalledWith("setItems", { items });
  });
});

test("increment mutation without passing a value", () => {
  const store = createVuexStore({ lists: ["apple", "banana", "watermelon"] });
  expect(store.getters.displayLists).toBe(3);
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../../src/views/About.vue"),
    },
  ],
});

// test("routing", async () => {
//   router.push("/");
//   await router.isReady();

//   const wrapper = mount(App, {
//     global: {
//       plugins: [router],
//     },
//   });
//   expect(wrapper.html()).toContain("打點我開燈箱");

//   // 1. 介面有 UI
//   await wrapper.find('[data-test="about-button"]').trigger("click");

//   // 2. 其他方式觸動
//   // router.push("/about");

//   await flushPromises();
//   expect(wrapper.html()).toContain("我是燈箱的內容");
// });
