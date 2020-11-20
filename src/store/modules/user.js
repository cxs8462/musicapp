export default {
  namespaced: true,
  state: {
    userId: 0
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id;
    }
  }
};
