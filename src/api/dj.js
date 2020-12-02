import { req } from "@/until/req";
//轮播图
export const banner = () => req("/dj/banner");
//分类
export const catelist = () => req("/dj/catelist");
//分类2 /dj/category/recommend
export const catelist2 = () => req("/dj/category/recommend");
//分类推荐
export const recommendType = type => req("/dj/recommend/type", { type });
//个性推荐
export const recommendPersonality = () => req("/dj/personalize/recommend");
//详情
export const detail = rid => req("/dj/detail", { rid });
//节目
export const program = (rid, offset) =>
  req("/dj/program", { rid, limit: 30, offset: offset * 30 });
//节目详情
export const programDetail = id => req("/dj/program/detail", { id });
//节目评论
export const programPl = (id, offset) =>
  req("/comment/dj", { id, offset: offset * 20, limit: 20 });
//订阅dj
export const dyDj = rid => req("/dj/sub", { rid, t: 1 });
export const qxDj = rid => req("/dj/sub", { rid, t: 0 });
//订阅列表
export const dylist = () => req("/dj/sublist");
//评论
export const pl = (id, content) =>
  req("/comment", { id, content, t: 1, type: 4 });
//全部分类
export const hotDj = (cateId, offset) =>
  req("/dj/radio/hot", { cateId, limit: 30, offset: offset * 30 });
