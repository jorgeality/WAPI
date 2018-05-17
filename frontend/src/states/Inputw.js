import Phaser from 'phaser';
import {centerGameObjects} from '../utils'
import apiservice from './apiservice'


export default class extends Phaser.State{
    init(){}
    preload(){
        
    }

    create() {

        var text = this.add.text(this.world.centerX, this.world.centerY,'WORK DAMMIT',{
            font: '40px Bangers',
            fill: '#77BFA3',
            align:'center'
        })
        text.anchor.setTo(0.5)

        this.makebutton('attack', this.world.centerX / 2, this.world.centerY + this.world.centerY/2);
        this.makebutton('heal', this.world.centerX + (this.world.centerX / 2), this.world.centerY + this.world.centerY/2);
    
    }

    makebutton (name, x, y){
        var button = game.add.button(x,y, 'mushroom', this.click, this, 2,1,0);
        button.name = name;
        button.scale.set(1, 1);
        button.smoothed = false;
        if(button.name == 'attack'){
            this.ataquetext = game.add.text(button.centerX, button.centerY + 50, 'Ataque', {
                font: '40px Bangers',
                fill: '#77BFA3',
                align:'center',
            })
            this.ataquetext.anchor.setTo(0.5)
        }
        else{
            this.curatext = game.add.text(button.centerX, button.centerY + 50, 'Curar', {
                font: '40px Bangers',
                fill: '#77BFA3',
                align:'center',
            })
            this.curatext.anchor.setTo(0.5)
        }
    }

    click (button){
        
        let text1 = this.add.text(this.world.centerX, this.world.centerY - this.world.centerY / 2, 'worked?',{
            font: '40px Arial',
            fill: '#77BFA3',
            align:'center',
        })
        text1.anchor.setTo(0.5)
        var a = new apiservice;
        a.getPalabras();
        
    }

}