import * as THREE from 'three'
import { MyVehicle } from './MyVehicle.js';

class MyMenu {

    constructor(app, reader) {
        this.app = app
        this.reader = reader

    }

    init(){

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('scenes/textures/feup.png')

        let feupGeometry = new THREE.PlaneGeometry(0.5, 0.2)
        let feupMaterial = new THREE.MeshPhongMaterial({ map: texture })
        this.feupMesh = new THREE.Mesh(feupGeometry, feupMaterial)
        this.feupMesh.position.set(-1.15, -8, 0.6)
        this.feupMesh.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0)
        this.app.scene.add(this.feupMesh)

        if (this.menuText1) this.app.scene.remove(this.menuText1);
        this.menuText1 = this.reader.createText('Project developed by:', -0.75, -8, 0.53, 0xffffff);
        this.menuText1.scale.set(0.035, -0.035, 0.035);
        this.menuText1.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.menuText1)
        if (this.menuText2) this.app.scene.remove(this.menuText2);
        this.menuText2 = this.reader.createText('Rodrigo Manuel Graça Figueiredo', -0.75, -8, 0.59, 0xffffff);
        this.menuText2.scale.set(0.035, -0.035, 0.035);
        this.menuText2.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.menuText2)
        if (this.menuText3) this.app.scene.remove(this.menuText3);
        this.menuText3 = this.reader.createText('Diogo Alexandre da Costa Melo Moreira da Fonte', -0.75, -8, 0.65, 0xffffff);
        this.menuText3.scale.set(0.035, -0.035, 0.035);
        this.menuText3.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.menuText3)

        if (this.titleMenu) this.app.scene.remove(this.titleMenu);
        this.titleMenu = this.reader.createText('Speed', -0.075, -7.51, -0.35, 0xff0000);
        this.titleMenu.scale.set(0.05, -0.05, 0.05);
        this.titleMenu.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.titleMenu)
        if (this.titleMenu2) this.app.scene.remove(this.titleMenu2);
        this.titleMenu2 = this.reader.createText('Symphony', -0.125, -7.51, -0.3, 0x00ff00);
        this.titleMenu2.scale.set(0.05, -0.05, 0.05);
        this.titleMenu2.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.titleMenu2)

        if (this.startText) this.app.scene.remove(this.startText);
        this.startText = this.reader.createText('START', -0.045, -7.5, -0.175, 0xffffff);
        this.startText.scale.set(0.035, -0.035, 0.035);
        this.startText.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.startText)

        if (this.currentDifficultyText) this.app.scene.remove(this.currentDifficultyText);
        this.currentDifficultyText = this.reader.createText('Current difficulty:', -0.25, -7.5, 0.06, 0x000000);
        this.currentDifficultyText.scale.set(0.018, -0.018, 0.018);
        this.currentDifficultyText.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.currentDifficultyText)
        if (this.currentDifficultyText2) this.app.scene.remove(this.currentDifficultyText2);
        this.currentDifficultyText2 = this.reader.createText(this.reader.difficulty, -0.15, -7.5, 0.08, 0x000000);
        this.currentDifficultyText2.scale.set(0.018, -0.018, 0.018);
        this.currentDifficultyText2.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.currentDifficultyText2)

        if (this.difficultyText) this.app.scene.remove(this.difficultyText);
        this.difficultyText = this.reader.createText('Change', -0.17, -7.5, 0.115, 0xffffff);
        this.difficultyText.scale.set(0.018, -0.018, 0.018);
        this.difficultyText.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.difficultyText)
        if (this.difficultyText2) this.app.scene.remove(this.difficultyText2);
        this.difficultyText2 = this.reader.createText('Difficulty', -0.20, -7.5, 0.135, 0xffffff);
        this.difficultyText2.scale.set(0.018, -0.018, 0.018);
        this.difficultyText2.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.difficultyText2)


        if (this.currentNameText) this.app.scene.remove(this.currentNameText);
        this.currentNameText = this.reader.createText('Your name:', 0.07, -7.5, 0.06, 0x000000);
        this.currentNameText.scale.set(0.018, -0.018, 0.018);
        this.currentNameText.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.currentNameText)
        if (this.currentNameText2) this.app.scene.remove(this.currentNameText2);
        this.currentNameText2 = this.reader.createText(this.reader.playerName, 0.075, -7.5, 0.08, 0x000000);
        this.currentNameText2.scale.set(0.018, -0.018, 0.018);
        this.currentNameText2.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.currentNameText2)

        if (this.playerNameText) this.app.scene.remove(this.playerNameText);
        this.playerNameText = this.reader.createText('Change', 0.11, -7.5, 0.115, 0xffffff);
        this.playerNameText.scale.set(0.018, -0.018, 0.018);
        this.playerNameText.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.playerNameText)
        if (this.playerNameText2) this.app.scene.remove(this.playerNameText2);
        this.playerNameText2 = this.reader.createText('Player Name', 0.07, -7.5, 0.135, 0xffffff);
        this.playerNameText2.scale.set(0.018, -0.018, 0.018);
        this.playerNameText2.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.playerNameText2)

        this.menuVehicle = new MyVehicle(this.app, 8.5, 0, -0.45, "red", "");
        this.menuVehicle.rotation.set(THREE.MathUtils.degToRad(-90), THREE.MathUtils.degToRad(90), 0);
        this.app.scene.add(this.menuVehicle)

        this.menuVehicle2 = new MyVehicle(this.app, -2.3, -9.5, -1.5, "blue", "");
        this.app.scene.add(this.menuVehicle2)

        this.menuVehicle3 = new MyVehicle(this.app, -2.3, -9.5, 0, "blue", "");
        this.app.scene.add(this.menuVehicle3)

        this.menuVehicle4 = new MyVehicle(this.app, 2, -9.5, -1.5, "blue", "");
        this.app.scene.add(this.menuVehicle4)

        this.menuVehicle5 = new MyVehicle(this.app, 2, -9.5, 0, "blue", "");
        this.app.scene.add(this.menuVehicle5)

        let menuGeometry = new THREE.BoxGeometry( 2, 0.2, 0.5);
        let menuMaterial = new THREE.MeshPhongMaterial( { color: 0x333333 } );

        this.menuMesh = new THREE.Mesh( menuGeometry, menuMaterial );
        this.menuMesh.position.set(0, -10, -1);
        this.menuMesh.castShadow = true;
        this.menuMesh.receiveShadow = true;
        this.menuMesh.name = 'start';
        this.app.scene.add(this.menuMesh);

        let menuGeometry2 = new THREE.BoxGeometry( 1.25, 0.15, 0.35);
        let menuMaterial2 = new THREE.MeshPhongMaterial( { color: 0x333333 } );

        this.menuMesh2 = new THREE.Mesh( menuGeometry2, menuMaterial2 );
        this.menuMesh2.position.set(-0.8, -10, 0.75);
        this.menuMesh2.castShadow = true;
        this.menuMesh2.receiveShadow = true;
        this.menuMesh2.name = 'difficulty';
        this.app.scene.add(this.menuMesh2);

        let menuGeometry3 = new THREE.BoxGeometry( 1.25, 0.15, 0.35);
        let menuMaterial3 = new THREE.MeshPhongMaterial( { color: 0x333333 } );

        this.menuMesh3 = new THREE.Mesh( menuGeometry3, menuMaterial3 );
        this.menuMesh3.position.set(0.8, -10, 0.75);
        this.menuMesh3.castShadow = true;
        this.menuMesh3.receiveShadow = true;
        this.menuMesh3.name = 'playerName';
        this.app.scene.add(this.menuMesh3);

        if (this.difficultyMenuText) this.app.scene.remove(this.difficultyMenuText);
        this.difficultyMenuText = this.reader.createText('Choose the difficulty:', -10.3, -7.5, -0.2, 0xffffff);
        this.difficultyMenuText.scale.set(0.04, -0.04, 0.04);
        this.difficultyMenuText.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.difficultyMenuText)

        let easyGeometry = new THREE.BoxGeometry( 1.25, 0.15, 0.35);
        let easyMaterial = new THREE.MeshPhongMaterial( { color: 0x333333 } );

        this.easyMesh = new THREE.Mesh( easyGeometry, easyMaterial );
        this.easyMesh.position.set(-8.5, -9, 0.1);
        this.easyMesh.castShadow = true;
        this.easyMesh.receiveShadow = true;
        this.easyMesh.name = 'hard';
        this.app.scene.add(this.easyMesh);

        let normalGeometry = new THREE.BoxGeometry( 1.25, 0.15, 0.35);
        let normalMaterial = new THREE.MeshPhongMaterial( { color: 0x333333 } );

        this.normalMesh = new THREE.Mesh( normalGeometry, normalMaterial );
        this.normalMesh.position.set(-10, -9, 0.1);
        this.normalMesh.castShadow = true;
        this.normalMesh.receiveShadow = true;
        this.normalMesh.name = 'normal';
        this.app.scene.add(this.normalMesh);

        let hardGeometry = new THREE.BoxGeometry( 1.25, 0.15, 0.35);
        let hardMaterial = new THREE.MeshPhongMaterial( { color: 0x333333 } );

        this.hardMesh = new THREE.Mesh( hardGeometry, hardMaterial );
        this.hardMesh.position.set(-11.5, -9, 0.1);
        this.hardMesh.castShadow = true;
        this.hardMesh.receiveShadow = true;
        this.hardMesh.name = 'easy';
        this.app.scene.add(this.hardMesh);

        if (this.easyText) this.app.scene.remove(this.easyText);
        this.easyText = this.reader.createText('Hard', -9.65, -7.5, 0.015, 0xffffff);
        this.easyText.scale.set(0.04, -0.04, 0.04);
        this.easyText.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.easyText)

        if (this.normalText) this.app.scene.remove(this.normalText);
        this.normalText = this.reader.createText('Normal', -10.065, -7.5, 0.015, 0xffffff);
        this.normalText.scale.set(0.04, -0.04, 0.04);
        this.normalText.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.normalText)

        if (this.hardText) this.app.scene.remove(this.hardText);
        this.hardText = this.reader.createText('Easy', -10.425, -7.5, 0.015, 0xffffff);
        this.hardText.scale.set(0.04, -0.04, 0.04);
        this.hardText.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.hardText)

    }
    
    reset(){

        this.app.scene.remove(this.feupMesh)
        if (this.menuText1) this.app.scene.remove(this.menuText1);
        if (this.menuText2) this.app.scene.remove(this.menuText2);
        if (this.menuText3) this.app.scene.remove(this.menuText3);
        if (this.titleMenu) this.app.scene.remove(this.titleMenu);
        if (this.titleMenu2) this.app.scene.remove(this.titleMenu2);
        if (this.startText) this.app.scene.remove(this.startText);
        if (this.currentDifficultyText) this.app.scene.remove(this.currentDifficultyText);
        if (this.currentDifficultyText2) this.app.scene.remove(this.currentDifficultyText2);
        if (this.difficultyText) this.app.scene.remove(this.difficultyText);
        if (this.difficultyText2) this.app.scene.remove(this.difficultyText2);
        if (this.currentNameText) this.app.scene.remove(this.currentNameText);
        if (this.currentNameText2) this.app.scene.remove(this.currentNameText2);
        if (this.playerNameText) this.app.scene.remove(this.playerNameText);
        if (this.playerNameText2) this.app.scene.remove(this.playerNameText2);
        this.app.scene.remove(this.menuVehicle)
        this.app.scene.remove(this.menuVehicle2)
        this.app.scene.remove(this.menuVehicle3)
        this.app.scene.remove(this.menuVehicle4)
        this.app.scene.remove(this.menuVehicle5)
        this.app.scene.remove(this.menuMesh);
        this.app.scene.remove(this.menuMesh2);
        this.app.scene.remove(this.menuMesh3);
        if (this.difficultyMenuText) this.app.scene.remove(this.difficultyMenuText);
        this.app.scene.remove(this.easyMesh);
        this.app.scene.remove(this.normalMesh);
        this.app.scene.remove(this.hardMesh);
        if (this.easyText) this.app.scene.remove(this.easyText);
        if (this.normalText) this.app.scene.remove(this.normalText);
        if (this.hardText) this.app.scene.remove(this.hardText);

    }

    updateCurrentName(){
        if (this.currentNameText2) this.app.scene.remove(this.currentNameText2);
        this.currentNameText2 = this.reader.createText(this.reader.playerName, 0.075, -7.5, 0.08, 0x000000);
        this.currentNameText2.scale.set(0.018, -0.018, 0.018);
        this.currentNameText2.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.currentNameText2)
    }

    updateCurrentDifficulty(){
        if (this.currentDifficultyText2) this.app.scene.remove(this.currentDifficultyText2);
        this.currentDifficultyText2 = this.reader.createText(this.reader.difficulty, -0.15, -7.5, 0.08, 0x000000);
        this.currentDifficultyText2.scale.set(0.018, -0.018, 0.018);
        this.currentDifficultyText2.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
        this.app.scene.add(this.currentDifficultyText2)
    }
    
}

export { MyMenu }