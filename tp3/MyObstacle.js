import * as THREE from 'three';
import { MyApp } from './MyApp.js';

const INCREASE_TIME_COLOR = 0xff0000; // Red color for "increase-total-time" type
const DECREASE_SPEED_COLOR = 0xffa500; // Orange color for "decrease-max-speed" type

class MyObstacle extends THREE.Object3D {

    /**
     * 
     * @param {MyApp} app the application object
     */
    constructor(app, x, y, z, type) {
        super();
        this.app = app;

        this.type = type; // can be "decrease-max-speed" or "increase-total-time"

        let materialColor = INCREASE_TIME_COLOR;

        if (type === "decrease-max-speed") {
            materialColor = DECREASE_SPEED_COLOR;
        }

        const material = new THREE.MeshPhongMaterial({
            color: materialColor,
            specular: "#000000",
            emissive: "#000000",
            shininess: 30
        })

        const obstacle = new THREE.ConeGeometry(0.25, 0.25);
        this.mesh = new THREE.Mesh(obstacle, material);
        this.mesh.position.set(x,y,z);
        //this.mesh.castShadow = true;
        //this.mesh.receiveShadow = true;

        this.sphereRadius = 0.25;
        this.sphere = new THREE.SphereGeometry( this.sphereRadius, 32, 32 );
        this.sphereMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
        this.sphereMesh = new THREE.Mesh( this.sphere, this.sphereMaterial );
        this.sphereMesh.position.set(x,y-0.1,z);
        this.sphereMesh.visible = false;

        this.obstacle = new THREE.Group();
        this.obstacle.add(this.mesh);
        this.obstacle.add(this.sphereMesh);

    }
}

MyObstacle.prototype.isGroup = true;

export { MyObstacle };