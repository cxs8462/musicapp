export default {
  namespaced: true,
  state: {
    song:{}
  },
  mutations: {
    setSong(state, song) {
      state.song = song;
    }
  },
  actions: {}
};
