import * as data2 from "./a.js";
import data1 from "./t.js";
const result = JSON.parse(JSON.stringify(data2));
//循环data2若value是对象继续循环
function loopData(obj) {
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      loopData(value);
    } else {
      // 可在此处添加对非对象值的处理逻辑
      // console.log(key, value);
      loopData1(data1, value, obj ,key);
    }
  }
}

function loopData1(data1, value, parentObj, parentKey) {
  for (let index = 0; index < data1.length; index++) {
    const element = data1[index];
    // console.log(element["原文"], value);
    if (element["原文"] == value) {
      console.log(element["土耳其语"]);
      parentObj[parentKey] = element["土耳其语"];
    }
  }
}
loopData(result);
console.log(result);
// 将result存到新的json文件中
import fs from "fs";
fs.writeFileSync("./a_tr.json", JSON.stringify(result, null, 2));
