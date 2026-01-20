/**
 * 地图模块
 * 负责地图的加载、渲染和更新
 */
class Map {
    /**
     * 地图元素类型定义
     */
    static get TYPES() {
        return {
            EMPTY: 0,        // 空地
            WALL: 1,         // 墙
            PLAYER: 2,       // 玩家
            BOX: 3,          // 箱子
            TARGET: 4,       // 目标点
            BOX_ON_TARGET: 5,// 箱子在目标点
            PLAYER_ON_TARGET: 6 // 玩家在目标点
        };
    }

    /**
     * 元素类型对应的CSS类名
     */
    static get TYPE_CLASSES() {
        return {
            [Map.TYPES.EMPTY]: 'empty',
            [Map.TYPES.WALL]: 'wall',
            [Map.TYPES.PLAYER]: 'player',
            [Map.TYPES.BOX]: 'box',
            [Map.TYPES.TARGET]: 'target',
            [Map.TYPES.BOX_ON_TARGET]: 'box-on-target',
            [Map.TYPES.PLAYER_ON_TARGET]: 'player'
        };
    }

    /**
     * 构造函数
     * @param {HTMLElement} container - 地图容器元素
     */
    constructor(container) {
        this.container = container;
        this.mapData = [];
        this.mapSize = {
            rows: 0,
            cols: 0
        };
        this.playerPosition = {
            x: 0,
            y: 0
        };
    }

    /**
     * 加载地图数据
     * @param {Array<Array<number>>} mapData - 地图数据二维数组
     */
    loadMap(mapData) {
        this.mapData = mapData;
        this.mapSize.rows = mapData.length;
        this.mapSize.cols = mapData[0].length;
        this.findPlayerPosition();
        this.validateMap();
    }

    /**
     * 渲染地图
     */
    render() {
        // 清空容器
        this.container.innerHTML = '';

        // 渲染地图行
        for (let y = 0; y < this.mapSize.rows; y++) {
            const row = document.createElement('div');
            row.className = 'map-row';

            // 渲染地图单元格
            for (let x = 0; x < this.mapSize.cols; x++) {
                const cell = this.createCell(x, y);
                row.appendChild(cell);
            }

            this.container.appendChild(row);
        }
    }

    /**
     * 创建地图单元格
     * @param {number} x - 单元格x坐标
     * @param {number} y - 单元格y坐标
     * @returns {HTMLElement} - 单元格DOM元素
     */
    createCell(x, y) {
        const cell = document.createElement('div');
        cell.className = `map-cell ${this.getCellClass(x, y)}`;
        cell.dataset.x = x;
        cell.dataset.y = y;
        return cell;
    }

    /**
     * 获取单元格的CSS类名
     * @param {number} x - 单元格x坐标
     * @param {number} y - 单元格y坐标
     * @returns {string} - CSS类名
     */
    getCellClass(x, y) {
        const type = this.mapData[y][x];
        return Map.TYPE_CLASSES[type];
    }

    /**
     * 更新单元格
     * @param {number} x - 单元格x坐标
     * @param {number} y - 单元格y坐标
     * @param {number} newType - 新的单元格类型
     */
    updateCell(x, y, newType) {
        if (x < 0 || x >= this.mapSize.cols || y < 0 || y >= this.mapSize.rows) {
            return;
        }

        // 更新数据
        this.mapData[y][x] = newType;

        // 更新DOM
        const cell = this.getCellElement(x, y);
        if (cell) {
            cell.className = `map-cell ${this.getCellClass(x, y)}`;
        }

        // 更新玩家位置
        if (newType === Map.TYPES.PLAYER || newType === Map.TYPES.PLAYER_ON_TARGET) {
            this.playerPosition.x = x;
            this.playerPosition.y = y;
        } else if ((this.playerPosition.x === x && this.playerPosition.y === y) && 
                  (newType !== Map.TYPES.PLAYER && newType !== Map.TYPES.PLAYER_ON_TARGET)) {
            // 如果玩家位置被其他元素覆盖，重新查找玩家位置
            this.findPlayerPosition();
        }
    }

    /**
     * 获取指定位置的单元格元素
     * @param {number} x - 单元格x坐标
     * @param {number} y - 单元格y坐标
     * @returns {HTMLElement|null} - 单元格DOM元素
     */
    getCellElement(x, y) {
        return this.container.querySelector(`[data-x="${x}"][data-y="${y}"]`);
    }

    /**
     * 获取指定位置的单元格类型
     * @param {number} x - 单元格x坐标
     * @param {number} y - 单元格y坐标
     * @returns {number|null} - 单元格类型
     */
    getCellType(x, y) {
        if (x < 0 || x >= this.mapSize.cols || y < 0 || y >= this.mapSize.rows) {
            return null;
        }
        return this.mapData[y][x];
    }

    /**
     * 查找玩家位置
     */
    findPlayerPosition() {
        for (let y = 0; y < this.mapSize.rows; y++) {
            for (let x = 0; x < this.mapSize.cols; x++) {
                const type = this.mapData[y][x];
                if (type === Map.TYPES.PLAYER || type === Map.TYPES.PLAYER_ON_TARGET) {
                    this.playerPosition.x = x;
                    this.playerPosition.y = y;
                    return;
                }
            }
        }
        // 如果没找到玩家，默认为(0, 0)
        this.playerPosition.x = 0;
        this.playerPosition.y = 0;
    }

    /**
     * 获取玩家位置
     * @returns {Object} - 玩家位置坐标
     */
    getPlayerPosition() {
        return { ...this.playerPosition };
    }

    /**
     * 验证地图数据的合法性
     * @returns {boolean} - 地图是否合法
     */
    validateMap() {
        // 检查地图是否为空
        if (!this.mapData || this.mapData.length === 0 || this.mapData[0].length === 0) {
            console.error('无效的地图数据：地图为空');
            return false;
        }

        // 检查所有行长度是否一致
        const firstRowLength = this.mapData[0].length;
        for (let y = 1; y < this.mapSize.rows; y++) {
            if (this.mapData[y].length !== firstRowLength) {
                console.error('无效的地图数据：所有行长度必须一致');
                return false;
            }
        }

        // 检查玩家是否存在
        let playerCount = 0;
        for (let y = 0; y < this.mapSize.rows; y++) {
            for (let x = 0; x < this.mapSize.cols; x++) {
                const type = this.mapData[y][x];
                if (type === Map.TYPES.PLAYER || type === Map.TYPES.PLAYER_ON_TARGET) {
                    playerCount++;
                }
            }
        }

        if (playerCount === 0) {
            console.error('无效的地图数据：缺少玩家');
            return false;
        }

        if (playerCount > 1) {
            console.error('无效的地图数据：玩家数量不能超过1个');
            return false;
        }

        return true;
    }

    /**
     * 检查是否所有箱子都在目标点上
     * @returns {boolean} - 是否所有箱子都在目标点上
     */
    checkWinCondition() {
        for (let y = 0; y < this.mapSize.rows; y++) {
            for (let x = 0; x < this.mapSize.cols; x++) {
                const type = this.mapData[y][x];
                if (type === Map.TYPES.BOX) {
                    // 还有箱子不在目标点上
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 重置地图到初始状态
     * @param {Array<Array<number>>} initialMapData - 初始地图数据
     */
    reset(initialMapData) {
        this.loadMap(initialMapData);
        this.render();
    }

    /**
     * 获取地图的宽高信息
     * @returns {Object} - 地图尺寸
     */
    getSize() {
        return { ...this.mapSize };
    }
}

// 导出模块
window.Map = Map;