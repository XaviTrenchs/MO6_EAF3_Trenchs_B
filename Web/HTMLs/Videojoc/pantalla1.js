class pantalla1 extends Phaser.Scene {

    constructor() {
        super("nivell1");// mom de l'escena
    }

    preload(){
        this.load.image("Fondo"," .//assets/Cartoon_Forest_BG_04.png");// indiquem a Phaser la ruta de la imatge
    }
    create (){
        var fondo= this.add.image(960,540,"Fondo");

    }

    update (){

    }
}