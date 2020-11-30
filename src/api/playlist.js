import axios, { req } from "@/until/req";
//index
export const cat = () => req("/playlist/hot");
export const playList = (offset, cat) =>
  req("/top/playlist", { limit: 50, offset: offset * 50, cat });
export const topPlayList = cat =>
  req("/top/playlist/highquality", { cat, limit: 1 });
//newSongs
export const getNewSongs = type => req("/top/song", { type });
//detail
export const getSongDetail = id => req("/playlist/detail", { id });
/*
歌单评论
必选参数 : id: 歌单 id
可选参数 : limit: 取出评论数量 , 默认为 20
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
接口地址 : /comment/playlist
 */
export const plPlayList = (id, offset) =>
  req("/comment/playlist", { id, offset: offset * 20, limit: 20 });
//toplist
export const getTopList = () => req("/toplist");

export const getMyplayList = uid => req("/user/playlist", { limit: 300, uid });
//新建歌单
export const createPlayList = name => req("/playlist/create", { name });
//删除
export const delPlayList = id => req("/playlist/delete", { id });
//更新歌单
export const updataPlayList = (id, name, desc, tags) =>
  req("/playlist/update", { id, name, desc, tags });
//头像上传
export const upAva = (id, size, data) =>
  axios({
    method: "post",
    url: `/playlist/cover/update?id=${id}&imgSize=${size}&timestamp=${new Date().getTime()}`,
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
//tag
export const getTags = () => req("/playlist/catlist");
//获取用户歌单
export const getSelectPlayList = uid =>
  req("/user/playlist", { limit: 500, uid, offset: 0 });
//添加歌曲到指定歌单
/*
必选参数 :
op: 从歌单增加单曲为 add, 删除为 del
pid: 歌单 id tracks: 歌曲 id,可多个,用逗号隔开
接口地址 : /playlist/tracks
 */
export const addSongTo = (pid, tracks) =>
  req("/playlist/tracks", { op: "add", tracks, pid });
export const delSongTo = (pid, tracks) =>
  req("/playlist/tracks", { op: "del", tracks, pid });
