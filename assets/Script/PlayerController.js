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
        animation: null
    },


    onLoad() {
        this.animation = this.getComponent(cc.Animation);
        // this.animation.play('player_idle');
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
