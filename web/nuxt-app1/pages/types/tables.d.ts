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
}