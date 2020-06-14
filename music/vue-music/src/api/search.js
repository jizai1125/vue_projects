import request from "src/utils/request";

// 获取搜索历史
export function getSearchHis() {
  return request.get("/search_his/list").then(
    (res) => {
      return Promise.resolve(res.result);
    },
    (err) => {
      console.log(err);
    }
  );
}

// 添加搜索历史
export function addSearchHis(keyword) {
  return request.post("/search_his/new", { keyword }).then(
    (res) => {
      return Promise.resolve(res.result);
    },
    (err) => {
      console.log(err);
    }
  );
}

// 删除搜索历史
export function delSearchHis(keyword) {
  return request.delete("/search_his/delete", { data: { keyword }}).then(
    (res) => {
      return Promise.resolve(res.result);
    },
    (err) => {
      console.log(err);
    }
  );
}

// 清空搜索历史
export function cleearSearchHis() {
  return request.delete("/search_his/clear").then(
    (res) => {
      return Promise.resolve(res.result);
    },
    (err) => {
      console.log(err);
    }
  );
}