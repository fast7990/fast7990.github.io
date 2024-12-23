/*
 * @Date: 2024-12-23 16:50:53
 * @LastEditors: v-huangshaopeng
 * @LastEditTime: 2024-12-23 16:58:04
 * @FilePath: \nuxt-app1\utils\db\table\sys_dict_type.ts
 */
import { DataTypes } from "sequelize";
import Database from "./sequelize";
const localhostInit = (localhost_database: Database) => {
  localhost_database.createModel("sys_dict_type", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    remark: {
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
  });
};

export default localhostInit;
