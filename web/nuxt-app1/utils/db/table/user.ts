import { DataTypes } from "sequelize";
import Database from "./sequelize";

const localhostInit = (localhost_database: Database) => {
  localhost_database.createModel("user", {
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
};

export default localhostInit;
