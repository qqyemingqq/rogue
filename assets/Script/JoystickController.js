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
        self.node.on(cc.Node.EventType.TOUCH_END, this._touchEndEvent, self);
        self.node.on(cc.Node.EventType.TOUCH_CANCEL, this._touchEndEvent, self);
    },

    update: function (dt) {
    },
    _allDirectionsMove: function () {
    },

    _getDistance: function (pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) +
            Math.pow(pos1.y - pos2.y, 2));
    },

    _getRadian: function (point) {
        // this._radian = Math.PI / 180 * this._getAngle(point);
        this._radian = cc.v2(point).signAngle(cc.Vec2.RIGHT);
        return this._radian;
    },

    _getAngle: function (point) {
        var pos = this.node.getPosition();
        this._angle = Math.atan2(point.y - pos.y, point.x - pos.x) * (180 / Math.PI);
        return this._angle;
    },

    _setSpeed: function (point) {
    },

    _touchStartEvent: function (event) {
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        var distance = this._getDistance(touchPos, cc.v2(0, 0));
        var radius = this.node.width / 2;
        this._stickPos = touchPos;
        var posX = touchPos.x;
        var posY = touchPos.y;
        if (radius > distance) {
            event.target.setPosition(cc.v2(posX, posY));
            return true;
        }
        return false;
    },

    _touchMoveEvent: function (event) {
        var touchPos = this.node.parent.convertToNodeSpaceAR(event.getLocation());
        var distance = this._getDistance(touchPos, cc.v2(0, 0));
        var radius = this.node.parent.width / 2;
        var posX = touchPos.x;
        var posY = touchPos.y;
        if (radius > distance) {
            this.node.setPosition(cc.v2(posX, posY));
        } else {
            var x = Math.cos(this._getRadian(cc.v2(posX, posY))) * radius;
            var y = -Math.sin(this._getRadian(cc.v2(posX, posY))) * radius;
            this.node.setPosition(cc.v2(x, y));
        }
        // this._getAngle(cc.v2(posX, posY));
        // this._setSpeed(cc.v2(posX, posY));

    },

    _touchEndEvent: function (event) {
        event.target.setPosition(0, 0);
        this._speed = 0;
    },
});
