import * as THREE from 'three';

class MyPicking {

    /**
       constructs the object
       @param {MyApp} app The application object
    */ 
    constructor(app) {
        this.app = app;

        this.raycaster = new THREE.Raycaster()
        this.raycaster.near = 1
        this.raycaster.far = 35

        this.pointer = new THREE.Vector2()
        this.intersectedObj = null
        this.pickingColor = "0x999999"

        this.notPickableObjIds = []
        this.pickableObjIds = [];

        this.intersects = null;

        this.addButtons();

        document.addEventListener(
            "pointermove",
            this.onPointerMove.bind(this)
        );

    }

    onPointerMove(event) {

        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.pointer, this.app.getActiveCamera());

        this.intersects = this.raycaster.intersectObjects(this.app.scene.children);

        this.pickingHelper(this.intersects)

        //this.transverseRaycastProperties(this.intersects)
    }

    pickingHelper(intersects) {
        if (intersects.length > 0) {
            const obj = intersects[0].object
            if (this.pickableObjIds.includes(obj.name)) {
                this.changeColorOfFirstPickedObj(obj)
            }
            else{
                this.restoreColorOfFirstPickedObj()
                //console.log("Object cannot be picked !")
            }
        } else {
            this.restoreColorOfFirstPickedObj()
        }
    }

    transverseRaycastProperties(intersects) {
        for (var i = 0; i < intersects.length; i++) {

            console.log(intersects[i]);
        }
    }

    changeColorOfFirstPickedObj(obj) {
        if (this.lastPickedObj != obj) {            
            if (this.lastPickedObj)
                this.lastPickedObj.material.color.setHex(this.lastPickedObj.currentHex);
            this.lastPickedObj = obj;
            this.lastPickedObj.currentHex = this.lastPickedObj.material.color.getHex();
            this.lastPickedObj.material.color.setHex(this.pickingColor);
        }
    }

    restoreColorOfFirstPickedObj() {
        if (this.lastPickedObj)
            this.lastPickedObj.material.color.setHex(this.lastPickedObj.currentHex);
        this.lastPickedObj = null;
    }

    addButtons() {

        let buttonGeometry = new THREE.CylinderGeometry( 0.2, 0.2, 0.065, 32, 32 );
        
        let buttonMaterial = new THREE.MeshPhongMaterial( { color: 0x660000 } );
        let buttonMesh = new THREE.Mesh( buttonGeometry, buttonMaterial );
        buttonMesh.position.set(-1.975 + 0.2, -4.9, -1.25 + 1.5);
        buttonMesh.name = 'vehicleButtonRed';
        buttonMesh.castShadow = true;
        buttonMesh.receiveShadow = true;
        this.app.scene.add(buttonMesh);

        let buttonMaterial2 = new THREE.MeshPhongMaterial( { color: 0x000066 } );
        let buttonMesh2 = new THREE.Mesh( buttonGeometry, buttonMaterial2 );
        buttonMesh2.position.set(-0.825 + 0.2, -4.9, -1.25 + 1.5);
        buttonMesh2.name = 'vehicleButtonBlue';
        buttonMesh2.castShadow = true;
        buttonMesh2.receiveShadow = true;
        this.app.scene.add(buttonMesh2);

        let buttonMaterial3 = new THREE.MeshPhongMaterial( { color: 0x006600 } );
        let buttonMesh3 = new THREE.Mesh( buttonGeometry, buttonMaterial3 );
        buttonMesh3.position.set(0.425 + 0.2, -4.9, -1.25 + 1.5);
        buttonMesh3.name = 'vehicleButtonGreen';
        buttonMesh3.castShadow = true;
        buttonMesh3.receiveShadow = true;
        this.app.scene.add(buttonMesh3);

        let buttonMaterial4 = new THREE.MeshPhongMaterial( { color: 0x664100 } );
        let buttonMesh4 = new THREE.Mesh( buttonGeometry, buttonMaterial4 );
        buttonMesh4.position.set(1.575 + 0.2, -4.9, -1.25 + 1.5);
        buttonMesh4.name = 'vehicleButtonOrange';
        buttonMesh4.castShadow = true;
        buttonMesh4.receiveShadow = true;
        this.app.scene.add(buttonMesh4);

        let material1 = new THREE.MeshPhongMaterial({
            color: 0xff0000,
            specular: "#000000",
            emissive: "#000000",
            shininess: 30
        })

        let material2 = new THREE.MeshPhongMaterial({
            color: 0xffa500,
            specular: "#000000",
            emissive: "#000000",
            shininess: 30
        })

        let obstacle = new THREE.ConeGeometry(0.45, 0.45);

        let obstacleMesh1 = new THREE.Mesh(obstacle, material1);
        obstacleMesh1.position.set(-10.75, -4.7, -1);
        obstacleMesh1.name = 'Obstacle1';
        this.app.scene.add(obstacleMesh1);

        let obstacleMesh2 = new THREE.Mesh(obstacle, material2);
        obstacleMesh2.position.set(-9.25, -4.7, -1);
        obstacleMesh2.name = 'Obstacle2';
        this.app.scene.add(obstacleMesh2);

    }

}
export { MyPicking };