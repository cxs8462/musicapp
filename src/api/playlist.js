import { req } from "@/until/req";
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
