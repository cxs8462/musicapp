import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/Layout.vue";
import Home from "@/views/home/home";
import store from "@/store/index";
Vue.use(VueRouter);

export const routes = [
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
          needLogin: false,
          icon: "el-icon-house"
        }
      },
      {
        path: "playlist",
        name: "推荐歌单",
        component: () => import("@/views/playlist/index"),
        meta: {
          keepAlive: true,
          needLogin: false,
          icon: "el-icon-notebook-2"
        }
      },
      {
        path: "newSongs",
        name: "新歌速递",
        component: () => import("@/views/playlist/newSongs"),
        meta: {
          keepAlive: true,
          needLogin: false,
          icon: "el-icon-sort-up"
        }
      },
      {
        path: "mvall",
        name: "全部mv",
        component: () => import("@/views/mv/mvall"),
        meta: {
          keepAlive: true,
          needLogin: false,
          icon: "el-icon-video-camera"
        }
      },
      {
        path: "tolist",
        name: "榜单",
        component: () => import("@/views/playlist/toplist"),
        meta: {
          keepAlive: true,
          needLogin: false,
          icon: "el-icon-upload2"
        }
      },
      {
        path: "mylike",
        name: "我喜欢",
        component: () => import("@/views/my/like"),
        meta: {
          keepAlive: false,
          needLogin: true,
          isUser: true,
          icon: "el-icon-apple",
          color: "linear-gradient(to bottom, #091E3A, #2F80ED, #2D9EE0)"
        }
      },
      {
        path: "mymvlist",
        name: "MV收藏",
        component: () => import("@/views/my/myMvList"),
        meta: {
          keepAlive: false,
          needLogin: true,
          isUser: true,
          icon: "el-icon-files",
          color: "linear-gradient(to bottom, #9400D3, #4B0082)"
        }
      },
      {
        path: "myplaylist",
        name: "歌单收藏",
        component: () => import("@/views/my/myPlayList"),
        meta: {
          keepAlive: false,
          needLogin: true,
          isUser: true,
          icon: "el-icon-s-management",
          color: "linear-gradient(to bottom, #c84e89, #F15F79)"
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
          needLogin: false,
          icon: "el-icon-user"
        }
      },
      {
        path: "mysinger",
        name: "歌手收藏",
        component: () => import("@/views/my/mySinger"),
        meta: {
          keepAlive: false,
          needLogin: true,
          isUser: true,
          icon: "el-icon-user-solid",
          color: "linear-gradient(to bottom, #00F5A0, #00D9F5)"
        }
      },
      {
        path: "userSpace",
        name: "动态",
        component: () => import("@/views/user/userSpace"),
        meta: {
          keepAlive: false,
          needLogin: true,
          isUser: true,
          icon: "el-icon-wind-power",
          color: "linear-gradient(to bottom, #72C6EF, #004E8F)"
        }
      },
      {
        path: "fanslist",
        name: "关注列表",
        component: () => import("@/views/user/fansList"),
        meta: {
          keepAlive: false,
          needLogin: true,
          isUser: true,
          icon: "el-icon-view",
          color: "linear-gradient(to bottom, #bf5ae0, #a811da)"
        }
      },
      {
        path: "createplaylist",
        name: "我创建的歌单",
        component: () => import("@/views/playlist/createPlayList"),
        meta: {
          keepAlive: false,
          needLogin: true,
          isUser: true,
          icon: "el-icon-s-management",
          color: "linear-gradient(to bottom, #acb6e5, #86fde8)"
        }
      },
      {
        path: "djindex",
        name: "电台首页",
        component: () => import("@/views/dj/index"),
        meta: {
          keepAlive: true,
          needLogin: false,
          icon: "el-icon-house"
        }
      },
      {
        path: "djdetail/:id",
        name: "电台详情",
        component: () => import("@/views/dj/detail"),
        meta: {
          keepAlive: false,
          needLogin: false
        }
      },
      {
        path: "mydjlist/:id",
        name: "我的订阅",
        component: () => import("@/views/dj/myDjList"),
        meta: {
          keepAlive: false,
          needLogin: true,
          isUser: true,
          icon: "el-icon-finished",
          color: "linear-gradient(to bottom, #9796f0, #fbc7d4)"
        }
      },
      {
        path: "hotdj",
        name: "全部热门电台",
        component: () => import("@/views/dj/hotDj"),
        meta: {
          keepAlive: true,
          needLogin: false,
          icon: "el-icon-upload2"
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
