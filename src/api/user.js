import { req } from "@/until/req";

export const getUserInfo = uid => req("/user/detail", { uid });
/*
说明 : 登录后调用此接口 , 传入用户 id, 和操作 t,可关注/取消关注用户
必选参数 :
id : 用户 id
t : 1为关注,其他为取消关注
接口地址 : /follow
 */
export const gzUser = id => req("/follow", { id, t: 1 });
export const qxgzUser = id => req("/follow", { id, t: 0 });
/*
必选参数 : uid : 用户 id
可选参数 :
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
接口地址 : /user/follows
 */
export const getFans = (uid,offset) => req("/user/follows", {uid, offset:offset*30, limit:30 });

