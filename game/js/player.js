/**
 * 玩家控制与碰撞检测模块
 * 负责处理玩家移动逻辑和碰撞检测
 */
class PlayerController {
    /**
     * 构造函数
     * @param {Map} map - 地图实例
     */
    constructor(map) {
        this.map = map;
        this.onMoveCallback = null;
        this.onWinCallback = null;
    }

    /**
     * 设置移动回调函数
     * @param {Function} callback - 移动后的回调函数
     */
    setOnMoveCallback(callback) {
        this.onMoveCallback = callback;
    }

    /**
     * 设置胜利回调函数
     * @param {Function} callback - 胜利后的回调函数
     */
    setOnWinCallback(callback) {
        this.onWinCallback = callback;
    }

    /**
     * 处理键盘事件
     * @param {KeyboardEvent} event - 键盘事件对象
     */
    handleKeyPress(event) {
        const key = event.key.toLowerCase();
        let direction;

        // 处理方向键
        switch (key) {
            case 'arrowup':
            case 'w':
                direction = { x: 0, y: -1 };
                break;
            case 'arrowdown':
            case 's':
                direction = { x: 0, y: 1 };
                break;
            case 'arrowleft':
            case 'a':
                direction = { x: -1, y: 0 };
                break;
            case 'arrowright':
            case 'd':
                direction = { x: 1, y: 0 };
                break;
            default:
                return; // 忽略其他按键
        }

        event.preventDefault(); // 阻止默认行为
        this.move(direction);
    }

    /**
     * 移动玩家
     * @param {Object} direction - 移动方向 {x: 0, y: -1} 表示向上
     * @returns {boolean} - 移动是否成功
     */
    move(direction) {
        const playerPos = this.map.getPlayerPosition();
        const newPos = {
            x: playerPos.x + direction.x,
            y: playerPos.y + direction.y
        };

        // 检查移动是否合法
        if (!this.isValidMove(newPos)) {
            return false;
        }

        const currentType = this.map.getCellType(playerPos.x, playerPos.y);
        const newType = this.map.getCellType(newPos.x, newPos.y);

        // 处理当前位置
        const currentIsTarget = (currentType === Map.TYPES.PLAYER_ON_TARGET);
        this.map.updateCell(
            playerPos.x, 
            playerPos.y, 
            currentIsTarget ? Map.TYPES.TARGET : Map.TYPES.EMPTY
        );

        // 处理新位置
        if (newType === Map.TYPES.BOX || newType === Map.TYPES.BOX_ON_TARGET) {
            // 推动箱子
            const boxNewPos = {
                x: newPos.x + direction.x,
                y: newPos.y + direction.y
            };
            
            if (!this.canPushBox(newPos, boxNewPos)) {
                // 无法推动箱子，恢复玩家位置
                this.map.updateCell(
                    playerPos.x, 
                    playerPos.y, 
                    currentIsTarget ? Map.TYPES.PLAYER_ON_TARGET : Map.TYPES.PLAYER
                );
                return false;
            }

            // 移动箱子
            this.pushBox(newPos, boxNewPos);
        }

        // 移动玩家到新位置
        const newPosIsTarget = (newType === Map.TYPES.TARGET);
        this.map.updateCell(
            newPos.x, 
            newPos.y, 
            newPosIsTarget ? Map.TYPES.PLAYER_ON_TARGET : Map.TYPES.PLAYER
        );

        // 触发移动回调
        if (this.onMoveCallback) {
            this.onMoveCallback();
        }

        // 检查是否胜利
        if (this.map.checkWinCondition() && this.onWinCallback) {
            this.onWinCallback();
        }

        return true;
    }

    /**
     * 检查移动是否合法
     * @param {Object} position - 目标位置 {x, y}
     * @returns {boolean} - 移动是否合法
     */
    isValidMove(position) {
        const type = this.map.getCellType(position.x, position.y);
        if (type === null) {
            return false; // 超出地图边界
        }

        // 玩家可以移动到空地、目标点或箱子
        return [
            Map.TYPES.EMPTY,
            Map.TYPES.TARGET,
            Map.TYPES.BOX,
            Map.TYPES.BOX_ON_TARGET
        ].includes(type);
    }

    /**
     * 检查是否可以推动箱子
     * @param {Object} boxPos - 箱子当前位置 {x, y}
     * @param {Object} newPos - 箱子新位置 {x, y}
     * @returns {boolean} - 是否可以推动箱子
     */
    canPushBox(boxPos, newPos) {
        const boxType = this.map.getCellType(boxPos.x, boxPos.y);
        if (![Map.TYPES.BOX, Map.TYPES.BOX_ON_TARGET].includes(boxType)) {
            return false; // 不是箱子
        }

        const newType = this.map.getCellType(newPos.x, newPos.y);
        if (newType === null) {
            return false; // 超出地图边界
        }

        // 箱子只能被推到空地或目标点
        return [Map.TYPES.EMPTY, Map.TYPES.TARGET].includes(newType);
    }

    /**
     * 推动箱子
     * @param {Object} boxPos - 箱子当前位置 {x, y}
     * @param {Object} newPos - 箱子新位置 {x, y}
     */
    pushBox(boxPos, newPos) {
        const boxType = this.map.getCellType(boxPos.x, boxPos.y);
        const newPosType = this.map.getCellType(newPos.x, newPos.y);

        // 更新箱子原来的位置
        const boxWasOnTarget = (boxType === Map.TYPES.BOX_ON_TARGET);
        this.map.updateCell(
            boxPos.x, 
            boxPos.y, 
            boxWasOnTarget ? Map.TYPES.TARGET : Map.TYPES.EMPTY
        );

        // 更新箱子新位置
        const newPosIsTarget = (newPosType === Map.TYPES.TARGET);
        this.map.updateCell(
            newPos.x, 
            newPos.y, 
            newPosIsTarget ? Map.TYPES.BOX_ON_TARGET : Map.TYPES.BOX
        );
    }

    /**
     * 向上移动
     */
    moveUp() {
        this.move({ x: 0, y: -1 });
    }

    /**
     * 向下移动
     */
    moveDown() {
        this.move({ x: 0, y: 1 });
    }

    /**
     * 向左移动
     */
    moveLeft() {
        this.move({ x: -1, y: 0 });
    }

    /**
     * 向右移动
     */
    moveRight() {
        this.move({ x: 1, y: 0 });
    }

    /**
     * 重置玩家状态
     * @param {Array<Array<number>>} initialMapData - 初始地图数据
     */
    reset(initialMapData) {
        this.map.reset(initialMapData);
    }
}

// 导出模块
window.PlayerController = PlayerController;