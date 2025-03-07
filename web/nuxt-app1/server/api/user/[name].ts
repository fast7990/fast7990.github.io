/*
 * @Date: 2024-12-19 15:11:26
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-12-23 17:19:00
 * @FilePath: \nuxt-app1\server\api\user\[name].ts
 */
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
const create = async (event) => {
  const body = await readBody(event);
  console.log(body, "====body");
  if (!body.username || !body.email || !body.password) {
    return {
      code: 0,
      data: [],
      error: "参数不完整",
    };
  }
  try {
    // 创建用户信息sql
    let results = await db.add("user", {
      username: body.username,
      email: body.email,
      password: body.password,
      status: 1,
      create_time: new Date(),
      update_time: new Date(),
    });
    let data = results ? results[0] : [];
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
const deleted = async (event) => {
  const body = await readBody(event);
  const query = getQuery(event);
  if (!query.id) {
    return {
      code: 0,
      data: [],
      error: "参数不完整",
    };
  }
  try {
    // 删除用户信息sql
    let results = await db.delete("user", {
      where: { id: query.id },
    });
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

const update = async (event) => {
  const body = await readBody(event);
  if (!body.id) {
    return {
      code: 0,
      data: [],
      error: "参数不完整",
    };
  }
  try {
    // 更新用户信息sql
    let password = body.password || undefined;
    let status = body.status || undefined;
    let results = await db.update(
      "user",
      {
        id: body.id,
        username: body.username,
        email: body.email,
        status,
        password,
        update_time: new Date(),
      },
      {
        where: { id: body.id },
      }
    );
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
const detail = async (event) => {
  const query = getQuery(event);
  try {
    // 查询用户信息sql
    let results = await db.findAll("user", {
      attributes: [
        "id",
        "username",
        "email",
        "status",
        "create_time",
        "update_time",
      ],
      where: { id: query.id },
    });
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
  switch (name) {
    case "list":
      return await list(event);
      break;
    case "get":
      return await detail(event);
      break;
    case "create":
      return await create(event);
      break;
    case "update":
      return await update(event);
      break;
    case "delete":
      return await deleted(event);
      break;
    default:
      return {
        code: 200,
        data: [],
        error: "No path found",
      };
      break;
  }
});
