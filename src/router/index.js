import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/Layout.vue";
import Home from "@/views/home/home";
import store from "@/store/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "home",
    children: [
      {
        path: "home",
        name: "首页",
        component: Home,
        meta: {
          keepAlive: true,
          needLogin: false
        }
      },
      {
        path: "playlist",
        name: "推荐歌单",
        component: () => import("@/views/playlist/index"),
        meta: {
          keepAlive: true,
          needLogin: false
        }
      },
      {
        path: "newSongs",
        name: "新歌速递",
        component: () => import("@/views/playlist/newSongs"),
        meta: {
          keepAlive: true,
          needLogin: false
        }
      },
      {
        path: "mvall",
        name: "全部mv",
        component: () => import("@/views/mv/mvall"),
        meta: {
          keepAlive: true,
          needLogin: false
        }
      },
      {
        path: "tolist",
        name: "榜单",
        component: () => import("@/views/playlist/toplist"),
        meta: {
          keepAlive: true,
          needLogin: false
        }
      },
      {
        path: "mylike",
        name: "我喜欢",
        component: () => import("@/views/my/like"),
        meta: {
          keepAlive: false,
          needLogin: true
        }
      },
      {
        path: "mymvlist",
        name: "MV收藏",
        component: () => import("@/views/my/myMvList"),
        meta: {
          keepAlive: false,
          needLogin: true
        }
      },
      {
        path: "myplaylist",
        name: "歌单收藏",
        component: () => import("@/views/my/myPlayList"),
        meta: {
          keepAlive: false,
          needLogin: true
        }
      },
      {
        path: "playlistdetail/:id",
        name: "歌单详情",
        component: () => import("@/views/playlist/detail"),
        meta: {
          keepAlive: false,
          needLogin: false
        }
      },
      {
        path: "search/:search",
        name: "搜索",
        component: () => import("@/views/search/search"),
        meta: {
          keepAlive: false,
          needLogin: false
        }
      },
      {
        path: "singerdetail/:id",
        name: "歌手详情",
        component: () => import("@/views/singer/singerDetail"),
        meta: {
          keepAlive: false,
          needLogin: false
        }
      },
      {
        path: "allsinger",
        name: "全部歌手",
        component: () => import("@/views/singer/allSinger"),
        meta: {
          keepAlive: true,
          needLogin: false
        }
      },
      {
        path: "mysinger",
        name: "歌手收藏",
        component: () => import("@/views/my/mySinger"),
        meta: {
          keepAlive: false,
          needLogin: true
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes
});
//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.needLogin && !from.name && to.name !== "首页")
    next({ name: "首页" });
  else {
    if (to.meta.needLogin) {
      if (!store.state.isLogin) {
        store.commit("setLoginBox", true);
        return;
      }
    }
  }
  next();
});

export default router;
