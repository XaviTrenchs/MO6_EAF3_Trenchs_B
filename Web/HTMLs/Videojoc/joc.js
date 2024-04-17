var config = {
    type:Phaser.AUTO,
    scale:{
        mode:Phaser.Scale.FIT, // escalat automatic
        autoCenter:Phaser.Scale.CENTER_BOTH, //centrat
        width:800,
        height:600,
    },
    physucs:{
        default:"arcade",
        arcade:{
            gravity:{ y : 800 },
            debug: false
        }
    },

   

}
var game = new Phaser.Game(config)