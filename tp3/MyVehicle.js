import * as THREE from 'three';
import { MyApp } from './MyApp.js';
import { MyVehicleCentral } from './MyVehicleCentral.js';
import { MyVehicleFloor } from './MyVehicleFloor.js';
import { MyVehicleBackWheels } from './MyVehicleBackWheels.js';
import { MyVehicleFrontWheels } from './MyVehicleFrontWheels.js';
import { MyVehicleFront } from './MyVehicleFront.js';
import { MyVehicleFrontWing } from './MyVehicleFrontWing.js';
import { MyVehicleRearWing } from './MyVehicleRearWing.js';
import { MyVehicleChassi } from './MyVehicleChassi.js';
import { MyVehicleSteeringWheel } from './MyVehicleSteeringWheel.js';

class MyVehicle extends THREE.Object3D {

    /**
     * 
     * @param {MyApp} app the application object
     */
    constructor(app, x, y, z, color, type) {
        super();
        this.app = app;
        this.color = color;

        this.isGamePaused = false;
        this.isGameResumed = false;
        this.paused = false;

        this.blockKeys = false;
        this.isOnStats = false;

        this.carGroup = new THREE.Group();

        this.vehicleCentral = new MyVehicleCentral(this.app, color);
        this.carGroup.add(this.vehicleCentral);

        this.vehicleFloor = new MyVehicleFloor(this.app, color);
        this.carGroup.add(this.vehicleFloor);

        this.vehicleBackWheels = new MyVehicleBackWheels(this.app);
        this.carGroup.add(this.vehicleBackWheels);

        this.vehicleFrontWheels = new MyVehicleFrontWheels(this.app);
        this.carGroup.add(this.vehicleFrontWheels);

        this.vehicleFront = new MyVehicleFront(this.app, color);
        this.carGroup.add(this.vehicleFront);

        this.vehicleFrontWing = new MyVehicleFrontWing(this.app, color);
        this.carGroup.add(this.vehicleFrontWing);

        this.vehicleRearWing = new MyVehicleRearWing(this.app, color);
        this.carGroup.add(this.vehicleRearWing);

        this.vehicleChassi = new MyVehicleChassi(this.app);
        this.carGroup.add(this.vehicleChassi);

        this.vehicleSteeringWheel = new MyVehicleSteeringWheel(this.app);
        this.carGroup.add(this.vehicleSteeringWheel);

        this.carGroup.position.sub(this.carGroup.localToWorld(new THREE.Vector3(2.5, 0, 0)));

        this.carGroup.position.set(x, y, z);
        this.carGroup.scale.set(0.07, 0.07, 0.07);

        this.sphereRadius = 4;
        this.sphere = new THREE.SphereGeometry( this.sphereRadius, 32, 32 );
        this.sphereMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );

        this.sphereMesh = new THREE.Mesh( this.sphere, this.sphereMaterial );
        this.sphereMesh.position.x += 2.5;
        this.sphereMesh.position.z += 2.25;
        this.sphereMesh.visible = false;
        this.sphereMesh2 = new THREE.Mesh( this.sphere, this.sphereMaterial );
        this.sphereMesh2.position.x += 2.5;
        this.sphereMesh2.position.z += 11.25;
        this.sphereMesh2.visible = false;
        this.carGroup.add(this.sphereMesh)
        this.carGroup.add(this.sphereMesh2)

        this.add(this.carGroup);

        this.velocity = 0;
        this.maxSpeed = 0.1;
        this.maxReverseSpeed = -0.05;

        this.steeringAngle = 0;
        this.steeringLimit = THREE.MathUtils.degToRad(45);

        this.cameraNames = ['Vehicle1', 'Vehicle2'];
        this.activeCameraIndex = 0;

        if(type == "player") this.setupEventListeners();

    }

    setupEventListeners() {
        document.addEventListener('keydown', (event) => {
            this.handleInput(event.code, true);
        });

        document.addEventListener('keyup', (event) => {
            this.handleInput(event.code, false);
        });
    }

    updateMovement() {
        this.localDirection = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.carGroup.rotation.y);

        this.vehicleFrontWheels.rotate(this.steeringAngle, this.steeringLimit);
        if (this.carGroup.rotation.y + (this.steeringAngle * this.velocity) <= this.steeringLimit) {
            this.carGroup.rotation.y += (this.steeringAngle * this.velocity);
        }

        const velocityX = this.localDirection.x * this.velocity;
        const velocityZ = this.localDirection.z * this.velocity;
        
        let vehicleSphere2Position = new THREE.Vector3();
        this.sphereMesh2.getWorldPosition(vehicleSphere2Position)
        const nextPositionX = vehicleSphere2Position.x + velocityX;
        const nextPositionZ = vehicleSphere2Position.z + velocityZ;

        const minX = -22.25;
        const maxX = 12.25;
        const minZ = -17.25;
        const maxZ = 37.25;

        if (nextPositionX >= minX && nextPositionX <= maxX && nextPositionZ >= minZ && nextPositionZ <= maxZ) {
            this.translateX(velocityX);
            this.translateZ(velocityZ);
        }
    }
    
    handleInput(keyCode, isKeyDown) {
        const acceleration = 0.01;
        const deceleration = 0.005;
        const steeringIncrement = THREE.MathUtils.degToRad(1);
    
        switch (keyCode) {
            case 'KeyW': // Accelerate
                if (isKeyDown && !this.blockKeys) {
                    this.velocity = Math.min(this.velocity + acceleration, this.maxSpeed);
                }
                break;
            case 'KeyS': // Brake
                if (isKeyDown && !this.blockKeys) {
                    this.velocity = Math.max(this.velocity - deceleration, this.maxReverseSpeed);
                }
                break;
            case 'KeyA': // Turn left
                if (isKeyDown && !this.blockKeys) {
                    this.steeringAngle = THREE.MathUtils.clamp(
                        this.steeringAngle + steeringIncrement,
                        -this.steeringLimit,
                        this.steeringLimit
                    );
                }
                break;
            case 'KeyD': // Turn right
                if (isKeyDown && !this.blockKeys) {
                    this.steeringAngle = THREE.MathUtils.clamp(
                        this.steeringAngle - steeringIncrement,
                        -this.steeringLimit,
                        this.steeringLimit
                    );
                }
                break;
            case 'KeyV': // Change Camera
                if (isKeyDown && !this.blockKeys) {
                    this.activeCameraIndex = (this.activeCameraIndex + 1) % this.cameraNames.length;
                    let newActiveCameraName = this.cameraNames[this.activeCameraIndex];
                    this.app.setActiveCamera(newActiveCameraName);
                }
                break;
            case 'KeyB': // Stats Camera
                if (isKeyDown && !this.blockKeys) {
                    let cameraName = this.cameraNames[this.activeCameraIndex];
                    if(this.isOnStats){
                        this.app.setActiveCamera(cameraName)
                        this.isOnStats = false;
                    } else {
                        this.app.setActiveCamera("Stats");
                        this.isOnStats = true;
                    } 
                }
                break;
            case 'Space': // Pause/Unpause Game
                if (isKeyDown && !this.blockKeys) {
                    if(!this.paused){
                        this.isGamePaused = true;
                        this.paused = true;
                    } else {
                        this.isGameResumed = true;
                        this.paused = false;
                    } 
                    
                }
                break;
            default:
                break;
        }
    }
    
}

MyVehicle.prototype.isGroup = true;

export { MyVehicle };