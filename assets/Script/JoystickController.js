// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        joystickBg: {
            default: null,        // The default value will be used only when the component attaching
            type: cc.Sprite, // optional, default is typeof default
        },
        joystick: {
            default: null,        // The default value will be used only when the component attaching
            type: cc.Sprite, // optional, default is typeof default
        },
        zVec: cc.Vec2.ZERO,
    },

    onLoad: function () {
        this._initTouchEvent();
    },


    //对圆圈的触摸监听
    _initTouchEvent: function () {
        var self = this;
        self.node.on(cc.Node.EventType.TOUCH_START, this._touchStartEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_MOVE, this._touchMoveEvent, self);
        // 触摸在圆圈内离开或在圆圈外离开后，摇杆归位，player速度为0
        self.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, self);
    },

    //更新移动目标
    update: function (dt) {
    },
    //全方向移动
    _allDirectionsMove: function () {
    },

    //计算两点间的距离并返回
    _getDistance: function (pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) +
            Math.pow(pos1.y - pos2.y, 2));
    },

    /*角度/弧度转换
    角度 = 弧度 * 180 / Math.PI
    弧度 = 角度 * Math.PI / 180*/
    //计算弧度并返回
    _getRadian: function (point) {
        this._radian = Math.PI / 180 * this._getAngle(point);
        return this._radian;
    },

    //计算角度并返回
    _getAngle: function (point) {
        var pos = this.node.getPosition();
        this._angle = Math.atan2(point.y - pos.y, point.x - pos.x) * (180 / Math.PI);
        return this._angle;
    },

    //设置实际速度
    _setSpeed: function (point) {
        //触摸点和遥控杆中心的距离
        var distance = this._getDistance(point, this.node.getPosition());

        //如果半径
        if (distance < this._radius) {
            this._speed = this._speed1;
        } else {
            this._speed = this._speed2;
        }
    },

    _touchStartEvent: function (event) {
        // 获取触摸位置的世界坐标转换成圆圈的相对坐标（以圆圈的锚点为基准）
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        //触摸点与圆圈中心的距离
        var distance = this._getDistance(touchPos, cc.v2(0, 0));
        //圆圈半径
        var radius = this.node.width / 2;
        // 记录摇杆位置，给touch move使用
        this._stickPos = touchPos;
        var posX = touchPos.x;
        var posY = touchPos.y;
        //手指在圆圈内触摸,控杆跟随触摸点
        if (radius > distance) {
            event.target.setPosition(cc.v2(posX, posY));
            return true;
        }
        return false;
    },

    _touchMoveEvent: function (event) {
        console.log(this.node);
        var touchPos = this.node.getParent().convertToNodeSpaceAR(event.getLocation());
        var distance = this._getDistance(touchPos, cc.v2(0, 0));
        var radius = this.node.getParent().width / 2;
        // 由于摇杆的postion是以父节点为锚点，joystick(stickX,stickY)
        var posX = touchPos.x;
        var posY = touchPos.y;
        if (radius > distance) {
            event.target.setPosition(cc.v2(posX, posY));
        } else {
            //控杆永远保持在圈内，并在圈内跟随触摸更新角度
            var x = Math.cos(this._getRadian(cc.v2(posX, posY))) * radius;
            var y = Math.sin(this._getRadian(cc.v2(posX, posY))) * radius;
            event.target.setPosition(cc.v2(x, y));
        }
        //更新角度
        this._getAngle(cc.v2(posX, posY));
        //设置实际速度
        this._setSpeed(cc.v2(posX, posY));

    },

    _touchEndEvent: function (event) {
        event.target.setPosition(0, 0);
        this._speed = 0;
    },
});
