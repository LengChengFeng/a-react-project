import service from "../";

export function GetData(data) {
  return service({
    url: "/mock/news",
    method: "POST",
    data,
  });
}

export function GetOtherData(data) {
  return service({
    url: "/mock/news/detail",
    method: "POST",
    data,
  });
}
