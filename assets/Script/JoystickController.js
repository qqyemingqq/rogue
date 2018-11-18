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
        player:{
            default:null,
            type:cc.Node,
        },
        radian:cc.Float,
        speed:cc.Integer,
        playerComponent:{
            default:null,
            type:cc.Component
        },
        playerAnimation:{
            default:null,
            type:cc.Animation
        },
        map:{
            default:null,
            type:cc.Node
        }

    },

    onLoad: function () {
        this._initTouchEvent();
        this.playerComponent = this.player.getComponent('PlayerController');
        this.playerAnimation = this.player.getComponent(cc.Animation);
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
        if(this.radian!=0){
            // console.log();
            if(!this.playerComponent.runStat().isPlaying){
                this.playerAnimation.play('player_run');
            }
            var x = Math.cos(this.radian) * this.speed*dt;
            var y = -Math.sin(this.radian) * this.speed*dt;
            // console.log(x);
            // console.log(y);
            this.map.x -=x;
            this.map.y -=y;
        }else{
            if(!this.playerComponent.idleStat().isPlaying){
                this.playerAnimation.play('player_idle');
            }
        }
    },
    _allDirectionsMove: function () {
    },

    _getDistance: function (pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) +
            Math.pow(pos1.y - pos2.y, 2));
    },

    _getRadian: function (point) {
        // this.radian = Math.PI / 180 * this._getAngle(point);
        this.radian = cc.v2(point).signAngle(cc.Vec2.RIGHT);
        return this.radian;
    },
    _getJoyStickRadian:function(){

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
        if(posX<=0){
            this.player.scaleX = -1
        }else{
            this.player.scaleX = 1
        }
        // console.log(posX,posY);
        if (radius > distance) {
            this.node.setPosition(cc.v2(posX, posY));
            this._getRadian(cc.v2(posX, posY));
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
        // this._speed = 0;
        this.radian= 0;
    },
});
