import { req } from "@/until/req";

/*@params
area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
limit: 取出数量 , 默认为 30
offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 */
export const mvAll = (area, order, offset, type) =>
  req("/mv/all", { area, order, offset: offset * 48, type, limit: 48 });

//mv详情
export const mvDetail = mvid => req("/mv/detail", { mvid });
export const mvPl = mvid => req("/mv/detail/info", { mvid });
export const mvDz = id => req("/mv/url", { id });

export const mv = id => Promise.all([mvDetail(id), mvPl(id), mvDz(id)]);

/*
mv评论
必选参数 : id: mv id
可选参数 : limit: 取出评论数量 , 默认为 20
offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
接口地址  /comment/mv
 */
export const plMv = (id, offset) =>
  req("/comment/mv", { id, offset: offset * 20, limit: 20 });
