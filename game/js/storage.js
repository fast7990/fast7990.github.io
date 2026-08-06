/**
 * 本地存储模块
 * 封装localStorage操作，用于保存、读取和清除游戏进度
 */
class Storage {
    /**
     * 存储键名
     */
    static get STORAGE_KEY() {
        return 'sokoban_game_progress';
    }

    /**
     * 保存已通关关卡信息
     * @param {Array<number>} completedLevels - 已通关关卡数组
     * @returns {boolean} - 存储是否成功
     */
    static saveCompletedLevels(completedLevels) {
        try {
            const data = {
                completedLevels,
                lastUpdate: new Date().toISOString()
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('无法保存进度:', error);
            return false;
        }
    }

    /**
     * 获取已通关关卡信息
     * @returns {Array<number>} - 已通关关卡数组
     */
    static getCompletedLevels() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const parsedData = JSON.parse(data);
                return parsedData.completedLevels || [];
            }
            return [];
        } catch (error) {
            console.error('无法读取进度:', error);
            return [];
        }
    }

    /**
     * 清除所有游戏进度
     * @returns {boolean} - 清除是否成功
     */
    static clearProgress() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('无法清除进度:', error);
            return false;
        }
    }

    /**
     * 检查关卡是否已通关
     * @param {number} level - 关卡编号
     * @returns {boolean} - 是否已通关
     */
    static isLevelCompleted(level) {
        const completedLevels = this.getCompletedLevels();
        return completedLevels.includes(level);
    }

    /**
     * 添加已通关关卡
     * @param {number} level - 关卡编号
     * @returns {boolean} - 保存是否成功
     */
    static addCompletedLevel(level) {
        const completedLevels = this.getCompletedLevels();
        if (!completedLevels.includes(level)) {
            completedLevels.push(level);
            // 排序确保关卡编号有序
            completedLevels.sort((a, b) => a - b);
            return this.saveCompletedLevels(completedLevels);
        }
        return true;
    }
}

// 导出模块
window.Storage = Storage;