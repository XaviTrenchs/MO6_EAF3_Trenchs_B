var config = {
    type:Phaser.AUTO,
    scale:{
        mode:Phaser.Scale.FIT, // escalat automatic
        autoCenter:Phaser.Scale.CENTER_BOTH, //centrat
        width:1920,
        height:1080,
    },
    physucs:{
        default:"arcade",
        arcade:{
            gravity:{ y : 800 },
            debug: false
        }
    },

   scene:[pantalla1]

}
var game = new Phaser.Game(config)