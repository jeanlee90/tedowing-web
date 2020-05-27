export enum Device {
  pc = "pc",
  mobile = "mobile",
}

export function getDevice() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return isMobile ? Device.mobile : Device.pc;
}

export function isMobile() {
  return getDevice() === Device.mobile;
}
