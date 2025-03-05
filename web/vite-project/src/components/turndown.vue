<script setup>
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
let turndownService = new TurndownService();
turndownService.use(gfm);
turndownService.addRule("table", {
  filter: "table",
  replacement: function (content, node) {
    console.log(node, "==000000sdsd");
    const div = document.createElement("div");
    div.innerHTML = content;
    const colgroup = div.querySelector("colgroup");
    if (colgroup) {
      div.removeChild(colgroup);
    }
    return content; // 返回空字符串，删除 <colgroup> 元素
  },
});
function convertTableType1ToType2(tableHtml) {
  // 匹配表格内容
  const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/;
  const tableMatch = tableHtml.match(tableRegex);
  if (!tableMatch) return null;

  // 提取表格的每一行和表头
  const theadRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/;
  const tbodyRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/g;

  // 处理表头
  const theadHtml = tableHtml.match(new RegExp(theadRegex.source))[1];
  const thRegex = /<th[^>]*>([\s\S]*?)<\/th>/g;
  let columns = [];
  let thMatch;

  while ((thMatch = thRegex.exec(theadHtml)) !== null) {
    const thContent = thMatch[1].trim();
    const textAlign = "left"; // 默认左对齐
    columns.push({ title: thContent, textAlign });
  }

  // 处理数据行
  let dataRows = [];
  let match;

  while ((match = tbodyRegex.exec(tableHtml)) !== null) {
    const trHtml = match[1];
    const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/g;
    let rowData = [];
    let tdMatch;

    while ((tdMatch = tdRegex.exec(trHtml)) !== null) {
      const tdContent = tdMatch[1].trim();
      rowData.push(tdContent);
    }

    dataRows.push(rowData);
  }

  // 构建新表格
  const newTableHtml = `
    <table>
      <thead>
        <tr>
          ${columns
            .map(
              (col) =>
                `<th style="text-align:${col.textAlign}">${col.title}</th>`
            )
            .join("")}
        </tr>
      </thead>
      <tbody>
        ${dataRows
          .map(
            (row) => `
          <tr>
            ${row
              .map((cell) => `<td style="text-align:left">${cell}</td>`)
              .join("")}
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `.trim();
  let value = replacePWithSpan(newTableHtml);
  let value1 = convertTableType2ToType1(value);
  return value1;
}

function convertTableType2ToType1(tableHtml) {
  const div = document.createElement("div");
  div.innerHTML = tableHtml;
  const tr = div.querySelectorAll("tr");
  console.log(tr, "tr");
  tr.forEach((row) => {
    const th = row.querySelector("th");
    console.log(typeof row.innerText.trim(), "row");
    if (row.innerText.trim() == "") {
      row.remove();
    }
  });
  return div.innerHTML;
}

function replacePWithSpan(html) {
  const span = document.createElement("span");
  span.innerHTML = html;
  const pElements = span.querySelectorAll("p");
  pElements.forEach((p) => {
    const spanElement = document.createElement("span");
    spanElement.innerHTML = p.innerHTML;
    p.replaceWith(spanElement);
  });
  return span.innerHTML;
}

let tableType1 = `<table style="min-width: 150px"><colgroup><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"><col style="min-width: 25px"></colgroup><tbody><tr><th colspan="1" rowspan="1"><p>任务级别</p></th><th colspan="1" rowspan="1"><p>事项描述</p></th><th colspan="1" rowspan="1"><p>责任人</p></th><th colspan="1" rowspan="1"><p>协同方</p></th><th colspan="1" rowspan="1"><p>里程碑</p></th><th colspan="1" rowspan="1"><p>状态</p></th></tr><tr><td colspan="1" rowspan="1"><p>紧急</p></td><td colspan="1" rowspan="1"><p>{{任务1}}</p></td><td colspan="1" rowspan="1"><p>{{姓名}}</p></td><td colspan="1" rowspan="1"><p>{{部门}}</p></td><td colspan="1" rowspan="1"><p>{{日期}}</p></td><td colspan="1" rowspan="1"><p>进行中</p></td></tr><tr><td colspan="1" rowspan="1"><p>重要</p></td><td colspan="1" rowspan="1"><p>{{任务2}}</p></td><td colspan="1" rowspan="1"><p>{{姓名}}</p></td><td colspan="1" rowspan="1"><p>-</p></td><td colspan="1" rowspan="1"><p>{{日期}}</p></td><td colspan="1" rowspan="1"><p>未开始</p></td></tr><tr><td colspan="1" rowspan="1"><p>常规</p></td><td colspan="1" rowspan="1"><p>{{任务3}}</p></td><td colspan="1" rowspan="1"><p>{{姓名}}</p></td><td colspan="1" rowspan="1"><p>{{外部单位}}</p></td><td colspan="1" rowspan="1"><p>{{日期}}</p></td><td colspan="1" rowspan="1"><p>已延期</p></td></tr></tbody></table>`;
const value = convertTableType1ToType2(tableType1);
console.log(value);
let markdown = turndownService.turndown(value);
console.log(markdown);
</script>

<template>
  <div>
    {{ markdown }}
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
