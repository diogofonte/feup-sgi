import * as THREE from 'three';
import { MyApp } from './MyApp.js';
import { MyObstacle } from './MyObstacle.js';
import { MyPowerUp } from './MyPowerUp.js';

class MyTrack extends THREE.Object3D {

    /**
     * 
     * @param {MyApp} app the application object
     */
    constructor(app, reader) {
        super();
        this.app = app;
        this.type = 'Group';
        this.reader = reader

        this.segments = 100;
        this.width = 1;
        this.textureRepeat = 1;
        this.showWireframe = false;
        this.showMesh = true;
        this.showLine = false;
        this.closedCurve = false;

        this.path = new THREE.CatmullRomCurve3([
          new THREE.Vector3(-5, 0, 0),
          new THREE.Vector3(2, 0, 2),
          new THREE.Vector3(2, 0, 6),
          new THREE.Vector3(1, 0, 8),
          new THREE.Vector3(-4, 0, 8),
          new THREE.Vector3(-8, 0, 8),
          new THREE.Vector3(-12, 0, 8),
          new THREE.Vector3(-16, 0, 8),
          new THREE.Vector3(-20, 0, 6),
          new THREE.Vector3(-24, 0, 4),
          new THREE.Vector3(-24, 0, 3),
          new THREE.Vector3(-24, 0, 0),
          new THREE.Vector3(-22, 0, -4),
          new THREE.Vector3(-22, 0, -8),
          new THREE.Vector3(-18, 0, -8),
          new THREE.Vector3(-14, 0, -6),
          new THREE.Vector3(-12, 0, -2),
          new THREE.Vector3(-5, 0, 0),
        ]);

        // Power Ups
        this.powerUps = [];

        // Obstacles
        this.obstacles = [];

        this.initializeObstacles();
        this.initializePowerUps();
        this.buildCurve();
        
    }

    initializePowerUps() {

        if(this.powerUps.length != 0) return;

        let powerUp1 = new MyPowerUp(this.app, 5.5, 0.2, 17, "increase-max-speed");
        let powerUp2 = new MyPowerUp(this.app, -13.5, 0.2, 25, "decrease-total-time");
        let powerUp3 = new MyPowerUp(this.app, -14, 0.2, 5, "increase-max-speed");
        let powerUp4 = new MyPowerUp(this.app, -7, 0.2, -13, "decrease-total-time");

        this.powerUps.push(powerUp1);
        this.powerUps.push(powerUp2);
        this.powerUps.push(powerUp3);
        this.powerUps.push(powerUp4);

    }

    initializeObstacles() {

        if(this.obstacles.length != 0) return;

        let obstacle1 = new MyObstacle(this.app, 0, 0.25, 9, "decrease-max-speed");
        let obstacle2 = new MyObstacle(this.app, -15, 0.25, 20, "increase-total-time");
        let obstacle3 = new MyObstacle(this.app, -7, 0.25, 27, "decrease-max-speed");
        let obstacle4 = new MyObstacle(this.app, 6.5, 0.25, 25, "increase-total-time");

        this.obstacles.push(obstacle1);
        this.obstacles.push(obstacle2);
        this.obstacles.push(obstacle3);
        this.obstacles.push(obstacle4);

    }

    buildCurve() {
        this.createCurveMaterialsTextures();
        this.createCurveObjects();
      }
    
      /**
       * Create materials for the curve elements: the mesh, the line and the wireframe
       */
      createCurveMaterialsTextures() {
        const texture = new THREE.TextureLoader().load("./scenes/textures/track2.jpg");
        texture.wrapS = THREE.RepeatWrapping;
    
        this.material = new THREE.MeshPhongMaterial({ map: texture });
        this.material.map.repeat.set(10, 3);
        this.material.map.wrapS = THREE.RepeatWrapping;
        this.material.map.wrapT = THREE.RepeatWrapping;
    
        this.wireframeMaterial = new THREE.MeshBasicMaterial({
          color: 0x0000ff,
          opacity: 0.3,
          wireframe: true,
          transparent: true,
        });
    
        this.lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
      }
    
      /**
       * Creates the mesh, the line and the wireframe used to visualize the curve
       */
      createCurveObjects() {
        let geometry = new THREE.TubeGeometry(
          this.path,
          this.segments,
          this.width,
          3,
          this.closedCurve
        );
        this.mesh = new THREE.Mesh(geometry, this.material);
        this.wireframe = new THREE.Mesh(geometry, this.wireframeMaterial);
    
        let points = this.path.getPoints(this.segments);
        let bGeometry = new THREE.BufferGeometry().setFromPoints(points);
    
        // Create the final object to add to the scene
        this.line = new THREE.Line(bGeometry, this.lineMaterial);
    
        this.curve = new THREE.Group();
    
        this.mesh.visible = this.showMesh;
        this.wireframe.visible = this.showWireframe;
        this.line.visible = this.showLine;
    
        this.curve.add(this.mesh);
        this.curve.add(this.wireframe);
        this.curve.add(this.line);
    
        this.mesh.rotateZ(Math.PI);
        this.mesh.name = 'track';
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.scale.set(1.5, 0.2, 1.5)
        this.mesh.rotation.y = THREE.MathUtils.degToRad(-105);
        this.mesh.position.set(1.9, 0, -7.5);
      }

      init(){

        this.app.scene.add(this.curve);

        if (this.obstacles.length != 0) {
          for (let i = 0; i < this.obstacles.length; i++) {
              this.app.scene.add(this.obstacles[i].obstacle);
          }
        }
        if (this.powerUps.length != 0) {
            for (let i = 0; i < this.powerUps.length; i++) {
                this.app.scene.add(this.powerUps[i].powerUp);
            }
        }

        // Finish Line

        let postGeometry = new THREE.CylinderGeometry( 0.1, 0.1, 1.5, 32, 32 );
        let postMaterial = new THREE.MeshPhongMaterial( { color: 0x111111 } );

        this.postMesh = new THREE.Mesh( postGeometry, postMaterial );
        this.postMesh.position.set(-1.2, 0.75, 0);
        this.postMesh.castShadow = true;
        this.postMesh.receiveShadow = true;
        this.app.scene.add(this.postMesh);

        this.postMesh2 = new THREE.Mesh( postGeometry, postMaterial );
        this.postMesh2.position.set(1.2, 0.75, 0);
        this.postMesh2.castShadow = true;
        this.postMesh2.receiveShadow = true;
        this.app.scene.add(this.postMesh2);

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('scenes/textures/finish.avif')
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(5, 1);

        let flagGeometry = new THREE.BoxGeometry( 2.4, 0.3, 0.01);
        let flagMaterial = new THREE.MeshPhongMaterial({
            map: texture,
        });

        this.flagMesh = new THREE.Mesh( flagGeometry, flagMaterial );
        this.flagMesh.position.set(0, 1.25, 0);
        this.flagMesh.castShadow = true;
        this.flagMesh.receiveShadow = true;
        this.app.scene.add(this.flagMesh);

        // Sand

        const texture2 = textureLoader.load('scenes/textures/sand.jpg')
        texture2.wrapS = THREE.RepeatWrapping;
        texture2.wrapT = THREE.RepeatWrapping;
        texture2.repeat.set(20, 20);

        let sandGeometry = new THREE.BoxGeometry( 35, 0.1, 55);
        let sandMaterial = new THREE.MeshPhongMaterial({
            map: texture2,
        });

        this.sandMesh = new THREE.Mesh( sandGeometry, sandMaterial );
        this.sandMesh.position.set(-5, 0.04, 10);
        this.sandMesh.castShadow = true;
        this.sandMesh.receiveShadow = true;
        this.app.scene.add(this.sandMesh);
        

      }

      reset(){
        this.app.scene.remove(this.curve);

        if (this.obstacles.length != 0) {
            for (let i = 0; i < this.obstacles.length; i++) {
                this.app.scene.remove(this.obstacles[i].obstacle);
            }
        }
        if (this.powerUps.length != 0) {
            for (let i = 0; i < this.powerUps.length; i++) {
                this.app.scene.remove(this.powerUps[i].powerUp);
            }
        }

        this.app.scene.remove(this.postMesh);
        this.app.scene.remove(this.postMesh2);
        this.app.scene.remove(this.flagMesh);
        this.app.scene.remove(this.sandMesh);
      }

}

MyTrack.prototype.isGroup = true;

export { MyTrack };
