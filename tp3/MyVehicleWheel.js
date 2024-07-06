import * as THREE from 'three';

class MyVehicleWheel extends THREE.Object3D {

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
            wheelRubberTex: 'scenes/textures/wheelRubber.jpg',
            wheelMetalTex: 'scenes/textures/metal.jpg'
        };
        
        const textures = {};
        for (const key in texturePaths) {
            const textureLoader = new THREE.TextureLoader();
            textures[key] = textureLoader.load(texturePaths[key]);
        }
        
        const materials = {
            wheelRubber: new THREE.MeshPhongMaterial({
                emissive: new THREE.Color(0, 0, 0),
                color: new THREE.Color(0.1, 0.1, 0.1),
                specular: new THREE.Color(0, 0, 0),
                shininess: 30,
                map: textures['wheelRubberTex'],
                side: THREE.DoubleSide
            }),
        
            wheelBlack: new THREE.MeshPhongMaterial({
                emissive: new THREE.Color(0, 0, 0),
                color: new THREE.Color(0.01, 0.01, 0.01),
                specular: new THREE.Color(0, 0, 0),
                shininess: 30,
                side: THREE.DoubleSide
            }),
        
            wheelMetal: new THREE.MeshPhongMaterial({
                emissive: new THREE.Color(0.4, 0.4, 0.4),
                color: new THREE.Color(0.4, 0.4, 0.4),
                specular: new THREE.Color(0, 0, 0),
                shininess: 0,
                map: textures['wheelMetalTex'],
                side: THREE.DoubleSide
            }),
        
            wheelMetal2: new THREE.MeshPhongMaterial({
                emissive: new THREE.Color(0.15, 0.15, 0.15),
                color: new THREE.Color(0.15, 0.15, 0.15),
                specular: new THREE.Color(0, 0, 0),
                shininess: 0,
                map: textures['wheelMetalTex'],
                side: THREE.DoubleSide
            })
        };

        // Component 1
        let component1Geometry = new THREE.CylinderGeometry(1, 1, 1, 32, 32, true);
        let component1Mesh = new THREE.Mesh(component1Geometry, materials['wheelRubber']);
        component1Mesh.rotation.x = THREE.MathUtils.degToRad(90);
        component1Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component1Mesh);

        // Component 2
        let component2Geometry = new THREE.RingGeometry(0.6, 1, 64, 64);
        let component2Mesh = new THREE.Mesh(component2Geometry, materials['wheelBlack']);
        component2Mesh.position.set(0.5, 0, 0);
        component2Mesh.rotation.y = THREE.MathUtils.degToRad(90);
        components.push(component2Mesh);

        // Component 3
        let component3Geometry = new THREE.RingGeometry(0.6, 1, 64, 64);
        let component3Mesh = new THREE.Mesh(component3Geometry, materials['wheelBlack']);
        component3Mesh.position.set(-0.5, 0, 0);
        component3Mesh.rotation.y = THREE.MathUtils.degToRad(90);
        components.push(component3Mesh);

        // Component 4
        let component4Geometry = new THREE.CylinderGeometry(0.55, 0.6, 0.15, 64, 64, true);
        let component4Mesh = new THREE.Mesh(component4Geometry, materials['wheelMetal']);
        component4Mesh.position.set(0.425, 0, 0);
        component4Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component4Mesh);

        // Component 5
        let component5Geometry = new THREE.CylinderGeometry(0.6, 0.55, 0.15, 64, 64, true);
        let component5Mesh = new THREE.Mesh(component5Geometry, materials['wheelMetal']);
        component5Mesh.position.set(-0.425, 0, 0);
        component5Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component5Mesh);

        // Component 6
        let component6Geometry = new THREE.CylinderGeometry(0.2, 0.2, 0.7, 64, 64);
        let component6Mesh = new THREE.Mesh(component6Geometry, materials['wheelMetal']);
        component6Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component6Mesh);

        // Component 7
        let component7Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component7Mesh = new THREE.Mesh(component7Geometry, materials['wheelMetal']);
        component7Mesh.position.set(0.325, 0.325, 0);
        components.push(component7Mesh);

        // Component 8
        let component8Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component8Mesh = new THREE.Mesh(component8Geometry, materials['wheelMetal']);
        component8Mesh.position.set(0.325, 0, 0.325);
        component8Mesh.rotation.x = THREE.MathUtils.degToRad(90);
        components.push(component8Mesh);

        // Component 9
        let component9Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component9Mesh = new THREE.Mesh(component9Geometry, materials['wheelMetal']);
        component9Mesh.position.set(0.325, 0, -0.325);
        component9Mesh.rotation.x = THREE.MathUtils.degToRad(-90);
        components.push(component9Mesh);

        // Component 10
        let component10Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component10Mesh = new THREE.Mesh(component10Geometry, materials['wheelMetal']);
        component10Mesh.position.set(0.325, -0.325, 0);
        component10Mesh.rotation.x = THREE.MathUtils.degToRad(-180);
        components.push(component10Mesh);

        // Component 11
        let component11Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component11Mesh = new THREE.Mesh(component11Geometry, materials['wheelMetal']);
        component11Mesh.position.set(0.325, 0.23, -0.23);
        component11Mesh.rotation.x = THREE.MathUtils.degToRad(-45);
        components.push(component11Mesh);

        // Component 12
        let component12Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component12Mesh = new THREE.Mesh(component12Geometry, materials['wheelMetal']);
        component12Mesh.position.set(0.325, 0.23, 0.23);
        component12Mesh.rotation.x = THREE.MathUtils.degToRad(45);
        components.push(component12Mesh);

        // Component 13
        let component13Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component13Mesh = new THREE.Mesh(component13Geometry, materials['wheelMetal']);
        component13Mesh.position.set(0.325, -0.23, 0.23);
        component13Mesh.rotation.x = THREE.MathUtils.degToRad(135);
        components.push(component13Mesh);

        // Component 14
        let component14Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component14Mesh = new THREE.Mesh(component14Geometry, materials['wheelMetal']);
        component14Mesh.position.set(0.325, -0.23, -0.23);
        component14Mesh.rotation.x = THREE.MathUtils.degToRad(-135);
        components.push(component14Mesh);

        // Component 15
        let component15Geometry = new THREE.SphereGeometry(0.15, 64, 64, 0, 3.14);
        let component15Mesh = new THREE.Mesh(component15Geometry, materials['wheelMetal2']);
        component15Mesh.position.set(0.325, 0, 0);
        component15Mesh.rotation.y = THREE.MathUtils.degToRad(90);
        components.push(component15Mesh);

        // Wheel Component 16
        let component16Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component16Mesh = new THREE.Mesh(component16Geometry, materials['wheelMetal']);
        component16Mesh.position.set(-0.325, 0.325, 0);
        component16Mesh.rotation.y = THREE.MathUtils.degToRad(180);
        components.push(component16Mesh);

        // Wheel Component 17
        let component17Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component17Mesh = new THREE.Mesh(component17Geometry, materials['wheelMetal']);
        component17Mesh.position.set(-0.325, 0, 0.325);
        component17Mesh.rotation.x = THREE.MathUtils.degToRad(90);
        component17Mesh.rotation.y = THREE.MathUtils.degToRad(180);
        components.push(component17Mesh);

        // Wheel Component 18
        let component18Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component18Mesh = new THREE.Mesh(component18Geometry, materials['wheelMetal']);
        component18Mesh.position.set(-0.325, 0, -0.325);
        component18Mesh.rotation.x = THREE.MathUtils.degToRad(-90);
        component18Mesh.rotation.y = THREE.MathUtils.degToRad(180);
        components.push(component18Mesh);

        // Wheel Component 19
        let component19Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component19Mesh = new THREE.Mesh(component19Geometry, materials['wheelMetal']);
        component19Mesh.position.set(-0.325, -0.325, 0);
        component19Mesh.rotation.x = THREE.MathUtils.degToRad(-180);
        component19Mesh.rotation.y = THREE.MathUtils.degToRad(180);
        components.push(component19Mesh);

        // Wheel Component 20
        let component20Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component20Mesh = new THREE.Mesh(component20Geometry, materials['wheelMetal']);
        component20Mesh.position.set(-0.325, 0.23, -0.23);
        component20Mesh.rotation.x = THREE.MathUtils.degToRad(-45);
        component20Mesh.rotation.y = THREE.MathUtils.degToRad(180);
        components.push(component20Mesh);

        // Component 21
        let component21Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component21Mesh = new THREE.Mesh(component21Geometry, materials['wheelMetal']);
        component21Mesh.position.set(-0.325, 0.23, 0.23);
        component21Mesh.rotation.x = THREE.MathUtils.degToRad(45);
        component21Mesh.rotation.y = THREE.MathUtils.degToRad(180);
        components.push(component21Mesh);

        // Component 22
        let component22Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component22Mesh = new THREE.Mesh(component22Geometry, materials['wheelMetal']);
        component22Mesh.position.set(-0.325, -0.23, 0.23);
        component22Mesh.rotation.x = THREE.MathUtils.degToRad(135);
        component22Mesh.rotation.y = THREE.MathUtils.degToRad(180);
        components.push(component22Mesh);

        // Component 23
        let component23Geometry = new THREE.CylinderGeometry(0.03, 0.075, 0.455, 64, 64, false, 0, 3.14);
        let component23Mesh = new THREE.Mesh(component23Geometry, materials['wheelMetal']);
        component23Mesh.position.set(-0.325, -0.23, -0.23);
        component23Mesh.rotation.x = THREE.MathUtils.degToRad(-135);
        component23Mesh.rotation.y = THREE.MathUtils.degToRad(180);
        components.push(component23Mesh);

        // Component 24
        let component24Geometry = new THREE.SphereGeometry(0.15, 64, 64, 0, 3.14);
        let component24Mesh = new THREE.Mesh(component24Geometry, materials['wheelMetal2']);
        component24Mesh.position.set(-0.325, 0, 0);
        component24Mesh.rotation.y = THREE.MathUtils.degToRad(-90);
        components.push(component24Mesh);

        return components;
    }
}

export { MyVehicleWheel };
