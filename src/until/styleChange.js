export const SYTLE = {
  white: {
    "--sider-color": "#EBEEF5",
    "--header-color": "#909399",
    "--content-color": "#FFFFFF",
    "--footer-color": "#EBEEF5",
    "--selectSide-color": "#d3d5e0"
  },
  blue: {
    "--sider-color": "rgb(198,226,255)",
    "--header-color": "#2c80c5",
    "--content-color": "rgb(236,245,255)",
    "--footer-color": "rgb(198,226,255)",
    "--selectSide-color": "rgb(181,210,238)"
  },
  red: {
    "--sider-color": "rgb(253,226,226)",
    "--header-color": "#e74c3c",
    "--content-color": "rgb(254,240,240)",
    "--footer-color": "rgb(253,226,226)",
    "--selectSide-color": "#f5848477"
  },
  orange: {
    "--sider-color": "rgb(250,236,216)",
    "--header-color": "#E6A23C",
    "--content-color": "rgb(253,246,236)",
    "--footer-color": "rgb(250,236,216)",
    "--selectSide-color": "rgb(248,243,233)"
  },
  violet: {
    "--sider-color": "#aba6df",
    "--header-color": "#3f369c",
    "--content-color": "#e4e2f4",
    "--footer-color": "#aba6df",
    "--selectSide-color": "#928cd6"
  }
};

export const changeColor = (name, color) => {
  document.getElementById("layout").style.setProperty(name, color);
};

const styleChange = name => {
  const style = SYTLE[name];
  for (let key in style) {
    changeColor(key, style[key]);
  }
};

export default styleChange;
