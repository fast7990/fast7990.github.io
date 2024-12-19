import {
  CreateOptions,
  DestroyOptions,
  FindOptions,
  Model,
  ModelAttributes,
  ModelOptions,
  ModelStatic,
  Options,
  Sequelize,
  UpdateOptions,
} from "sequelize";
import mysql2 from "mysql2";
/**分页查询 - 基础返回数据 */
export interface paging<T> {
  /**总条数 */
  count: number;
  /**当前页数（用户传来的） */
  page: number;
  /**当前一页个数 （查到多少就是多少） */
  size: number;
  /**数据列表 */
  list: T[];
}
/**数据库基础类
 * @template D 泛型D的键，代表数据库的表名，值为该表对应的列及其类型
 * @template tablename 泛型tablename，代表当前数据库有哪些表。不需要填写, 仅用于内部使用
 */
class Database<
  D extends Record<string, any>,
  tablename extends string = Extract<keyof D, string>
> {
  /**sequelize实例，用于操作数据库 */
  sequelize: Sequelize;
  /**存放模型， 相当于this.sequelize.models，简化路径。如果有些操作是已封装的做不到的事，就从这里取出对应的表，来进行操作 */
  modelMap: Record<string, ModelStatic<Model>>;
  /**数据库基础类 - 构造函数
   * @param username 用户名
   * @param password 密码
   * @param database 数据库名
   * @param options 构造sequelize的可选配置项，详见ts类型。 不填则默认host为localhost
   */
  constructor(
    username: string,
    password: string,
    database: string,
    options?: Options
  ) {
    this.sequelize = new Sequelize(
      database,
      username,
      password,
      Object.assign(
        {
          dialect: "mysql", //基于MySQL数据库
          dialectModule: mysql2, //在nextjs中，不填这个会导致报错“需要手动导入MySQL2包” 。填了就会导致控制台出现一堆提示污染眼睛，但是没办法，不保存就行，污染眼睛随便吧： Critical dependency: the request of a dependency is an expression  Import trace for requested module:
        },
        options || {}
      )
    );
    this.modelMap = this.sequelize.models;
    // console.log('正在new', database);
    // this.test(database)
  }
  /**测试数据库链接是否正常 */
  test = async (databaseName: string = "") => {
    let log = `与${databaseName}数据库的连接`;
    try {
      await this.sequelize.authenticate();
      console.log(log + "正常");
      return log + "正常";
    } catch (error) {
      console.error(log + "失败", error);
      return Promise.reject(log + "失败");
    }
  };
  /**创建模型，也就是初始化这个数据库有哪些表
   * @tip 关于参数的详细解释，可以看 https://blog.csdn.net/weixin_41229588/article/details/106646315
   * @param modelName 模型名称，只能是泛型D中的key
   * @param attributes 模型中包含都数据，每一个数据映射对应表中都每一个字段。键只能是泛型D中的对应table名下的key
   * @param options 模型（表）的设置，比如设置不要 createdAt 和 updatedAt 字段，就使用 timestamps: false
   * @description 关于模型的定义：用来表述（描述）数据库表字段信息的对象，每一个模型对象表示数据库中的一个表，后续对数据库的操作都是通过对应的模型对象来完成的。 https://sequelize.org/docs/v6/core-concepts/model-basics/
   * @template T 不需要填写泛型,仅用于内部推断
   * @template M 不需要填写泛型,仅用于内部推断
   */
  createModel = <M extends Model, T extends string = tablename>(
    modelName: T,
    attributes: ModelAttributes<M, D[T]>,
    options?: ModelOptions<M>
  ) => {
    return this.sequelize.define<M, T>(
      modelName,
      attributes,
      Object.assign({ freezeTableName: true, timestamps: false }, options)
    ); // freezeTableName强制表名等于模型名，timestamps不添加时间戳
  };
  /**增加数据
   * @param tableName 要添加的表名
   * @param newData 要添加的新数据
   * @param config 其他配置项，比如fields属性可以设置“只保存哪个”，详见 https://www.sequelize.cn/core-concepts/model-querying-basics
   * @returns 返回添加后得到的数据
   * @template T 泛型T无需填写，仅供内部使用，代表表名
   */
  add = async <T extends string = tablename>(
    tableName: T,
    newData: Omit<D[T], "id">,
    config?: CreateOptions<any>
  ): Promise<D[T]> => {
    try {
      if (!this.modelMap[tableName]) throw Error(`该表[${tableName}]不存在`);
      const res = (await this.modelMap[tableName].create(
        newData,
        config
      )) as D[T];
      return res;
    } catch (error) {
      console.error("添加数据失败", error);
      return Promise.reject(error);
    }
  };
  /**查询数据。
   * @param tableName 要查询的表名
   * @param options 查询配置项，使用attributes、where、order等来进行筛选和排序等，注意里面的字段需要是数据库有的。详见 https://www.sequelize.cn/core-concepts/model-querying-basics
   * @returns 查询到的数据数组 。注意，查询出来的数据，如果直接返回给前端则不用处理，如果想在服务端使用这些数据，需要注意这些数据还包含数据库的一些其他内容（可以打印来看），**想使用请深拷贝一份！**
   * @template T 无需传递，可以自动识别
   */
  findAll = async <T extends string = tablename>(
    tableName: T,
    options?: FindOptions
  ): Promise<D[T][]> => {
    try {
      if (!this.modelMap[tableName])
        throw Error(
          `该模型[${tableName}]不存在，如果确定该表存在，请先使用createModel创建模型`
        );
      const res = (await this.modelMap[tableName].findAll(options)) as D[T][];
      return res;
    } catch (error) {
      console.error("查询失败", error);
      return Promise.reject(error);
    }
  };
  /**更新数据
   * @param tableName 表名
   * @param newData 更新后的数据，想更新哪个填哪个。
   * @param target 更新的目标，可以在里面填where语句等，详见 https://www.sequelize.cn/core-concepts/model-querying-basics#简单-update-查询
   * @returns 更新的个数，是个数字数组，比如更新三个就是 [3] 。 如果没修改成功，需要手动写判断。
   * @example  if(res[0] === 0) throw new rejectData(code.BAD_REQUEST, '未找到该用户')
   * @template T 泛型T无需填写，仅供内部使用，代表表名
   */
  update = async <T extends string = tablename>(
    tableName: T,
    newData: Partial<D[T]>,
    target: Omit<UpdateOptions<D[T]>, "returning">
  ) => {
    try {
      if (!this.modelMap[tableName]) throw Error(`该表[${tableName}]不存在`);
      const res = await this.modelMap[tableName].update(newData, target);
      return res;
    } catch (error) {
      console.error("更新失败", error);
      return Promise.reject(error);
    }
  };
  /**删除数据。**慎用！！**
   * @param tableName 表名
   * @param options 删除配置选项。**慎用** 详细配置大体见https://www.sequelize.cn/core-concepts/model-querying-basics
   * @returns 删除的个数。number
   */
  delete = async (tableName: tablename, options: DestroyOptions) => {
    try {
      if (!options) throw TypeError("请传递删除选项");
      if (!this.modelMap[tableName]) throw Error(`该表[${tableName}]不存在`);
      return await this.modelMap[tableName].destroy(options);
    } catch (error) {
      console.error("删除失败", error);
      return Promise.reject(error);
    }
  };
  /**分页查询
   * @param tableName 表名
   * @param page 当前页数
   * @param size 一页个数
   * @param otherOptions 其它配置项
   * @returns
   */
  findByPage = async <T extends string = tablename>(
    tableName: T,
    page: number,
    size: number,
    otherOptions?: FindOptions
  ): Promise<paging<D[T]>> => {
    try {
      if (!this.modelMap[tableName])
        throw Error(
          `该模型[${tableName}]不存在，如果确定该表存在，请先使用createModel创建模型`
        );
      const res = await this.modelMap[tableName].findAndCountAll(
        Object.assign(
          {
            offset: Number((page - 1) * size), // 查询的起始下标
            limit: Number(size), // 查询的条数
          },
          otherOptions
        )
      );
      return {
        count: res.count, // 数据总条数
        list: res.rows as D[T], // 查询的到数据
        page,
        size: res.rows.length,
      };
    } catch (error) {
      console.error("分页查询", error);
      return Promise.reject(error);
    }
  };
  /**随机获取指定数量的数据 */
  randomFind = async <T extends string = tablename>(
    tableName: T,
    limit: number,
    otherOptions?: FindOptions
  ): Promise<D[T][]> => {
    try {
      if (!this.modelMap[tableName])
        throw Error(
          `该模型[${tableName}]不存在，如果确定该表存在，请先使用createModel创建模型`
        );
      const res = await this.findAll<D[T]>(
        tableName as any,
        Object.assign(
          {
            order: Sequelize.literal("RAND()"), // 随机排序
            limit, // 获取指定量的数据
          },
          otherOptions
        )
      );
      return res;
    } catch (error) {
      console.error("随机获取指定数量的数据", error);
      return Promise.reject(error);
    }
  };
}
export default Database;
