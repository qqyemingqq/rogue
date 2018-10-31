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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        animation: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.animation = this.getComponent(cc.Animation);
        var stat;
        // this.animation.play('player_idle');
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            switch (event.keyCode) {
                case cc.macro.KEY.w:
                    break;
                case cc.macro.KEY.a:
                    console.log(event);
                    if (event.isPressed) {
                        if (!this.runStat().isPlaying) {
                            this.animation.play('player_run');
                        }
                        // stat = this.animation.play('player_run');
                        // stat.on('stop', (e) => {
                        //     console.log('stoped');
                        //     this.animation.play();
                        //     stat.off('stop')
                        // }, this);
                    } else {
                        this.animation.play();
                    }
                    break;
                case cc.macro.KEY.d:
                    break;
                case cc.macro.KEY.s:
                    break;
                case cc.macro.KEY.space:
                    if (!this.rollStat().isPlaying) {
                        stat = this.animation.play('player_roll');
                        stat.on('stop', (e) => {
                            console.log('stoped');
                            this.animation.play();
                            stat.off('stop')
                        }, this);
                    }
                    break;
                default:
                    break;
            }
        }, this);
    },

    start() {
    },

    update(dt) {
    },
    rollStat() {
        return this.animation.getAnimationState('player_roll');
    },
    runStat() {
        return this.animation.getAnimationState('player_run');
    },
    idleStat() {
        return this.animation.getAnimationState('player_idle');
    },
    deadStat() {
        return this.animation.getAnimationState('player_dead');
    }
});
