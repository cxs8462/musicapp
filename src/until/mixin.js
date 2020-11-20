import { likeSong } from "@/api/my";
import { scSinger, qxscSinger } from "@/api/singer";

export const fl = {
  data() {
    return {
      areaList: [
        {
          name: "全部"
        },
        {
          name: "内地"
        },
        {
          name: "港台"
        },
        {
          name: "欧美"
        },
        {
          name: "日本"
        },
        {
          name: "韩国"
        }
      ],
      area: "全部",
      orderList: [
        {
          name: "上升最快"
        },
        {
          name: "最热"
        },
        {
          name: "最新"
        }
      ],
      //全部,官方版,原生,现场版,网易出品
      order: "上升最快",
      typeList: [
        {
          name: "全部"
        },
        {
          name: "官方版"
        },
        {
          name: "原生"
        },
        {
          name: "现场版"
        },
        {
          name: "网易出品"
        }
      ],
      type: "全部"
    };
  }
};
// initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传0
// type 取值:
//     -1:全部
// 1:男歌手
// 2:女歌手
// 3:乐队
// area 取值:
//     -1:全部
// 7华语
// 96欧美
// 8:日本
// 16韩国
// 0:其他
// 接口地址 : /artist/list
const code = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
//分类数据
export const singerFl = {
  data() {
    return {
      initial: [{ name: "全部", value: -1 }].concat(
        code.map(r => {
          const obj = { name: r, value: r };
          return obj;
        })
      ),
      type: [
        { name: "全部", value: -1 },
        { name: "男歌手", value: 1 },
        { name: "女歌手", value: 2 },
        { name: "乐队", value: 3 }
      ],
      area: [
        { name: "全部", value: -1 },
        { name: "华语", value: 7 },
        { name: "欧美", value: 96 },
        { name: "日本", value: 8 },
        { name: "韩国", value: 16 },
        { name: "其他", value: 0 }
      ]
    };
  }
};
export const songSet = {
  methods: {
    add(id) {
      if (!this.$store.state.isLogin) {
        this.$message.info("请登入后操作！");
        return;
      }
      likeSong(id, true).then(r => {
        if (r.code === 200) {
          if (r.songs) {
            this.$message.success("收藏成功！");
          } else {
            this.$message.warning("请不要重复添加！");
          }
        }
      });
    },
    onSong(item) {
      this.$store.dispatch("player/getSong", item.id);
    }
  }
};

export const setMv = {
  methods: {
    onMV(id) {
      this.$store.commit("mv/setMvId", id);
    }
  }
};

export const setPlayList = {
  methods: {
    onPlayItem(id) {
      this.$router.push({ path: "/playlistdetail/" + id });
    }
  }
};
export const setAlbum = {
  methods: {
    onAlbum(id) {
      console.log(id);
    }
  }
};
export const setSinger = {
  methods: {
    onSinger(id) {
      this.$router.push({ path: "/singerdetail/" + id });
    },
    scSinger(id) {
      if (!this.$store.state.isLogin) {
        this.$message.info("请登入后操作！");
        return;
      }
      scSinger(id).then(r => {
        if (r.code === 200) {
          this.$message.success("收藏成功！");
        } else {
          this.$message.info("已在收藏中！");
        }
      });
    },
    qxscSinger(id) {
      qxscSinger(id).then(r => {
        if (r.code === 200) {
          this.$message.success("取消收藏成功！");
          this.getData();
        }
      });
    }
  }
};
