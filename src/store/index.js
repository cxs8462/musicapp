import Vue from "vue";
import Vuex from "vuex";
import mv from "@/store/modules/mv";
import player from "@/store/modules/player";
import user from "@/store/modules/user";
import like from "@/store/modules/like";
import shareChat from "@/store/modules/shareChat";
import { Login, getStatus } from "@/api/login";
import { Message } from "element-ui";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    isFullScreen: false,
    loginBox: false,
    myConfig: {},
    isLogin: false,
    loginBtn: false,
    hideBar: false
  },
  mutations: {
    setLoading(state, is) {
      state.isLoading = is;
    },
    setFullScreen(state, is) {
      state.isFullScreen = is;
    },
    setLoginBox(state, is) {
      state.loginBox = is;
    },
    setMyConfig(state, data) {
      state.myConfig = data;
    },
    setIsLogin(state, is) {
      state.isLogin = is;
    },
    setLoginBtn(stata, is) {
      stata.loginBtn = is;
    },
    setHideBar(state, is) {
      state.hideBar = is;
    }
  },
  actions: {
    login({ commit }, init) {
      const { type, data } = init;
      Login(type, data).then(r => {
        commit("setLoginBtn", false);
        if (r.code === 200) {
          Message.success("登录成功!");
          commit("setLoginBox", false);
          commit("setMyConfig", r.profile);
          commit("setIsLogin", true);
        }
      });
    },
    async getState({ commit }) {
      const r = await getStatus();
      if (r.data.code === 200 && r.data.profile) {
        Message.success("获取登录数据成功!");
        commit("setMyConfig", r.data.profile);
        commit("setIsLogin", true);
      }
    }
  },
  modules: {
    mv,
    player,
    user,
    shareChat,
    like
  }
});
