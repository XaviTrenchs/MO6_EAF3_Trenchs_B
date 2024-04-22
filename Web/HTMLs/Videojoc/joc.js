var config = {
    type:Phaser.AUTO,
    scale:{
        mode:Phaser.Scale.FIT, // escalat automatic
        autoCenter:Phaser.Scale.CENTER_BOTH, //centrat
        width:1920,
        height:1080,
    },
    physics:{
        default:"arcade",
        arcade:{
            gravity:{ y : 800 },
            debug: true //veure o no les caixe de colisions
        }
    },

   scene:[pantalla1]

}
var game = new Phaser.Game(config)
var cursors;
var jugador;
var plataformas;
var moneder;
var txtPunts;
var txtPuntsFinals;
var puntuacio;
var enemics;
var soSalt;
var soMoneda;
var botoReiniciar;
var finestraOver;
var gameOver;