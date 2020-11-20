import { req } from "@/until/req";
//我喜欢
export const likeList = uid => req("/likelist", { uid });
export const getSongs = ids => req("/song/detail", { ids: ids.join(",") });
//获取收藏mv
export const getMyMvList = () => req("/mv/sublist");
//获取收藏歌单
export const getMyplayList = (uid, offset) =>
  req("/user/playlist", { limit: 30, uid, offset: offset * 30 });
/*
收藏歌单
@params
t : 类型,1:收藏,2:取消收藏 id : 歌单 id
 */
export const scPlayList = (t, id) => req("/playlist/subscribe", { t, id });
/*
喜欢歌曲
@params
id: 歌曲 id
like: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢
 */
export const likeSong = (id, like) => req("/like", { id, like });
/*
@params
mvid : MV id
t : 1 为收藏,其他为取消收藏
接口地址 : /mv/sub
 */
export const likeMv = (mvid, t) => req("/mv/sub", { mvid, t });
/*
评论
发送评论
t:1 发送, 2 回复
@params
tpye: 数字,资源类型,对应歌曲,mv,专辑,歌单,电台,视频对应以下类型
0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
id:对应资源 id
content :要发送的内容
commentId :回复的评论id (回复评论时必填)
注意：如给动态发送评论，则不需要传 id，需要传动态的 threadId,如：/comment?t=1&type=6&threadId=A_EV_2_6559519868_32953014&content=test
 */
export const fsPl = (type, id, content) =>
  req("/comment", { type, id, content, t: 1 });

//歌手收藏
export const mySinger = () => req("/artist/sublist");
