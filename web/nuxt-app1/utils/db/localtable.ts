/*
 * @Date: 2024-12-19 16:52:40
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-12-19 17:03:17
 * @FilePath: \nuxt-app1\utils\db\localtable.ts
 */
// localhost_test.ts

import { DataTypes } from "sequelize";
import Database from "./sequelize";
/**本数据库的表名列表 */
interface tables {
  /**user表 */
  user: {
    id: number; // '用户主键ID'
    username: string; //varchar(50) NOT NULL COMMENT '用户昵称',
    email: string; //varchar(50) NOT NULL COMMENT '登录邮箱',
    password: string; //varchar(255) NOT NULL COMMENT '登录密码',
    status: string; // tinyint(4) DEFAULT '1' COMMENT '用户状态:0-禁用,1-正常',
    create_time: string; //datetime NOT NULL COMMENT '创建时间',
    update_time: string; //datetime NOT NULL,
    deleted_at: string; //datetime DEFAULT NULL,
  };
  /**其它测试表 */
  ohter: {
    /**测试字段 */
    test: string;
  };
}

/**本地-数据库名为test的测试数据库 */
const localhost_test = new Database<tables>(
  "root",
  "Aa1008611",
  "youlai_boot",
  {
    host: "sh-cynosdbmysql-grp-n28ca842.sql.tencentcdb.com",
    port: 22278,
    dialect: "mysql", //数据库类型
  }
); //分别是用户名，密码，数据库名，其它配置选填 （见class的构造函数）

//配置数据表
localhost_test.createModel("user", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(4),
    allowNull: false,
  },
  create_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  update_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  //错误示例：此字段不在 “user” 表中，填写在这会出现ts报错，有效避免bug
  // test: {
  //     type: DataTypes.SMALLINT,
  //     allowNull: false
  // }
});

export default localhost_test;
