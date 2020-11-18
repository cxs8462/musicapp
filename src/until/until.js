export const timeToMinute = times => {
  let t;
  if (times > -1) {
    const hour = Math.floor(times / 3600);
    const min = Math.floor(times / 60) % 60;
    const sec = times % 60;
    if (hour < 10) {
      t = "0" + hour + ":";
    } else {
      t = hour + ":";
    }

    if (min < 10) {
      t += "0";
    }
    t += min + ":";
    if (sec < 10) {
      t += "0";
    }
    t += sec.toFixed(2);
  }
  t = t.substring(0, t.length - 3);
  return t;
};
