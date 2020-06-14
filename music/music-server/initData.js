var Type = require("./models/type");

// 活动类别
const typeArr = ['竞赛','美食','娱乐','比赛','校方组织','院系组织']
typeArr.map(name => {
  Type
    .create({
      name,
    })
    .then(function (p) {
      console.log("created. " + JSON.stringify(p));
    })
    .catch(function (err) {
      console.log("failed: " + err);
    });
})

// 活动信息
