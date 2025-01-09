import db from "@/utils/db/localtable";
const list = async (event) => {
  const body = await readBody(event);
  const query = getQuery(event);
  const page = parseInt(query.page) || 1; // 获取当前页码，默认为1
  const pageSize = parseInt(query.pageSize) || 10; // 获取每页显示的记录数，默认为10
  // console.log(body, "====body");
  console.log(query, "====query");
  try {
    // 实现分页查询用户信息sql
    let results = await db.findByPage("user", page, pageSize, {
      attributes: [
        "id",
        "username",
        "email",
        "status",
        "create_time",
        "update_time",
        "deleted_at",
      ],
    });
    // console.log(results, "====results");
    let data = results ? results : [];
    return {
      code: 200,
      data: data,
    };
  } catch (error) {
    return {
      code: 0,
      data: [],
      error: error?.fields,
    };
  }
};

export default defineEventHandler(async (event) => {
  const { name } = event.context.params;
  console.log("====type====", name);
  return await list(event);
});
