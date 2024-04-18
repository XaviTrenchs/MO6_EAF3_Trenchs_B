class pantalla1 extends Phaser.Scene {

    constructor() {
        super("nivell1");// mom de l'escena
    }

    preload() {

        this.load.image("Fondo", ".//assets/Cartoon_Forest_BG_04.png");//marquem ruta al fons
        this.load.image("plataformas", ".//assets/plataforma.png");//marquem ruta al asset
        this.load.spritesheet("jugador", ".//assets/GraveRobber_walk.png", { frameWidth: 48, frameHeight: 48 });//marquem ruta al jugador i acotem
    }
    create() {

        //animacions

        this.anims.create({
            key: "idle",//nom de l'animació
            frames: this.anims.generateFrameNumbers("jugador", { stard: 0, end: 1 }),// fotogrames que implica
            frameRate: 2,//velocitat
            repeat: -1,//repeticions (-1vol dir infinitament)
        })
            this.anims.create({
                key: "caminar",
                frames: this.anims.generateFrameNumbers("jugador", { stard: 1, end: 5 }),
                frameRate: 10,
                repeat: -1,
            })
            //fons
             var fondo = this.add.image(960, 540, "Fondo");//crear i posicionar el fons

            //Grups plataformes
            plataformas=this.physics.add.staticGroup();
            plataformas.create(200, 500, "plataformas").setScale(4).setSize(50, 50).setOffset(-20, -20);//fills de plataforma escalats i amb la caixa escalada i colocada
            plataformas.create(150, 500, "plataformas").setScale(4).setSize(50, 50).setOffset(-20, -20);//fills de plataforma
            plataformas.create(250, 500, "plataformas").setScale(4).setSize(50, 50).setOffset(-20, -20);//fills de plataforma
            plataformas.create(100, 500, "plataformas").setScale(4).setSize(50, 50).setOffset(-20, -20);//fills de plataforma

            plataformas.create(1000, 800, "plataformas").setScale(4).setSize(50, 50).setOffset(-20, -20);//fills de plataforma
            plataformas.create(1100, 800, "plataformas").setScale(4).setSize(50, 50).setOffset(-20, -20);//fills de plataforma
            plataformas.create(1050, 800, "plataformas").setScale(4).setSize(50, 50).setOffset(-20, -20);//fills de plataforma
            plataformas.create(1150, 800, "plataformas").setScale(4).setSize(50, 50).setOffset(-20, -20);//fills de plataforma

            plataformas.create(960, 1000, "plataformas").setScale(200, 4).setSize(1920, 50).setOffset(-960, -20);//fills de plataforma

            //jugador
            jugador = this.physics.add.sprite(1100, 500, "jugador");//afegim el jugador a la escena
            jugador.setScale(5);                                  // escalem el jugador
            jugador.setSize(22, 35);                               // escalem la caixa del personatje
            jugador.setOffset(7, 14);                              //recoloquem la caixa
            jugador.setCollideWorldBounds(true);                  // fem que choqui amb el fons de la pantalla

            //teclas
            cursors = this.input.keyboard.createCursorKeys();// li indiquem que farem sevir tecles

            //colisions

            this.physics.add.collider(plataformas, jugador); //per detectar colisions


        }

    update() {

            //control del jugador

            if(cursors.right.isDown) {
            jugador.setVelocityX(200); //si prems dreta el personatge va dreta
            jugador.anims.play("caminar",true);
            if(jugador.flipX==true){jugador.x=jugador.x+60};
            jugador.flipX=false;
            
            jugador.setOffset(7, 14);
        }
            else if (cursors.left.isDown) { 
            jugador.setVelocityX(-200); //si prems esquerra el personatge va esquerra
            jugador.anims.play("caminar",true);
            if(jugador.flipX==false){jugador.x=jugador.x-60};
            jugador.flipX=true;// inverteix eix X
            jugador.setOffset(20,14);
        }
        else { 
            jugador.setVelocityX(0); //si no prems res no es mou
            jugador.anims.play("idle",true);
        }
                
                

            
        
        
        if (cursors.up.isDown && jugador.body.touching.down) { //si premem adalt el jugador salta amb una força de 600
            jugador.setVelocityY(-600);
        }


    }
}