const message = [
  {
    title: "更新提示",
    message: `1、增加音乐下载功能。2、增加聊天室功能。3、增加歌单编辑功能。`
  }
];
export default that => {
  message.forEach(r => {
    that.$notify.info({
      title: r.title,
      message: r.message,
      position: "top-left"
    });
  });
};
