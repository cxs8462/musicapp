import time from "moment";

export const getCreateTime = t => time(t).format("YYYY年MM月DD日");

export const musicTiem = t => {
  let m =Math.floor(t / 60);
  m = (m + "").length === 1 ? "0" + m : m;
  let s = Math.floor(t % 60);
  s = (s + "").length === 1 ? "0" + s : s;
  return `${m}:${s}`;
};
