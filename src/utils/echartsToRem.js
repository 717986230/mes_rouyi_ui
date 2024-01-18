//解决 px2rem转换失效，解决px2rem和echarts冲突
export function pxToRem(n) {
  let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return;
  let fontSize =  (clientWidth / 1920);
  return n * fontSize;
}
export function remToEcharts(n) {
  let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return;
  let fontSize =  (clientWidth / 1920)*1.3;
  return n * fontSize;
}

