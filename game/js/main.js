/**
 * 游戏主逻辑模块
 * 负责整合所有模块，处理游戏的初始化、事件监听和界面交互
 */
class Game {
    /**
     * 构造函数
     */
    constructor() {
        this.levelManager = null;
        this.map = null;
        this.playerController = null;
        this.stepCount = 0;
        this.initialMapData = null;
        
        // DOM元素引用
        this.elements = {
            gameMap: document.getElementById('game-map'),
            levelInfo: document.getElementById('level-info'),
            stepInfo: document.getElementById('step-info'),
            btnHelp: document.getElementById('btn-help'),
            btnReset: document.getElementById('btn-reset'),
            btnLevels: document.getElementById('btn-levels'),
            btnUp: document.getElementById('btn-up'),
            btnDown: document.getElementById('btn-down'),
            btnLeft: document.getElementById('btn-left'),
            btnRight: document.getElementById('btn-right'),
            winModal: document.getElementById('win-modal'),
            finalSteps: document.getElementById('final-steps'),
            btnNext: document.getElementById('btn-next'),
            btnReplay: document.getElementById('btn-replay'),
            btnCloseModal: document.getElementById('btn-close-modal'),
            levelsModal: document.getElementById('levels-modal'),
            levelsList: document.getElementById('levels-list'),
            btnCloseLevels: document.getElementById('btn-close-levels'),
            helpModal: document.getElementById('help-modal')
        };
    }

    /**
     * 初始化游戏
     */
    init() {
        try {
            // 初始化关卡管理器
            this.levelManager = new LevelManager();
            
            // 初始化地图
            this.map = new Map(this.elements.gameMap);
            
            // 初始化玩家控制器
            this.playerController = new PlayerController(this.map);
            this.playerController.setOnMoveCallback(() => this.onPlayerMove());
            this.playerController.setOnWinCallback(() => this.onWin());
            
            // 加载初始关卡
            this.loadCurrentLevel();
            
            // 绑定事件监听器
            this.bindEventListeners();
            
            console.log('游戏初始化完成');
        } catch (error) {
            console.error('游戏初始化失败:', error);
            alert('游戏初始化失败，请刷新页面重试');
        }
    }

    /**
     * 绑定事件监听器
     */
    bindEventListeners() {
        // 键盘事件
        document.addEventListener('keydown', (event) => {
            this.playerController.handleKeyPress(event);
        });

        // 按钮事件
        this.elements.btnHelp.addEventListener('click', () => {
            this.showHelpModal();
        });

        this.elements.btnReset.addEventListener('click', () => {
            this.resetLevel();
        });

        this.elements.btnLevels.addEventListener('click', () => {
            this.showLevelsModal();
        });

        // 移动端控制按钮
        this.elements.btnUp.addEventListener('click', () => {
            this.playerController.moveUp();
        });

        this.elements.btnDown.addEventListener('click', () => {
            this.playerController.moveDown();
        });

        this.elements.btnLeft.addEventListener('click', () => {
            this.playerController.moveLeft();
        });

        this.elements.btnRight.addEventListener('click', () => {
            this.playerController.moveRight();
        });

        // 弹窗按钮
        this.elements.btnCloseModal.addEventListener('click', () => {
            this.hideWinModal();
        });

        this.elements.btnReplay.addEventListener('click', () => {
            this.hideWinModal();
            this.resetLevel();
        });

        this.elements.btnNext.addEventListener('click', () => {
            this.hideWinModal();
            this.loadNextLevel();
        });

        this.elements.btnCloseLevels.addEventListener('click', () => {
            this.hideLevelsModal();
        });

        // 点击模态框外部关闭弹窗
        this.elements.winModal.addEventListener('click', (event) => {
            if (event.target === this.elements.winModal) {
                this.hideWinModal();
            }
        });

        this.elements.levelsModal.addEventListener('click', (event) => {
            if (event.target === this.elements.levelsModal) {
                this.hideLevelsModal();
            }
        });

        this.elements.helpModal.addEventListener('click', (event) => {
            if (event.target === this.elements.helpModal) {
                this.hideHelpModal();
            }
        });
    }

    /**
     * 加载当前关卡
     */
    loadCurrentLevel() {
        const levelData = this.levelManager.getCurrentLevel();
        if (levelData) {
            this.initialMapData = JSON.parse(JSON.stringify(levelData));
            this.map.loadMap(levelData);
            this.map.render();
            this.stepCount = 0;
            this.updateUI();
        }
    }

    /**
     * 加载下一关
     */
    loadNextLevel() {
        const levelData = this.levelManager.getNextLevel();
        if (levelData) {
            this.initialMapData = JSON.parse(JSON.stringify(levelData));
            this.map.loadMap(levelData);
            this.map.render();
            this.stepCount = 0;
            this.updateUI();
        } else {
            alert('恭喜通关所有关卡！');
        }
    }

    /**
     * 重置当前关卡
     */
    resetLevel() {
        if (this.initialMapData) {
            this.map.reset(this.initialMapData);
            this.stepCount = 0;
            this.updateUI();
        }
    }

    /**
     * 加载指定关卡
     * @param {number} levelIndex - 关卡索引（从0开始）
     */
    loadLevel(levelIndex) {
        if (this.levelManager.setCurrentLevel(levelIndex)) {
            this.loadCurrentLevel();
            this.hideLevelsModal();
        }
    }

    /**
     * 玩家移动回调
     */
    onPlayerMove() {
        this.stepCount++;
        this.updateUI();
    }

    /**
     * 胜利回调
     */
    onWin() {
        // 保存通关进度
        const currentLevelNumber = this.levelManager.getCurrentLevelNumber();
        Storage.addCompletedLevel(currentLevelNumber);
        
        // 显示通关弹窗
        this.elements.finalSteps.textContent = this.stepCount;
        this.showWinModal();
    }

    /**
     * 更新UI界面
     */
    updateUI() {
        const currentLevel = this.levelManager.getCurrentLevelNumber();
        const totalLevels = this.levelManager.getTotalLevels();
        this.elements.levelInfo.textContent = `关卡：${currentLevel}/${totalLevels}`;
        this.elements.stepInfo.textContent = `步数：${this.stepCount}`;
        
        // 更新下一关按钮状态
        this.elements.btnNext.disabled = !this.levelManager.hasNextLevel();
    }

    /**
     * 显示通关弹窗
     */
    showWinModal() {
        this.elements.winModal.classList.remove('hidden');
    }

    /**
     * 隐藏通关弹窗
     */
    hideWinModal() {
        this.elements.winModal.classList.add('hidden');
    }

    /**
     * 显示关卡选择弹窗
     */
    showLevelsModal() {
        this.renderLevelsList();
        this.elements.levelsModal.classList.remove('hidden');
    }

    /**
     * 隐藏关卡选择弹窗
     */
    hideLevelsModal() {
        this.elements.levelsModal.classList.add('hidden');
    }

    /**
     * 显示操作说明弹窗
     */
    showHelpModal() {
        this.elements.helpModal.classList.remove('hidden');
    }

    /**
     * 隐藏操作说明弹窗
     */
    hideHelpModal() {
        this.elements.helpModal.classList.add('hidden');
    }

    /**
     * 渲染关卡列表
     */
    renderLevelsList() {
        const completedLevels = Storage.getCompletedLevels();
        const totalLevels = this.levelManager.getTotalLevels();
        const currentLevel = this.levelManager.getCurrentLevelNumber();
        
        // 清空列表
        this.elements.levelsList.innerHTML = '';
        
        // 渲染关卡项
        for (let i = 1; i <= totalLevels; i++) {
            const levelItem = document.createElement('div');
            levelItem.className = 'level-item';
            
            // 检查是否已通关
            if (completedLevels.includes(i)) {
                levelItem.classList.add('level-completed');
            }
            
            // 检查是否为当前关卡
            if (i === currentLevel) {
                levelItem.style.backgroundColor = '#42b883';
                levelItem.style.color = 'white';
            }
            
            // 设置关卡文本
            levelItem.textContent = i;
            
            // 添加点击事件
            levelItem.addEventListener('click', () => {
                this.loadLevel(i - 1); // 关卡索引从0开始
            });
            
            this.elements.levelsList.appendChild(levelItem);
        }
    }
}

// 游戏初始化
window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.init();
    
    // 暴露游戏实例到全局，方便调试
    window.game = game;
});