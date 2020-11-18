import { req } from "@/until/req";
//热搜
export const getHot = () => req("/search/hot");
//搜索建议
export const getSuggest = keywords => req("/search/suggest", { keywords });
/*
必选参数 : keywords : 关键词
可选参数 : limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页
type: 搜索类型；默认为 1 即单曲 ,
取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
接口地址 : /search 或者 /cloudsearch(更全)
调用例子 : /search?keywords= 海阔天空 /cloudsearch?keywords= 海阔天空
 */
export const getSearch = (keywords, type, offset) =>
  req("/search", { keywords, type, offset:offset*30, limit: 30 });
