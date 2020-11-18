import { req } from "@/until/req";
import { Message } from "element-ui";

const check = id => {
  return req(`/check/music`, { id });
};

const getSongDetail = id => {
  return req(`/song/detail`, { ids: id });
};
const getSongUrl = id => {
  return req(`/song/url`, { id });
};
const getSongLyric = id => {
  return req(`/lyric`, { id });
};
export const getSong = async id => {
  const checkSong = await check(id);
  if (checkSong.response) {
    Message.error(checkSong.response.data.message);
    return;
  }
  return new Promise(resolve => {
    Promise.all([getSongDetail(id), getSongUrl(id), getSongLyric(id)]).then(
      r => {
        console.log(r);
        const songObj = {
          ...r[0].songs[0],
          ar: r[0].songs[0].ar.map(s => s.name)
        };
        songObj.url = r[1].data[0].url;
        songObj.picUrl = r[0].songs[0].al.picUrl;
        if (r[2].hasOwnProperty("lrc")) {
          songObj.lry = r[2].nolyric ? "" : r[2].lrc.lyric;
        } else {
          songObj.lry = "";
        }
        resolve(songObj);
      }
    );
  });
};

/*
必选参数 : id: 音乐 id
可选参数 : limit: 取出评论数量 , 默认为 20
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
接口地址 : /comment/music
 */
export const getPl = (id, offset) =>
  req("/comment/music", { limit: 20, offset: offset * 20, id });
