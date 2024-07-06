import * as THREE from 'three'
import { MyVehicle } from './MyVehicle.js';

class MyFinalMenu {

    constructor(app, reader) {
        this.app = app
        this.reader = reader

    }

    init(){

        this.title = this.reader.createText('GAME', 0.05, -29.65, 15.5, 0xff0000);
        this.title.scale.set(0.05, -0.05, 0.05);
        this.title.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.title)
        this.title2 = this.reader.createText('OVER', 0.05, -29.7, 15.5, 0xff0000);
        this.title2.scale.set(0.05, -0.05, 0.05);
        this.title2.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.title2)

        let podiumGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.01)
        let podiumMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff })
        this.podiumMesh = new THREE.Mesh(podiumGeometry, podiumMaterial)
        this.podiumMesh.position.set(0, -30, 15.5)
        this.podiumMesh.rotation.set(THREE.MathUtils.degToRad(-35), 0, 0)
        this.app.scene.add(this.podiumMesh)

        if(this.reader.winner == 'Opponent'){
            this.podiumVehicle = new MyVehicle(this.app, 0, 0, 0, this.reader.opponentVehicle.color, "");
            this.podiumVehicle.rotation.set(THREE.MathUtils.degToRad(-35), THREE.MathUtils.degToRad(180), 0);
            this.podiumVehicle.position.set(0.065, -29.875, 15.6);
            this.podiumVehicle.scale.set(0.4, 0.4, 0.4)
            this.app.scene.add(this.podiumVehicle)
        } else {
            this.podiumVehicle = new MyVehicle(this.app, 0, 0, 0, this.reader.vehicle.color, "");
            this.podiumVehicle.rotation.set(THREE.MathUtils.degToRad(-35), THREE.MathUtils.degToRad(180), 0);
            this.podiumVehicle.position.set(0.065, -29.875, 15.6);
            this.podiumVehicle.scale.set(0.4, 0.4, 0.4)
            this.app.scene.add(this.podiumVehicle)
        }

        this.backText = this.reader.createText('Back to', -0.325, -30.225, 15.465, 0xffffff);
        this.backText.scale.set(0.03, -0.03, 0.03);
        this.backText.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.backText)
        this.backText2 = this.reader.createText('Menu', -0.3525, -30.255, 15.465, 0xffffff);
        this.backText2.scale.set(0.03, -0.03, 0.03);
        this.backText2.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.backText2)

        this.restartText = this.reader.createText('Restart', 0.45, -30.225, 15.465, 0xffffff);
        this.restartText.scale.set(0.03, -0.03, 0.03);
        this.restartText.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.restartText)
        this.restartText2 = this.reader.createText('Race', 0.4225, -30.255, 15.465, 0xffffff);
        this.restartText2.scale.set(0.03, -0.03, 0.03);
        this.restartText2.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.restartText2)

        let finalGeometry = new THREE.BoxGeometry( 0.55, 0.225, 0.035);
        let finalMaterial = new THREE.MeshPhongMaterial( { color: 0x333333 } );

        this.finalMesh = new THREE.Mesh( finalGeometry, finalMaterial );
        this.finalMesh.position.set(-1.25, -30.775, 16.5);
        this.finalMesh.castShadow = true;
        this.finalMesh.receiveShadow = true;
        this.finalMesh.name = 'backMenu';
        this.app.scene.add(this.finalMesh);

        let finalGeometry2 = new THREE.BoxGeometry( 0.5, 0.225, 0.035);
        let finalMaterial2 = new THREE.MeshPhongMaterial( { color: 0x333333 } );

        this.finalMesh2 = new THREE.Mesh( finalGeometry2, finalMaterial2 );
        this.finalMesh2.position.set(1.25, -30.775, 16.5);
        this.finalMesh2.castShadow = true;
        this.finalMesh2.receiveShadow = true;
        this.finalMesh2.name = 'restart';
        this.app.scene.add(this.finalMesh2);

        if (this.finalDifficultyText) this.app.scene.remove(this.finalDifficultyText);
        this.finalDifficultyText = this.reader.createText('Difficulty:' + this.reader.difficulty, 0.65, -29.7, 15.5, 0xffffff);
        this.finalDifficultyText.scale.set(0.025, -0.025, 0.025);
        this.finalDifficultyText.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.finalDifficultyText)

        if (this.finalPlayerText) this.app.scene.remove(this.finalPlayerText);
        this.finalPlayerText = this.reader.createText('Used vehicle:', 0.65, -29.75, 15.5, 0xffffff);
        this.finalPlayerText.scale.set(0.025, -0.025, 0.025);
        this.finalPlayerText.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.finalPlayerText)

        if (this.finalPlayerText2) this.app.scene.remove(this.finalPlayerText2);
        this.finalPlayerText2 = this.reader.createText(this.reader.vehicleColorText, 0.4, -29.75, 15.5, this.reader.vehicleColorHex);
        this.finalPlayerText2.scale.set(0.025, -0.025, 0.025);
        this.finalPlayerText2.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.finalPlayerText2)

        if (this.finalPlayerTimeText) this.app.scene.remove(this.finalPlayerTimeText);
        this.finalPlayerTimeText = this.reader.createText(this.reader.playerName + '\'s total time:', 0.65, -29.80, 15.5, 0xffffff);
        this.finalPlayerTimeText.scale.set(0.025, -0.025, 0.025);
        this.finalPlayerTimeText.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.finalPlayerTimeText)

        if (this.finalPlayerTimeText2) this.app.scene.remove(this.finalPlayerTimeText2);
        this.finalPlayerTimeText2 = this.reader.createText((Math.floor(this.reader.playerFinalTime / (1000 * 60))).toString() + ":" + (Math.floor(this.reader.playerFinalTime / 1000) % 60).toString() + "s", 0.22, -29.80, 15.5, 0x00ff00);
        this.finalPlayerTimeText2.scale.set(0.025, -0.025, 0.025);
        this.finalPlayerTimeText2.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.finalPlayerTimeText2)

        if (this.finalOpponentText) this.app.scene.remove(this.finalOpponentText);
        this.finalOpponentText = this.reader.createText('Opponent\'s vehicle:', -0.2, -29.75, 15.5, 0xffffff);
        this.finalOpponentText.scale.set(0.025, -0.025, 0.025);
        this.finalOpponentText.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.finalOpponentText)

        if (this.finalOpponentText2) this.app.scene.remove(this.finalOpponentText2);
        this.finalOpponentText2 = this.reader.createText(this.reader.opponentColorText, -0.55, -29.75, 15.5, this.reader.opponentColorHex);
        this.finalOpponentText2.scale.set(0.025, -0.025, 0.025);
        this.finalOpponentText2.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.finalOpponentText2)

        if (this.finalOpponentTimeText) this.app.scene.remove(this.finalOpponentTimeText);
        this.finalOpponentTimeText = this.reader.createText('Opponent\'s total time:', -0.2, -29.80, 15.5, 0xffffff);
        this.finalOpponentTimeText.scale.set(0.025, -0.025, 0.025);
        this.finalOpponentTimeText.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.finalOpponentTimeText)

        if (this.finalOpponentTimeText2) this.app.scene.remove(this.finalOpponentTimeText2);
        this.finalOpponentTimeText2 = this.reader.createText((Math.floor(this.reader.opponentFinalTime / (1000 * 60))).toString() + ":" + (Math.floor(this.reader.opponentFinalTime / 1000) % 60).toString() + "s", -0.615, -29.80, 15.5, 0x00ff00);
        this.finalOpponentTimeText2.scale.set(0.025, -0.025, 0.025);
        this.finalOpponentTimeText2.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.finalOpponentTimeText2)

        if (this.finalWinnerText) this.app.scene.remove(this.finalWinnerText);
        this.finalWinnerText = this.reader.createText('Winner:', 0.05, -29.75, 15.5, 0x00ff00);
        this.finalWinnerText.scale.set(0.025, -0.025, 0.025);
        this.finalWinnerText.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.finalWinnerText)

        if (this.finalWinnerText2) this.app.scene.remove(this.finalWinnerText2);
        this.finalWinnerText2 = this.reader.createText(this.reader.winner, 0.05, -29.775, 15.5, 0x00ff00);
        this.finalWinnerText2.scale.set(0.025, -0.025, 0.025);
        this.finalWinnerText2.rotation.set(0, THREE.MathUtils.degToRad(180), 0);
        this.app.scene.add(this.finalWinnerText2)

    }
    
    reset(){

        if (this.title) this.app.scene.remove(this.title);
        if (this.title2) this.app.scene.remove(this.title2);
        if (this.podiumMesh) this.app.scene.remove(this.podiumMesh);
        if (this.podiumVehicle) this.app.scene.remove(this.podiumVehicle);
        if (this.backText) this.app.scene.remove(this.backText);
        if (this.backText2) this.app.scene.remove(this.backText2);
        if (this.restartText) this.app.scene.remove(this.restartText);
        if (this.restartText2) this.app.scene.remove(this.restartText2);
        if (this.finalMesh) this.app.scene.remove(this.finalMesh);
        if (this.finalMesh2) this.app.scene.remove(this.finalMesh2);
        if (this.finalDifficultyText) this.app.scene.remove(this.finalDifficultyText);
        if (this.finalPlayerText) this.app.scene.remove(this.finalPlayerText);
        if (this.finalPlayerText2) this.app.scene.remove(this.finalPlayerText2);
        if (this.finalPlayerTimeText) this.app.scene.remove(this.finalPlayerTimeText);
        if (this.finalPlayerTimeText2) this.app.scene.remove(this.finalPlayerTimeText2);
        if (this.finalOpponentText) this.app.scene.remove(this.finalOpponentText);
        if (this.finalOpponentText2) this.app.scene.remove(this.finalOpponentText2);
        if (this.finalOpponentTimeText) this.app.scene.remove(this.finalOpponentTimeText);
        if (this.finalOpponentTimeText2) this.app.scene.remove(this.finalOpponentTimeText2);
        if (this.finalWinnerText) this.app.scene.remove(this.finalWinnerText);
        if (this.finalWinnerText2) this.app.scene.remove(this.finalWinnerText2);

        this.reader.launchFireWorks = false;
        for( let i = 0; i < this.reader.fireworks.length; i++ ) {
            this.reader.fireworks[i].reset()
            this.reader.fireworks[i].clean()
        }
        this.reader.fireworks.splice(0,this.reader.fireworks.length-1)

    }
    
}

export { MyFinalMenu }