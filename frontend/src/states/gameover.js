import Phaser from 'phaser';
import {centerGameObjects} from '../utils'
import { Game } from 'phaser-ce';



export default class extends Phaser.State{
    init(){
    }

    preload(){
        this.load.image('HAH', 'assets/images/marie.png')
    }

    create() {
        this.enemy = this.game.add.sprite(this.world.centerX, this.world.centerY, 'HAH');
        this.enemy.scale.setTo(0.5,0.5)
        
        var gameover = this.add.text(this.world.centerX, 50, 'Well you ded son',{
            font: '40px Bangers',
            fill: '#77BFA3',
            align:'center'
        })
        gameover.anchor.setTo(0.5)

        var buttonA = this.game.add.sprite(this.world.centerX / 2, this.world.centerY + this.world.centerY/2, 'mushroom1');
        var variableA = 'attack';
        buttonA.inputEnabled = true;
        buttonA.events.onInputDown.add(this.check,this);
    }

    check(button){
        this.reset = true
    }
    
    update(){
        if(this.reset == true){
            this.state.start('Game',true,false)
        }
    }

}