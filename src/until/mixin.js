export default {
  data() {
    return {
      areaList: [
        {
          name: "全部"
        },
        {
          name: "内地"
        },
        {
          name: "港台"
        },
        {
          name: "欧美"
        },
        {
          name: "日本"
        },
        {
          name: "韩国"
        }
      ],
      area: "全部",
      orderList: [
        {
          name: "上升最快"
        },
        {
          name: "最热"
        },
        {
          name: "最新"
        }
      ],
      //全部,官方版,原生,现场版,网易出品
      order: "上升最快",
      typeList: [
        {
          name: "全部"
        },
        {
          name: "官方版"
        },
        {
          name: "原生"
        },
        {
          name: "现场版"
        },
        {
          name: "网易出品"
        }
      ],
      type: "全部"
    };
  }
};
