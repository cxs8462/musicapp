import { getSong } from "@/api/player";
import { Message } from "element-ui";
export default {
  namespaced: true,
  state: {
    isShow: false,
    player: null,
    currentTime: 0,
    duration: 0,
    list: [],
    selectItem: {},
    index: 0,
    paused: true,
    listShow: false
  },
  mutations: {
    setIsShow(state, is) {
      state.isShow = is;
    },
    setListShow(state, is) {
      state.listShow = is;
    },
    setPlayer(state, player) {
      player.autobufer = true;
      player.autoplay = true;
      player.addEventListener("timeupdate", () => {
        state.currentTime =player.currentTime*1;
        state.duration = player.duration*1;
        state.paused = player.paused;
      });
      state.player = player;
    },
    setSelectItem(state, config) {
      state.selectItem = config;
    },
    setList(state, item) {
      if (!state.list.length) state.list.push(item);
      if (!state.list.some(r => r.id === item.id)) state.list.push(item);
    },
    delList(state, index) {
      state.list.splice(index, 1);
    },
    next(state) {
      const length = state.list.length;
      if (length === 0) {
        return;
      } else if (length === 1) {
        Message.info("无其他音乐！");
        return;
      } else if (length >= 2) {
        for (let i = 0; i < length; i++) {
          if (state.list[i].id === state.selectItem.id) {
            if (i + 1 === length) {
              Message.info("已经是最后一首了！");
              return;
            } else {
              state.selectItem = state.list[i + 1];
              return;
            }
          }
        }
      }
    },
    ago(state) {
      const length = state.list.length;
      if (length === 0) {
        return;
      } else if (length === 1) {
        Message.info("无其他音乐！");
        return;
      } else if (length >= 2) {
        state.list.forEach((r, i) => {
          if (r.id === state.selectItem.id) {
            if (i === 0) {
              Message.info("已经是第一首了！");
            } else {
              state.selectItem = state.list[i - 1];
            }
          }
        });
      }
    }
  },
  actions: {
    getSong({ commit }, id) {
      getSong(id).then(res => {
        console.log(res);
        commit("setList", res);
        commit("setSelectItem", res);
      });
    }
  }
};
