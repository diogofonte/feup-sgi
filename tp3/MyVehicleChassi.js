import * as THREE from 'three';

class MyVehicleChassi extends THREE.Object3D {

    /**
     * 
     * @param {MyApp} app the application object
     */
    constructor(app) {
        super();
        this.app = app;

        const components = this.createComponents();
        components.forEach(component => {
            component.receiveShadow = true;
            component.castShadow = true;
            this.add(component);
        });
    }

    createComponents() {
        const components = [];

        const texturePaths = {
            blackTex: 'scenes/textures/black.avif'
        };
        
        const textures = {};
        for (const key in texturePaths) {
            const textureLoader = new THREE.TextureLoader();
            textures[key] = textureLoader.load(texturePaths[key]);
        }
        
        const materials = {
            carBlack: new THREE.MeshPhongMaterial({
                emissive: new THREE.Color(0, 0, 0),
                color: new THREE.Color(1, 1, 1),
                specular: new THREE.Color(0, 0, 0),
                shininess: 30,
                map: textures['blackTex'],
                side: THREE.DoubleSide
            })
        };

        // Component 1
        let component1Geometry = new THREE.BoxGeometry(0.05, 0.5, 0.5);
        let component1Mesh = new THREE.Mesh(component1Geometry, materials['carBlack']);
        component1Mesh.position.set(0.5, 0, 0);
        components.push(component1Mesh);

        // Component 2
        let component2Geometry = new THREE.BoxGeometry(0.05, 0.5, 0.5);
        let component2Mesh = new THREE.Mesh(component2Geometry, materials['carBlack']);
        component2Mesh.position.set(4.5, 0, 0);
        components.push(component2Mesh);

        // Component 3
        let component3Geometry = new THREE.BoxGeometry(0.05, 0.5, 0.5);
        let component3Mesh = new THREE.Mesh(component3Geometry, materials['carBlack']);
        component3Mesh.position.set(0.5, 0, 12);
        components.push(component3Mesh);

        // Component 4
        let component4Geometry = new THREE.BoxGeometry(0.05, 0.5, 0.5);
        let component4Mesh = new THREE.Mesh(component4Geometry, materials['carBlack']);
        component4Mesh.position.set(4.5, 0, 12);
        components.push(component4Mesh);

        // Component 5
        let component5Geometry = new THREE.CylinderGeometry(0.125, 0.125, 4, 32);
        let component5Mesh = new THREE.Mesh(component5Geometry, materials['carBlack']);
        component5Mesh.position.set(2.5, 0.1, 0);
        component5Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component5Mesh);

        // Component 6
        let component6Geometry = new THREE.CylinderGeometry(0.125, 0.125, 1.8, 32);
        let component6Mesh = new THREE.Mesh(component6Geometry, materials['carBlack']);
        component6Mesh.position.set(1.25, 0.1, 0.65);
        component6Mesh.rotation.y = THREE.MathUtils.degToRad(-45);
        component6Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component6Mesh);

        // Component 7
        let component7Geometry = new THREE.CylinderGeometry(0.125, 0.125, 1.8, 32);
        let component7Mesh = new THREE.Mesh(component7Geometry, materials['carBlack']);
        component7Mesh.position.set(3.75, 0.1, 0.65);
        component7Mesh.rotation.y = THREE.MathUtils.degToRad(45);
        component7Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component7Mesh);

        // Component 8
        let component8Geometry = new THREE.CylinderGeometry(0.035, 0.065, 1.8, 32);
        let component8Mesh = new THREE.Mesh(component8Geometry, materials['carBlack']);
        component8Mesh.position.set(4.2, -0.15, 0.85);
        component8Mesh.rotation.y = THREE.MathUtils.degToRad(70);
        component8Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component8Mesh);

        // Component 9
        let component9Geometry = new THREE.CylinderGeometry(0.065, 0.035, 1.8, 32);
        let component9Mesh = new THREE.Mesh(component9Geometry, materials['carBlack']);
        component9Mesh.position.set(0.8, -0.15, 0.85);
        component9Mesh.rotation.y = THREE.MathUtils.degToRad(-70);
        component9Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component9Mesh);

        // Component 10
        let component10Geometry = new THREE.CylinderGeometry(0.035, 0.065, 1.8, 32);
        let component10Mesh = new THREE.Mesh(component10Geometry, materials['carBlack']);
        component10Mesh.position.set(3.95, -0.15, 0.7);
        component10Mesh.rotation.y = THREE.MathUtils.degToRad(50);
        component10Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component10Mesh);

        // Component 11
        let component11Geometry = new THREE.CylinderGeometry(0.065, 0.035, 1.8, 32);
        let component11Mesh = new THREE.Mesh(component11Geometry, materials['carBlack']);
        component11Mesh.position.set(1.05, -0.15, 0.7);
        component11Mesh.rotation.y = THREE.MathUtils.degToRad(-50);
        component11Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component11Mesh);

        // Component 12
        let component12Geometry = new THREE.CylinderGeometry(0.035, 0.065, 1.8, 32);
        let component12Mesh = new THREE.Mesh(component12Geometry, materials['carBlack']);
        component12Mesh.position.set(3.7, -0.15, 0.4);
        component12Mesh.rotation.y = THREE.MathUtils.degToRad(25);
        component12Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component12Mesh);

        // Component 13
        let component13Geometry = new THREE.CylinderGeometry(0.065, 0.035, 1.8, 32);
        let component13Mesh = new THREE.Mesh(component13Geometry, materials['carBlack']);
        component13Mesh.position.set(1.3, -0.15, 0.4);
        component13Mesh.rotation.y = THREE.MathUtils.degToRad(-25);
        component13Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component13Mesh);

        // Component 14
        let component14Geometry = new THREE.CylinderGeometry(0.1, 0.07, 2.15, 4, 32);
        let component14Mesh = new THREE.Mesh(component14Geometry, materials['carBlack']);
        component14Mesh.position.set(1.4, 0.15, 11.35);
        component14Mesh.rotation.y = THREE.MathUtils.degToRad(30);
        component14Mesh.rotation.z = THREE.MathUtils.degToRad(100);
        components.push(component14Mesh);

        // Component 15
        let component15Geometry = new THREE.CylinderGeometry(0.1, 0.07, 2.15, 4, 32);
        let component15Mesh = new THREE.Mesh(component15Geometry, materials['carBlack']);
        component15Mesh.position.set(3.6, 0.15, 11.35);
        component15Mesh.rotation.y = THREE.MathUtils.degToRad(-30);
        component15Mesh.rotation.z = THREE.MathUtils.degToRad(-100);
        components.push(component15Mesh);

        // Component 16
        let component16Geometry = new THREE.CylinderGeometry(0.07, 0.04, 2.15, 4, 32);
        let component16Mesh = new THREE.Mesh(component16Geometry, materials['carBlack']);
        component16Mesh.position.set(1.4, 0.1, 12.2);
        component16Mesh.rotation.y = THREE.MathUtils.degToRad(-10);
        component16Mesh.rotation.z = THREE.MathUtils.degToRad(95);
        components.push(component16Mesh);

        // Component 17
        let component17Geometry = new THREE.CylinderGeometry(0.07, 0.04, 2.15, 4, 32);
        let component17Mesh = new THREE.Mesh(component17Geometry, materials['carBlack']);
        component17Mesh.position.set(3.6, 0.1, 12.2);
        component17Mesh.rotation.y = THREE.MathUtils.degToRad(10);
        component17Mesh.rotation.z = THREE.MathUtils.degToRad(-95);
        components.push(component17Mesh);

        // Component 18
        let component18Geometry = new THREE.CylinderGeometry(0.04, 0.04, 2, 4, 32);
        let component18Mesh = new THREE.Mesh(component18Geometry, materials['carBlack']);
        component18Mesh.position.set(1.5, 0, 11.95);
        component18Mesh.rotation.z = THREE.MathUtils.degToRad(85);
        components.push(component18Mesh);

        // Component 19
        let component19Geometry = new THREE.CylinderGeometry(0.04, 0.04, 2, 4, 32);
        let component19Mesh = new THREE.Mesh(component19Geometry, materials['carBlack']);
        component19Mesh.position.set(3.5, 0, 11.95);
        component19Mesh.rotation.z = THREE.MathUtils.degToRad(-85);
        components.push(component19Mesh);

        return components;
    }
}

export { MyVehicleChassi };
