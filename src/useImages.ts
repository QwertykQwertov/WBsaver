export function wb_img_url(input: string) {
  const nm = parseInt(input, 10),
    vol = ~~(nm / 1e5),
    part = ~~(nm / 1e3);
  let host;
  if (vol >= 0 && vol <= 143) {
    host = "//basket-01.wb.ru";
  } else if (vol >= 144 && vol <= 287) {
    host = "//basket-02.wb.ru";
  } else if (vol >= 288 && vol <= 431) {
    host = "//basket-03.wb.ru";
  } else if (vol >= 432 && vol <= 719) {
    host = "//basket-04.wb.ru";
  } else if (vol >= 720 && vol <= 1007) {
    host = "//basket-05.wb.ru";
  } else if (vol >= 1008 && vol <= 1061) {
    host = "//basket-06.wb.ru";
  } else if (vol >= 1062 && vol <= 1115) {
    host = "//basket-07.wb.ru";
  } else if (vol >= 1116 && vol <= 1169) {
    host = "//basket-08.wb.ru";
  } else if (vol >= 1170 && vol <= 1313) {
    host = "//basket-09.wb.ru";
  } else if (vol >= 1314 && vol <= 1601) {
    host = "//basket-10.wb.ru";
  } else if (vol >= 1602 && vol <= 1655) {
    host = "//basket-11.wb.ru";
  } else if (vol >= 1656 && vol <= 1919) {
    host = "//basket-12.wb.ru";
  } else if (vol >= 1920 && vol <= 2045) {
    host = "//basket-13.wb.ru";
  } else {
    host = "//basket-14.wb.ru";
  }

  return `${host}/vol${vol}/part${part}/${nm}`;
}
