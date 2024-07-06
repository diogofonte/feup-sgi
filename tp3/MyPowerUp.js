import * as THREE from 'three';
import { MyApp } from './MyApp.js';

const DECREASE_TIME_COLOR = 0x00ff00; // Green color for "decrease-total-time" type
const INCREASE_SPEED_COLOR = 0x0000ff; // Blue color for "increase-max-speed" type

class MyPowerUp extends THREE.Object3D {

    /**
     * 
     * @param {MyApp} app the application object
     */
    constructor(app, x, y, z, type) {
        super();
        this.app = app;

        this.type = type; // can be "increase-max-speed" or "decrease-total-time"

        let materialColor = DECREASE_TIME_COLOR;

        if (type === "increase-max-speed") {
            materialColor = INCREASE_SPEED_COLOR;
        }

        const material = new THREE.MeshPhongMaterial({
            color: materialColor,
            specular: "#000000",
            emissive: "#000000",
            shininess: 30
        })


        const powerUpGeometry = new THREE.BoxGeometry(0.25, 0.25, 0.25);
        this.mesh = new THREE.Mesh(powerUpGeometry, material);
        this.mesh.position.set(x,y,z);
        //this.mesh.castShadow = true;
        //this.mesh.receiveShadow = true;

        this.sphereRadius = 0.2;
        this.sphereGeometry = new THREE.SphereGeometry( 0.2, 32, 32 );
        this.sphereMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
        this.sphereMesh = new THREE.Mesh( this.sphereGeometry, this.sphereMaterial );
        this.sphereMesh.position.set(x,y,z);
        this.sphereMesh.visible = false;

        this.powerUp = new THREE.Group();
        this.powerUp.add(this.mesh);
        this.powerUp.add(this.sphereMesh);
    }
}

MyPowerUp.prototype.isGroup = true;

export { MyPowerUp };