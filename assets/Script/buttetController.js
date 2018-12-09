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
        radian: {
            default: 0,
            type: cc.Float
        },
        angle: {
            default: 0,
            type: cc.Float
        },
        weapon: {
            default: null,
            type: cc.Node
        },
        player: {
            default: null,
            type: cc.Node
        }

    },

    onLoad: function () {
        this.node.parent.x = cc.winSize.width -150;
        this.node.parent.y = 150;
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
        if (this.radian != 0) {
            this.angle >= 90 || this.angle <= -90 ? this.weapon.scaleY=-1 : this.weapon.scaleY=1;
            // this.angle > 0?this.weapon.setLocalZOrder(-1):this.weapon.setLocalZOrder(1);
            this.weapon.setRotation(-this.angle);
        }
    },
    _allDirectionsMove: function () {
    },

    _getDistance: function (pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) +
            Math.pow(pos1.y - pos2.y, 2));
    },

    _getRadian: function (point) {
        this.radian = cc.v2(point).signAngle(cc.Vec2.RIGHT);
        return this.radian;
    },
    _getJoyStickRadian: function () {

    },
    _radianToAngle: function (radian) {
        return 180 / Math.PI + radian;
    },

    _getAngle: function (point) {
        // var pos = this.node.getPosition();
        this.angle = Math.atan2(point.y, point.x) * (180 / Math.PI);
        return this.angle;
    },

    _setSpeed: function (point) {
    },

    _touchStartEvent: function (event) {
        var touchPos = this.node.convertToNodeSpaceAR(event.getLocation());
        var distance = this._getDistance(touchPos, cc.v2(0, 0));
        var radius = this.node.width / 2;
        var posX = touchPos.x;
        var posY = touchPos.y;
        // this._getAngle(cc.v2(posX, posY));

        if (radius > distance) {
            event.target.setPosition(cc.v2(posX, posY));
            return true;
        }
        return false;
    },

    _touchMoveEvent: function (event) {
        var touchPos = this.node.parent.convertToNodeSpaceAR(event.getLocation());

        var distance = this._getDistance(touchPos, cc.v2(0, 0));
        var radius = this.node.parent.width / 2 - this.node.width / 2;
        var posX = touchPos.x;
        var posY = touchPos.y;
        if (posX <= 0) {
            this.player.scaleX = -1
        } else {
            this.player.scaleX = 1
        }
        if (radius > distance) {
            this.node.setPosition(cc.v2(posX, posY));
            this._getRadian(cc.v2(posX, posY));
        } else {
            var x = Math.cos(this._getRadian(cc.v2(posX, posY))) * radius;
            var y = Math.sin(this._getRadian(cc.v2(posX, posY))) * radius;
            this.node.setPosition(cc.v2(x, y));
        }
        this._getAngle(cc.v2(posX, posY));

    },

    _touchEndEvent: function (event) {
        event.target.setPosition(0, 0);
        this.radian = 0;
    },
});
