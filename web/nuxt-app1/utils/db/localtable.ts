/*
 * @Date: 2024-12-19 16:52:40
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-12-23 16:47:15
 * @FilePath: \nuxt-app1\utils\db\localtable.ts
 */
import { DataTypes } from "sequelize";
import Database from "./sequelize";
import tableInit from "./table";
/**本地-数据库名为test的测试数据库 */
const localhost_database = new Database("root", "Aa1008611", "youlai_boot", {
  host: "sh-cynosdbmysql-grp-n28ca842.sql.tencentcdb.com",
  port: 22278,
  dialect: "mysql", //数据库类型
}); //分别是用户名，密码，数据库名，其它配置选填 （见class的构造函数）
tableInit(localhost_database);

export default localhost_database;
