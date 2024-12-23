import { DataTypes } from "sequelize";
import Database from "../sequelize";
import localhost_database from "../localtable";
import User from "./user";
import SysDictType from "./sys_dict_type";

// 初始化数据库
const init = async () => {
  try {
    await localhost_database.test();
    console.log("Connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return false;
  }
};

const tableInit = async () => {
  let results = await init();
  if (results) {
    User(localhost_database);
    SysDictType(localhost_database);
  }
};

export default tableInit;
