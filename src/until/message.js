const message = [
  {
    title: "更新提示",
    message: `增加音乐下载功能`
  },
  {
    title: "更新提示",
    message: `增加评论功能`
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
