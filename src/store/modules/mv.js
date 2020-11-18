export default {
  namespaced:true,
  state: {
    mvBox: false,
    mvId: 0
  },
  mutations: {
    setMvBox(state, is) {
      state.mvBox = is;
    },
    setMvId(state, id) {
      state.mvId = id;
    }
  },
  actions: {}
};
