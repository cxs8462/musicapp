import { req } from "@/until/req";

const getSingerDetail = id => req(`/artist/desc`, { id });

const getSingerMv = id => req(`/artist/mv`, { id });

const getSingerTopSongs = id => req(`/artist/top/song`, { id });

const getSingerAlbums = id => req(`/artist/album`, { id, limit: 500 });

export const getSinger = id =>
  new Promise(resolve => {
    Promise.all([
      getSingerDetail(id),
      getSingerMv(id),
      getSingerTopSongs(id),
      getSingerAlbums(id)
    ]).then(res => {
      const obj = {};
      obj.detail = res[0];
      obj.mv = res[1];
      obj.topSong = res[2];
      obj.album = res[3];
      resolve(obj);
    });
  });

export const getSingerHead = id => req("/artists", { id });

/*
limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页
initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传0
type 取值:
-1:全部
1:男歌手
2:女歌手
3:乐队
area 取值:
-1:全部
7华语
96欧美
8:日本
16韩国
0:其他
接口地址 : /artist/list
 */
export const singerFl = (offset, initial, type, area) =>
  req("/artist/list", { offset: offset * 30,limit:30,initial,type,area });
/*
id : 歌手 id
t:操作,1 为收藏,其他为取消收藏
接口地址 : /artist/sub
 */
//收藏
export const scSinger = id=>req('/artist/sub',{id,t:1})
//取消收藏
export const qxscSinger = id=>req('/artist/sub',{id,t:0})
