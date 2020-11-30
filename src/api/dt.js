import moment from "moment";
import { req } from "@/until/req";

const type = {
  18: "分享单曲",
  19: "分享专辑",
  28: "分享电台节目",
  17: "分享电台节目",
  22: "转发",
  39: "发布视频",
  13: "分享歌单",
  35: "分享歌单",
  24: "分享专栏文章",
  21: "分享视频",
  41: "分享视频"
};
// TODO
const seltype = data => {
  const json = JSON.parse(data.json);
  const obj = {
    tag: type[data.type],
    avatar: data.user["avatarUrl"],
    userId: data.user["userId"],
    player: data.user["nickname"],
    avatarId: data.user["userId"],
    dtid: data.id,
    time: moment(data.showTime).format("YYYY年MM月DD日 hh时mm分"),
    msg: json.msg || "",
    threadId: data.info.threadId
  };
  switch (data.type) {
    case 18:
      obj.name = json.song["name"];
      obj.id = json.song["id"];
      obj.pic = json.song["img80x80"] || json.song.album["picUrl"];
      obj.nickname = json.song.artists[0]["name"];
      break;
    case 19:
      if (!json.album) break;
      obj.name = json.album["name"];
      obj.id = json.album["id"];
      obj.pic = json.album["picUrl"];
      obj.nickname = json.album.artist["name"];
      break;
    case 28:
    case 17:
      if (!json.djRadio) break;
      obj.name = json.djRadio["name"];
      obj.id = json.djRadio["id"];
      obj.pic = json.djRadio["picUrl"];
      obj.nickname = json.djRadio["desc"];
      break;
    case 22:
      // eslint-disable-next-line no-case-declarations
      const s = JSON.parse(json.event.json);
      if (s.song) {
        obj.tag = obj.tag+'单曲'
        obj.name = s.song["name"];
        obj.id = s.song["id"];
        obj.pic = s.song["img80x80"] || s.song.album["picUrl"];
        obj.nickname = s.song.artists[0]["name"];
      } else if (s.playlist) {
        obj.tag = obj.tag+'歌单'
        obj.name = s.playlist["name"];
        obj.id = s.playlist["id"];
        obj.pic = s.playlist["coverImgUrl"];
        obj.nickname = s.playlist.creator["nickname"];
      }
      break;
    case 39:
      break;
    case 13:
    case 35:
      if (json.playlist) {
        obj.name = json.playlist["name"];
        obj.id = json.playlist["id"];
        obj.pic = json.playlist["coverImgUrl"];
        obj.nickname = json.playlist.creator["nickname"];
      }
      break;
    case 24:
      break;
    case 21:
    case 41:
      break;
    default:
      break;
  }
  return obj;
};
export const getAllDt = (lasttime = -1) => {
  return new Promise(resolve => {
    req("/event", { pagesize: 20, lasttime }).then(r => {
      r.event = r.event.map(s => seltype(s)).filter(s => s.tag);
      console.log(r.event);
      resolve(r);
    });
  });
};
/*
说明 : 登录后调用此接口 ,可以删除用户动态
必选参数 : evId : 动态 id
接口地址 : /event/del
 */
export const delDt = evId => req("/event/del", { evId });
/*
说明 : 登录后调用此接口 ,可以转发用户动态
必选参数 : uid : 用户 id
evId : 动态 id
forwards : 转发的评论
接口地址 : /event/forward
 */
export const zfDt = (uid, evId, forwards) =>
  req("/event/forward", { uid, evId, forwards });
/*
说明 : 登录后调用此接口 , 可以获取动态下评论
必选参数 : threadId : 动态 id，可通过 /event，/user/event 接口获取
接口地址 : /comment/event
 */
export const getPlDt = (threadId, offset) =>
  req("/comment/event", { threadId, offset: offset * 20 });

export const plDt = (threadId, content) =>
  req("/comment", { t: 1, type: 6, threadId, content });
