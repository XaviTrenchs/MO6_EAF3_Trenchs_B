class pantalla1 extends Phaser.Scene {

    constructor() {
        super("nivell1p");// mom de l'escena
    }

    preload() {

        this.load.image("Fondo", ".//assets/fons_steam.png");//marquem ruta al fons
        this.load.image("plataformas", ".//assets/sprites/plataforma.png");//marquem ruta al asset
        this.load.spritesheet("jugador", ".//assets/Araku_poses.png", { frameWidth: 200, frameHeight: 200 });//marquem ruta al jugador i acotem
        this.load.image("moneda", ".//assets/monedes.png");//carreguem i definim nom dels sacs de monedes
        this.load.spritesheet("enemic", ".//assets/Malo_walk.png", { frameWidth: 48, frameHeight: 48 });//carreguem i definim nom dels enemics
        this.load.audio("salt", ".//audio/JEWS HArp 3.mp3");
        this.load.audio("pick", ".//audio/PICK UP.mp3");
        this.load.audio("ambient", ".//audio/Densities.mp3");
        this.load.image("botoRetry", ".//assets/Reintentar.png");//carreguem i definim botó reiniciar
        this.load.image("Final", ".//assets/GameOver.png");//carreguem i definim pantalla Game Over
        this.load.image("Disparo", ".//assets/bala.png");



    }
    create() {

        {class  Dis}

        gameOver = false;

        


        //audios
        soAmbient = this.sound.add("ambient");
        soMoneda = this.sound.add("pick");
        soSalt = this.sound.add("salt");
        soAmbient.play();


        //fons
        var fondo = this.add.image(960, 540, "Fondo");//crear i posicionar el fons




        //marcador
        txtPunts = this.add.text(100, 50, "Puntuacio: 0", { font: "60px Impact", fill: "#ffffff" }); //creacio del marcador
        puntuacio = 0;  //inicia la variable punts a zero

        //enemics

        enemics = this.physics.add.group({   //creem les boses de monedes
            key: "enemic",//nom de la referencia del preload
            repeat: 2,//quantitat
            setScale: { x: 5, y: 5 },//ajustem mida
            setXY: { x: 100, y: 50, stepX: 1200 } //diem a on i amb quina freqüència

        })

        enemics.children.iterate(function (enemic) {
            enemic.setSize(22, 40);
            enemic.setOffset(5, 8);
            enemic.setBounce(1);
            enemic.setVelocityX(30);
            enemic.setCollideWorldBounds()

        })


        //animacions

        this.anims.create({
            key: "idle",//nom de l'animació
            frames: this.anims.generateFrameNumbers("jugador", { stard: 0, end: 1 }),// fotogrames que implica
            frameRate: 2,//velocitat
            repeat: -1,//repeticions (-1vol dir infinitament)
        })
        this.anims.create({
            key: "caminar",
            frames: this.anims.generateFrameNumbers("jugador", { stard: 2, end: 9 }),
            frameRate: 10,//velocitat de fotograma
            repeat: -1,
        })



        /// moneder

        moneder = this.physics.add.group({   //creem les boses de monedes
            key: "moneda",//nom de la referencia del preload
            repeat: 9,//quantitat
            setScale: { x: 0.4, y: 0.4 },//ajustem mida
            setXY: { x: 100, y: 50, stepX: 200 } //diem a on i amb quina freqüència

        });
        ////ordres a tots els fills del grup moneder

        moneder.children.iterate(function (monedas) {
            monedas.setBounce(0.2)//diem que rebotin
        });




        //Grups plataformes
        plataformas = this.physics.add.staticGroup();
        plataformas.create(200, 500, "plataformas").setScale(1).setSize(200, 25);//fills de plataforma escalats i amb la caixa escalada i colocada

        plataformas.create(300, 600, "plataformas").setScale(1).setSize(200, 25);//fills de plataforma escalats i amb la caixa escalada i colocada

        plataformas.create(600, 750, "plataformas").setScale(1).setSize(200, 25);//fills de plataforma escalats i amb la caixa escalada i colocada

        plataformas.create(1000, 800, "plataformas").setScale(1).setSize(200, 25);//fills de plataforma

        plataformas.create(700, 400, "plataformas").setScale(1).setSize(200, 25);//fills de plataforma

        plataformas.create(1500, 800, "plataformas").setScale(1).setSize(200, 25);//fills de plataforma

        plataformas.create(960, 1000, "plataformas").setScale(20, 1).setSize(1920, 25).setOffset(-960, 0);//fills de plataforma

        //jugador
        jugador = this.physics.add.sprite(1100, 500, "jugador");//afegim el jugador a la escena
        jugador.setScale(1);                                  // escalem el jugador
        jugador.setSize(80, 150);                               // escalem la caixa del personatje
        jugador.setOffset(60, 40);                              //recoloquem la caixa
        jugador.setCollideWorldBounds(true);                  // fem que choqui amb el fons de la pantalla

        //teclas
        cursors = this.input.keyboard.createCursorKeys();// li indiquem que farem sevir tecles


        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



        //botons

        finestraOver = this.add.image(920, 540, "Final");
        finestraOver.setScale(1.3);
        finestraOver.setVisible(false);//amaguem

        botoReiniciar = this.add.image(920, 740, "botoRetry");
        botoReiniciar.setVisible(false);//amaguem
        botoReiniciar.on("pointerdown", () => this.scene.restart());//botó reiniciar reinicia

        txtPuntsFinals = this.add.text(730, 300, "Aconseguit 0", { font: "70px Impact", fill: "#ffffff" });
        txtPuntsFinals.setVisible(false);


        //colisions

        this.physics.add.collider(plataformas, jugador); //per crear colisions
        this.physics.add.collider(plataformas, moneder);
        this.physics.add.overlap(jugador, moneder, this.destruirMonedes, null, this);
        this.physics.add.collider(plataformas, enemics);
        this.physics.add.collider(enemics, enemics);
        this.physics.add.overlap(jugador, enemics, this.gameOver, null, this,);





    }

    update() {

         //control del jugador

        if (gameOver == false) {



            if (cursors.right.isDown) {
                jugador.setVelocityX(200); //si prems dreta el personatge va dreta
                jugador.anims.play("caminar", true);
                if (jugador.flipX == true) { jugador.x = jugador.x + 60 };
                jugador.flipX = false;


                jugador.setOffset(60, 40);
            }
            else if (cursors.left.isDown) {
                jugador.setVelocityX(-200); //si prems esquerra el personatge va esquerra
                jugador.anims.play("caminar", true);
                if (jugador.flipX == false) { jugador.x = jugador.x - 60 };
                jugador.flipX = true;// inverteix eix X
                jugador.setOffset(60, 40);
            }
            else {
                jugador.setVelocityX(0); //si no prems res no es mou
                jugador.anims.play("idle", true);
            }

            if (cursors.up.isDown && jugador.body.touching.down) { //si premem adalt sense tocar terra el jugador salta amb una força de 600
                jugador.setVelocityY(-600);
                soSalt.play()
            }





        }


    }




/// aquesta funció es crida quan se superposen el jugador i la moneda
destruirMonedes(jugador, sac) {

    //moneder.destroy() //destrueix monedes
    sac.disableBody(true, true);//desactiva les monedes
    puntuacio = puntuacio + 10; ///suma 10 punts
    console.log(puntuacio);//si monedas a zero torna a crear 10 monedes
    txtPunts.setText("Puntuació:" + puntuacio);
    soMoneda.play();

    if (moneder.countActive() === 0) {

        moneder.children.iterate(function (monedas) {
            monedas.enableBody(true, monedas.x, 10, true, true)

        });
    }
}

gameOver() {

    gameOver = true
    jugador.setTint(0xff0000);
    this.physics.pause();
    finestraOver.setVisible(true)//el fem apareixer
    botoReiniciar.setVisible(true)
    botoReiniciar.setInteractive() //convertim la imatge en boto interactiu
    txtPuntsFinals.setVisible(true); //puntsFinals visible
    txtPuntsFinals.setText("Aconseguit: " + puntuacio) //actualitzar el text de puntFinals


}


}