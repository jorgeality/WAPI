import Phaser from 'phaser';

export default class extends Phaser.State{
    init(_choice){
        this.flag = _choice
    }

    preload(){
        var mobs = ['despair.png','godleft.png','happy.png','marie.png'];

        if(this.flag == 'attack'){
            this.words = this.game.cache.getJSON('ataques');
        }
        else{
            this.words = this.game.cache.getJSON('curas');
        }

        //let indice = game.rnd.intergerInRange(0,4);

        //this.load.image('mob', '../assets/images'+ mobs[indice])

    }

    create(){
        var text = game.add.text(0,0,this.flag,{ font: '16px Arial', fill: '#dddddd', align: 'center' });
       //ar hitme = game.add.sprite(game.width, game.height,'mob')
    }

    update(){}
    
}