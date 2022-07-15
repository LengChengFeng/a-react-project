// 引入mockjs
const Mock = require("mockjs");
// 获取 mock.Random 对象

const List = [];
const count = 100;

const baseContent =
  '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>';
const image_uri =
  "https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3";
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: "@increment",
      timestamp: +Mock.Random.date("T"),
      author: "@first",
      reviewer: "@first",
      title: "@title(5, 10)",
      content_short: "mock data",
      content: baseContent,
      forecast: "@float(0, 100, 2, 2)",
      importance: "@integer(1, 3)",
      "type|1": ["CN", "US", "JP", "EU"],
      "status|1": ["published", "draft"],
      display_time: "@datetime",
      comment_disabled: true,
      pageviews: "@integer(300, 5000)",
      image_uri,
      platforms: ["a-platform"],
    })
  );
}
const produceNewsData = function (opts) {
  const config = JSON.parse(opts.body);
  const {
    importance,
    type,
    title,
    page = 1,
    limit = 20,
    sort,
    author,
  } = config;
  let mockList = List.filter((item) => {
    if (importance && item.importance !== +importance) return false;
    if (type && item.type !== type) return false;
    if (title && item.title.indexOf(title) < 0) return false;
    if (author && item.author.indexOf(author) < 0) return false;
    // if(item.id === id ) return
    return true;
  });

  if (sort === "-id") {
    mockList = mockList.reverse();
  }

  const pageList = mockList.filter(
    (item, index) => index < limit * page && index >= limit * (page - 1)
  );

  return {
    code: 20000,
    data: {
      total: mockList.length,
      items: pageList,
    },
  };
};
// 请求该url，就可以返回newsList
Mock.mock("/mock/news", produceNewsData); // 后面讲这个api的使用细节

const detail = function (opts) {
  console.log(opts);
  const config = JSON.parse(opts.body);
  const { id } = config;
  switch (id) {
    case 1:
      return {
        res: {
          code: 200,
          data: [
            {
              id: 1,
              name: "lcf",
              age: 18,
              sex: "男",
              hobbies: "打游戏",
              height: "1.63cm",
              weight: "55kg",
              healthy: "健康",
              job: "web前端",
            },
          ],
        },
      };
    case 2:
      return {
        res: {
          code: 200,
          data: [
            {
              id: 2,
              name: "amei",
              age: 20,
              sex: "女",
              hobbies: "唱歌",
              height: "1.60cm",
              weight: "56kg",
              healthy: "健康",
              job: "歌手",
            },
          ],
        },
      };
    case 3:
      return {
        res: {
          code: 200,
          data: [
            {
              id: 3,
              name: "ny",
              age: 25,
              sex: "女",
              hobbies: "聊天",
              height: "1.65cm",
              weight: "48kg",
              healthy: "健康",
              job: "歌手",
            },
          ],
        },
      };
    case 4:
      return {
        res: {
          code: 200,
          data: [
            {
              id: 4,
              name: "coderwhy",
              age: 18,
              sex: "男",
              hobbies: "听歌",
              height: "1.88cm",
              weight: "55kg",
              healthy: "健康",
              job: "全能高手",
            },
          ],
        },
      };
    case 5:
      return {
        res: {
          code: 200,
          data: [
            {
              id: 5,
              name: "amite",
              age: 26,
              sex: "女",
              hobbies: "打羽毛球",
              height: "1.65cm",
              weight: "52kg",
              healthy: "健康",
              job: "全职",
            },
          ],
        },
      };
    default:
      return;
  }
};

Mock.mock("/mock/news/detail", detail);

console.log("我是来练习tag的");
console.log("我要发布tagv 1.0");
