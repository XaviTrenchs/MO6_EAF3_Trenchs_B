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
        this.load.audio("Balazo", ".//audio/Balazo.mp3");
        this.load.image("botoRetry", ".//assets/Reintentar.png");//carreguem i definim botó reiniciar
        this.load.image("Final", ".//assets/GameOver.png");//carreguem i definim pantalla Game Over
        this.load.image("Disparo", ".//assets/bala.png");



    }
    create() {

        gameOver = false;

        //audios
        soAmbient = this.sound.add("ambient");
        soMoneda = this.sound.add("pick");
        soSalt = this.sound.add("salt");
        soBala = this.sound.add("Balazo");
        soAmbient.play();

        //tiroteo

        this.input.keyboard.on('keydown-SPACE', this.disparar, this);// indicar la tecla usada per disparar


        //fons
        var fondo = this.add.image(960, 540, "Fondo");//crear i posicionar el fons


        //marcador
        txtPunts = this.add.text(100, 50, "Puntuacio: 0", { font: "60px Impact", fill: "#ffffff" }); //creacio del marcador
        puntuacio = 0;  //inicia la variable punts a zero

        //enemics

        enemics = this.physics.add.group({   //creem les boses de monedes
            key: "enemic",//nom de la referencia del preload
            repeat: 2,//quantitat de repeticions
            setScale: { x: 4, y: 4 },//ajustem mida
            setXY: { x: 100, y: 50, stepX: 1200 } //diem a on i amb quina freqüència

        })

        enemics.children.iterate(function (enemic) {
            enemic.setSize(22, 38); //mida de la caixa
            enemic.setOffset(5, 10); //offset de la caixa
            enemic.setBounce(1);//rebot
            enemic.setVelocityX(30);//velocitat
            enemic.setCollideWorldBounds()// chocan amb els limits

        })


        //animacions

        this.anims.create({ //creem animacions
            key: "idle",//nom de l'animació
            frames: this.anims.generateFrameNumbers("jugador", { stard: 0, end: 1 }),// fotogrames que implica del spritesheet
            frameRate: 2,//velocitat
            repeat: -1,//repeticions (-1 vol dir infinitament)
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
        plataformas.create(960, 1000, "plataformas").setScale(20, 1).setSize(1920, 25).setOffset(-960, 0);//plataforma escalada que fa de terra

        //jugador
        jugador = this.physics.add.sprite(1100, 500, "jugador");//afegim el jugador a la escena
        jugador.setScale(1);                                  // escalem el jugador
        jugador.setSize(80, 150);                               // escalem la caixa del personatje
        jugador.setOffset(60, 40);                              //recoloquem la caixa
        jugador.setCollideWorldBounds(true);                  // fem que choqui amb el fons de la pantalla

        //teclas
        cursors = this.input.keyboard.createCursorKeys();// li indiquem que farem sevir tecles



        //botons

        finestraOver = this.add.image(920, 540, "Final"); //finestra GAmeOver que de moment resta invisible
        finestraOver.setScale(1.3);
        finestraOver.setVisible(false);//amaguem

        botoReiniciar = this.add.image(920, 740, "botoRetry");//botó reintentar amagat fins a GameOver
        botoReiniciar.setVisible(false);//amaguem
        botoReiniciar.on("pointerdown", () => this.scene.restart());//botó reiniciar que reinicia l'escena

        txtPuntsFinals = this.add.text(730, 300, "Aconseguit 0", { font: "70px Impact", fill: "#ffffff" });//text amb els punts finals
        txtPuntsFinals.setVisible(false);


        //colisions

        this.physics.add.collider(plataformas, jugador); //per crear colisions entre dos variables
        this.physics.add.collider(plataformas, moneder);
        this.physics.add.overlap(jugador, moneder, this.destruirMonedes, null, this);//colisions
        this.physics.add.collider(plataformas, enemics);
        this.physics.add.collider(enemics, enemics);
        this.physics.add.overlap(jugador, enemics, this.gameOver, null, this,);
        this.physics.add.overlap(enemics, disparos, this.destruirEnemic, null, this);//pretenia destruir enemics en col.lidir amb la bala però no funciona





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

    destruirEnemic(disparos, enemics) {// volia definir una funció per fer desapareixer els enemics, suposso que a la Uf6
        enemics.disableBody(true, true);
    }
    /// aquesta funció es crida quan se superposen el jugador i la moneda
    destruirMonedes(jugador, sac) {


        sac.disableBody(true, true);//desactiva la bossa de monedes
        puntuacio = puntuacio + 10; ///suma 10 punts
        console.log(puntuacio);//si monedas a zero torna a crear 10 monedes
        txtPunts.setText("Puntuació:" + puntuacio);//s'actualitza la puntuació
        soMoneda.play();


    }
    disparar() {
        let speed = 400; //direcció i força de la bala
        if (jugador.flipX == true) { // aquesta condició la creem per a que el personatge dispari en la direcció que està mirant
            speed *= -1; //això dona la direcció de la bala

        }

        disparos = this.physics.add.image(jugador.x, jugador.y, "Disparo"); // la bala es crea te origen al jugador
        disparos.body.setAllowGravity(false); //treiem gravetat per que no caigui la bala
        disparos.setVelocityX(speed); //definim speed com a velocitat en X
        disparos.setSize(30, 30); //ajustar la caixa
        disparos.setScale(1);// per fer proves he tocat la mida; al principi no el veia perque es generava al origen
        soBala.play();//el so del disparo
    }


    gameOver() {

        gameOver = true//quan es dona Game Over
        jugador.setTint(0xff0000);//teñim al jugador
        this.physics.pause();//pausem el joc
        finestraOver.setVisible(true)// fem apareixer la finestra GAME OVER
        botoReiniciar.setVisible(true)//fem apareixer el botó reiniciar
        botoReiniciar.setInteractive() //convertim la imatge en boto interactiu
        txtPuntsFinals.setVisible(true); //puntsFinals visible
        txtPuntsFinals.setText("Aconseguit: " + puntuacio) //actualitzar el text de puntsFinals


    }


}