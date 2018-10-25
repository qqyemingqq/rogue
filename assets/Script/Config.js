cc.Class({
    extends: cc.Component,

    properties: {
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        cc.view.enableAntiAlias(false);
    },

    // called every frame
    update: function (dt) {

    },
});
