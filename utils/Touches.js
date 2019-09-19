
class Touches {
    constructor() {

    }
  
    _getMoveX(e, startX) {  // 获取滑动过程中滑动的距离
        return this.getClientX(e) - startX
    }

    _getEndX(e, startX) {  // 获取滑动结束滑动的距离
        let touch = e.changedTouches
        if (touch.length === 1) {
            return touch[0].clientX - startX
        }
    }

    getClientX(e) {  // 获取滑动的横坐标
        let touch = e.touches
        if (touch.length === 1) {
            return touch[0].clientX
        }
    }

    touchM(e, item, startX) {  // touchmove 过程中更新列表数据
        item.left = this._getMoveX(e, startX)
    }

    touchE(e, item, startX, width) {  // touchend 更新列表数据
        let disX = this._getEndX(e, startX)
        if (disX < 0) {  // 判断滑动方向， （向左滑动）
            // 滑动的距离大于删除宽度的一半就显示操作列表 否则不显示
            Math.abs(disX) > width / 3 ? item.left = -width : item.left = 0
        } else {  // 向右滑动复位
            item.left = 0
        }
    }
}

export default new Touches()