import Phaser from 'phaser';
import apiservice from './apiservice'

export default class extends Phaser.State{
    init(_choice, _score, _tries){
        this.flag = _choice
        this.score = _score
        this.lives = _tries
    }

    preload(){
        var mobs = ['despair','godleft','happy','marie'];

        if(this.flag == 'attack'){
            this.words = this.game.cache.getJSON('ataques');
        }
        else{
            this.words = this.game.cache.getJSON('curas');
        }
        
        var indice = this.game.rnd.integerInRange(0,3);
        let text = '../assets/images/'+mobs[indice]+'.png'
        
        game.load.image('mob', text)

    }

    create(){
        //Saber cuantas palabras hay en el json
        var counter = 0

        //variables de control para saber si se introduce bien la palabra
        this.correct = []
        this.indiceword = 0
        this.letras = []
        this.welldone = false
        
        this.puntaje = this.score

        for(var i = 0;i < this.words.length;i++)
        {
            counter = counter + 1
        }
        
        //se elige una palabra aleatoria de la lista json ya sea de 
        //categoria curativa o para atacar
        this.indice = this.game.rnd.integerInRange(0, counter-1)

        //Se inicializan las variables de control ya conociendo el indice de la
        //palabra a elegir
        for(var i = 0;i < this.words[this.indice].Palabra.length;i++)
        {
            //Correct tiene el tamaño de la palabra, sus posiciones 
            //tienen bools que validan la introduccion de las palabras
            this.correct[i] = false;
            //se agrega caracter por caracter de la palabra en letras
            this.letras[i] = this.words[this.indice].Palabra.charAt(i);
        }

        //background
        this.bg = this.game.add.tileSprite(0,0, this.game.width, this.game.height, 'sky');
        
        //enemy placeholder
        this.enemy = this.game.add.sprite(this.world.centerX, 0, 'mob');
        this.enemy.scale.setTo(0.5,0.5)
        
        //Temporizador, si no se introduce la palabra a tiempo cambia al menu
        this.game.time.events.add(Phaser.Timer.SECOND * 5,this.timeover,this)
        
        //intentos del jugador!
        var playerlife = this.add.text(this.game.width - 80, 10, 'Intentos: '+this.lives,{
            font: '40px Bangers',
            fill: '#77BFA3',
            align:'center'
        })
        playerlife.anchor.setTo(0.5)

        //Puntos del jugador!
        var puntos = this.add.text(this.game.width - 100, this.game.height - 50,'Puntos: '+ this.score,{
            font: '40px Bangers',
            fill: '#77BFA3',
            align:'center'
        })
        puntos.anchor.setTo(0.5)

        //verifica que tipo de palabra se eligio anteriormente
        if(this.flag == 'attack'){
            
            var wordtext = this.game.add.text(this.world.centerX - this.world.centerX / 2, this.world.centerY, this.words[this.indice].Palabra,{
                font: '40px Bangers',
                fill: '#960018',
                align:'center'
            });
            var text = this.game.add.text(0,0,this.flag,{
                font: '40px Bangers',
                fill: '#960018',
                align:'center'
            });
        }
        else{
            var wordtext = this.game.add.text(this.world.centerX - this.world.centerX / 2, this.world.centerY, this.words[this.indice].Palabra,{
                font: '40px Bangers',
                fill: '#77BFA3',
                align:'center'
            });
            var text = this.game.add.text(0,0,this.flag,{
                font: '40px Bangers',
                fill: '#77BFA3',
                align:'center'
            });
        }

        //Captura los caracteres introducidos en el teclado
        this.game.input.keyboard.addCallbacks(this,null,null,this.keyPress);
        
    }

    update(){
        var denied = true
        for(var i = 0;i < this.letras.length;i++)
        {
            if(this.correct[i] == false){
                denied = false
            }
        }

        if(denied == true){
            this.welldone = true
            var tweeni = this.game.add.tween(this.enemy).to({alpha: 0}, 300, Phaser.Easing.Linear.None, true);
            if(this.flag == 'attack'){
                this.score = this.score + 20   
            }
            else{
                if(this.lives < 3){
                    this.lives = this.lives + 1
                }
            }
            this._score = this.score
        }
    }

    //Debugging
    render(){
        this.game.debug.text(this.words.length,100,200)
        this.game.debug.text(this.words[this.indice].Palabra, 100, 100);
        this.game.debug.text("Tiempo: " + this.game.time.events.duration, 0,60);
        this.game.debug.text(this.score,200,200);
    }
    
    
    //actualiza palabra cuando se gana
    connectonwin(){
        var connect = new apiservice()
        connect.putPalabra(1,this.words[this.indice].Palabra)
    }
    
    //Cambia de estado si se acaba el tiempo
    timeover(){
        if(this.welldone == false){
            var connect = new apiservice()
            connect.putPalabra(0,this.words[this.indice].Palabra)
            this.lives = this.lives - 1
            this._score = this.score
            this.state.start('Inputw', true, false, this.lives, this._score)
        }
        this.connectonwin()
        this.state.start('Inputw',true,false, this.lives,this.score)
    }

    //verifica que este introducida la palabra
    keyPress(char){
        if(char == this.letras[this.indiceword]){
            this.correct[this.indiceword] = true;
            this.indiceword += 1
        }
        
    }
}