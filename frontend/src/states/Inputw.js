import Phaser from 'phaser';
import {centerGameObjects} from '../utils'
import { Game } from 'phaser-ce';



export default class extends Phaser.State{
    init(_vidas,_score){
        this.puntaje = _score
        this.misvidas = _vidas
    }

    preload(){
        this.load.image('mushroom1', 'assets/images/mushroom2.png')
        this.load.image('mushroom2', 'assets/images/mushroom2.png')
    }

    create() {
        this.changedammit = false;
        this._choice = '';
        this._tries = this.misvidas;
        
        this.bg = this.game.add.tileSprite(0,0, this.game.width, this.game.height, 'sky');
        var puntos = this.add.text(this.game.width - 100, this.game.height - 50,'Puntos: '+ this.puntaje,{
            font: '40px Bangers',
            fill: '#77BFA3',
            align:'center'
        })
        puntos.anchor.setTo(0.5)

        var text = this.add.text(this.world.centerX, this.world.centerY, 'Que Haras?',{
            font: '40px Bangers',
            fill: '#77BFA3',
            align:'center'
        })
        text.anchor.setTo(0.5)

        var playerlife = this.add.text(this.game.width - 80, 10, 'Intentos: '+ this.misvidas,{
            font: '40px Bangers',
            fill: '#77BFA3',
            align:'center'
        })
        playerlife.anchor.setTo(0.5)

        var buttonA = this.game.add.sprite(this.world.centerX / 2, this.world.centerY + this.world.centerY/2, 'mushroom1');
        var variableA = 'attack';
        buttonA.inputEnabled = true;
        buttonA.events.onInputDown.add(this.check,this);
        
        var buttonB = this.game.add.sprite(this.world.centerX + (this.world.centerX / 2), this.world.centerY + this.world.centerY/2, 'mushroom2');
        var variableB = 'heal';
        buttonB.inputEnabled = true;
        buttonB.events.onInputDown.add(this.check, this);
    }

    

    check(button) {
        if(button.key == 'mushroom1'){
            this._choice = 'attack'
            
        }
        else{
            if(button.key == 'mushroom2'){
                this._choice = 'heal'
                
            }
        }
        this.changedammit = true;
    }
    
    update(){
        if(this.changedammit == true){
            this._tries = this.misvidas
            this._score = this.puntaje
            this.state.start('introducing', true, false, this._choice, this._score,this._tries)
        }
        if(this.misvidas == 0)
        {
            this.state.start('gameover',true,false)
        }
    }
    
}
