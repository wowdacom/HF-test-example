import axios from "axios";

export const actions = {
  fetchListData: ({ commit }, { type }) => {
    return axios.get(type).then((items) => commit("setItems", { items }));
  },
};
