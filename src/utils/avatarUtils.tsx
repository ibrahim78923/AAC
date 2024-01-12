const colorLoop = (str: string) => {
  let a = 1;
  let b = 0;
  let i = 0;
  const l = str.length;
  const m = 65521;
  for (; i < l; i++) {
    a = (a + str.charCodeAt(i)) % m;
    b = (b + a) % m;
  }
  return (b << 16) | a;
};
export const generateColorFromName = (name: string) => {
  const hash = colorLoop(name);
  const r = (hash & 0xff0000) >> 17;
  const g = (hash & 0x00ff00) >> 3;
  const b = hash & (0x0000ff >> 1);
  return `rgb(${r},${g},${b})`;
};
