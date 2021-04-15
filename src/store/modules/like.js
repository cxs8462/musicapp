import { likeList } from "@/api/my";

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    setList(state, data) {
      state.list = data;
    }
  },
  actions: {
    getList({ commit }) {
      likeList().then(r => {
        if (r.ids) commit("setList", r.ids);
      });
    }
  }
};
