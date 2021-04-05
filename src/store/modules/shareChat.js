export default {
  namespaced: true,
  state: {
    song: {},
    dragShow: false
  },
  mutations: {
    setSong(state, song) {
      state.song = song;
    },
    setDragShow(state, is) {
      state.dragShow = is;
    }
  },
  actions: {}
};
