import * as THREE from 'three';

class MyVehicleFrontWing extends THREE.Object3D {

    /**
     * 
     * @param {MyApp} app the application object
     */
    constructor(app, color) {
        super();
        this.app = app;
        this.color = color;

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
            redTex: 'scenes/textures/red.png',
            blueTex: 'scenes/textures/blue.webp',
            greenTex: 'scenes/textures/green.png',
            orangeTex: 'scenes/textures/orange.jpg'
        };
        
        const textures = {};
        for (const key in texturePaths) {
            const textureLoader = new THREE.TextureLoader();
            textures[key] = textureLoader.load(texturePaths[key]);
        }
        
        const getColorMaterial = (color) => {
            switch (color) {
                case 'red':
                    return new THREE.MeshPhongMaterial({
                        emissive: new THREE.Color(0, 0, 0),
                        color: new THREE.Color(0.5, 0, 0),
                        specular: new THREE.Color(0, 0, 0),
                        shininess: 30,
                        map: textures['redTex'],
                        side: THREE.DoubleSide
                    });
                case 'blue':
                    return new THREE.MeshPhongMaterial({
                        emissive: new THREE.Color(0, 0, 0),
                        color: new THREE.Color(0, 0, 0.5),
                        specular: new THREE.Color(0, 0, 0),
                        shininess: 30,
                        map: textures['blueTex'],
                        side: THREE.DoubleSide
                    });
                case 'green':
                    return new THREE.MeshPhongMaterial({
                        emissive: new THREE.Color(0, 0, 0),
                        color: new THREE.Color(0, 0.35, 0),
                        specular: new THREE.Color(0, 0, 0),
                        shininess: 30,
                        map: textures['greenTex'],
                        side: THREE.DoubleSide
                    });
                case 'orange':
                    return new THREE.MeshPhongMaterial({
                        emissive: new THREE.Color(0, 0, 0),
                        color: new THREE.Color(0.5, 0.25, 0),
                        specular: new THREE.Color(0, 0, 0),
                        shininess: 30,
                        map: textures['orangeTex'],
                        side: THREE.DoubleSide
                    });
                default:
                    return new THREE.MeshPhongMaterial({
                        emissive: new THREE.Color(0, 0, 0),
                        color: new THREE.Color(0.5, 0, 0),
                        specular: new THREE.Color(0, 0, 0),
                        shininess: 30,
                        map: textures['redTex'],
                        side: THREE.DoubleSide
                    });
            }
        };

        const getColorMaterial2 = (color) => {
            switch (color) {
                case 'red':
                    return new THREE.MeshPhongMaterial({
                        emissive: new THREE.Color(0, 0, 0),
                        color: new THREE.Color(0.1, 0, 0),
                        specular: new THREE.Color(0, 0, 0),
                        shininess: 30,
                        map: textures['redTex'],
                        side: THREE.DoubleSide
                    });
                case 'blue':
                    return new THREE.MeshPhongMaterial({
                        emissive: new THREE.Color(0, 0, 0),
                        color: new THREE.Color(0, 0, 0.1),
                        specular: new THREE.Color(0, 0, 0),
                        shininess: 30,
                        map: textures['blueTex'],
                        side: THREE.DoubleSide
                    });
                case 'green':
                    return new THREE.MeshPhongMaterial({
                        emissive: new THREE.Color(0, 0, 0),
                        color: new THREE.Color(0, 0.1, 0),
                        specular: new THREE.Color(0, 0, 0),
                        shininess: 30,
                        map: textures['greenTex'],
                        side: THREE.DoubleSide
                    });
                case 'orange':
                    return new THREE.MeshPhongMaterial({
                        emissive: new THREE.Color(0, 0, 0),
                        color: new THREE.Color(0.25, 0.1, 0),
                        specular: new THREE.Color(0, 0, 0),
                        shininess: 30,
                        map: textures['orangeTex'],
                        side: THREE.DoubleSide
                    });
                default:
                    return new THREE.MeshPhongMaterial({
                        emissive: new THREE.Color(0, 0, 0),
                        color: new THREE.Color(0.1, 0, 0),
                        specular: new THREE.Color(0, 0, 0),
                        shininess: 30,
                        map: textures['redTex'],
                        side: THREE.DoubleSide
                    });
            }
        };
    
        const materials = {
            carMaterial: getColorMaterial(this.color),
            carMaterial2: getColorMaterial2(this.color)
        };

        // Component 1
        let component1Geometry = new THREE.BoxGeometry(5, 0.1, 0.75);
        let component1Mesh = new THREE.Mesh(component1Geometry, materials['carMaterial']);
        component1Mesh.position.set(2.5, -0.75, 14.4);
        components.push(component1Mesh);

        // Component 2
        let component2Geometry = new THREE.BoxGeometry(0.1, 0.75, 1.55);
        let component2Mesh = new THREE.Mesh(component2Geometry, materials['carMaterial2']);
        component2Mesh.position.set(0, -0.4, 14);
        components.push(component2Mesh);

        // Component 3
        let component3Geometry = new THREE.BoxGeometry(0.1, 0.75, 1.55);
        let component3Mesh = new THREE.Mesh(component3Geometry, materials['carMaterial2']);
        component3Mesh.position.set(5, -0.4, 14);
        components.push(component3Mesh);

        // Component 4
        let component4Geometry = new THREE.BoxGeometry(1.75, 0.5, 0.05);
        let component4Mesh = new THREE.Mesh(component4Geometry, materials['carMaterial']);
        component4Mesh.position.set(0.85, -0.2, 13.45);
        component4Mesh.rotation.x = THREE.MathUtils.degToRad(-60);
        components.push(component4Mesh);

        // Component 5
        let component5Geometry = new THREE.BoxGeometry(1.85, 0.55, 0.05);
        let component5Mesh = new THREE.Mesh(component5Geometry, materials['carMaterial']);
        component5Mesh.position.set(0.9, -0.55, 13.925);
        component5Mesh.rotation.x = THREE.MathUtils.degToRad(-60);
        components.push(component5Mesh);

        // Component 6
        let component6Geometry = new THREE.BoxGeometry(1.75, 0.5, 0.05);
        let component6Mesh = new THREE.Mesh(component6Geometry, materials['carMaterial']);
        component6Mesh.position.set(4.15, -0.2, 13.45);
        component6Mesh.rotation.x = THREE.MathUtils.degToRad(-60);
        components.push(component6Mesh);

        // Component 7
        let component7Geometry = new THREE.BoxGeometry(1.85, 0.55, 0.05);
        let component7Mesh = new THREE.Mesh(component7Geometry, materials['carMaterial']);
        component7Mesh.position.set(4.075, -0.55, 13.925);
        component7Mesh.rotation.x = THREE.MathUtils.degToRad(-60);
        components.push(component7Mesh);

        // Component 8
        let component8Geometry = new THREE.BoxGeometry(1.5, 0.65, 0.125);
        let component8Mesh = new THREE.Mesh(component8Geometry, materials['carMaterial2']);
        component8Mesh.position.set(2.5, -0.6, 14);
        component8Mesh.rotation.x = THREE.MathUtils.degToRad(-75);
        components.push(component8Mesh);

        // Component 9
        let component9Geometry = new THREE.BoxGeometry(0.05, 0.5, 0.35);
        let component9Mesh = new THREE.Mesh(component9Geometry, materials['carMaterial2']);
        component9Mesh.position.set(2.7, -0.3, 13.6);
        components.push(component9Mesh);

        // Component 10
        let component10Geometry = new THREE.BoxGeometry(0.05, 0.5, 0.35);
        let component10Mesh = new THREE.Mesh(component10Geometry, materials['carMaterial2']);
        component10Mesh.position.set(2.3, -0.3, 13.6);
        components.push(component10Mesh);

        // Component 11
        let component11Geometry = new THREE.BoxGeometry(0.05, 0.4, 0.25);
        let component11Mesh = new THREE.Mesh(component11Geometry, materials['carMaterial2']);
        component11Mesh.position.set(1.5, -0.5, 14.5);
        components.push(component11Mesh);

        // Component 12
        let component12Geometry = new THREE.BoxGeometry(0.05, 0.4, 0.25);
        let component12Mesh = new THREE.Mesh(component12Geometry, materials['carMaterial2']);
        component12Mesh.position.set(3.5, -0.5, 14.5);
        components.push(component12Mesh);

        // Component 13
        let component13Geometry = new THREE.BoxGeometry(0.05, 0.4, 0.25);
        let component13Mesh = new THREE.Mesh(component13Geometry, materials['carMaterial2']);
        component13Mesh.position.set(1.7, -0.345, 14.5);
        component13Mesh.rotation.z = THREE.MathUtils.degToRad(-95);
        components.push(component13Mesh);

        // Component 14
        let component14Geometry = new THREE.BoxGeometry(0.05, 0.4, 0.25);
        let component14Mesh = new THREE.Mesh(component14Geometry, materials['carMaterial2']);
        component14Mesh.position.set(3.3, -0.345, 14.5);
        component14Mesh.rotation.z = THREE.MathUtils.degToRad(95);
        components.push(component14Mesh);

        // Component 15
        let component15Geometry = new THREE.BoxGeometry(0.6, 0.05, 0.15);
        let component15Mesh = new THREE.Mesh(component15Geometry, materials['carMaterial2']);
        component15Mesh.position.set(0.3, -0.35, 14.65);
        components.push(component15Mesh);

        // Component 16
        let component16Geometry = new THREE.BoxGeometry(0.6, 0.05, 0.15);
        let component16Mesh = new THREE.Mesh(component16Geometry, materials['carMaterial2']);
        component16Mesh.position.set(4.7, -0.35, 14.65);
        components.push(component16Mesh);

        // Component 17
        let component17Geometry = new THREE.BoxGeometry(0.6, 0.025, 0.25);
        let component17Mesh = new THREE.Mesh(component17Geometry, materials['carMaterial2']);
        component17Mesh.position.set(0.3, -0.25, 14.5);
        component17Mesh.rotation.x = THREE.MathUtils.degToRad(20);
        components.push(component17Mesh);

        // Component 18
        let component18Geometry = new THREE.BoxGeometry(0.6, 0.025, 0.25);
        let component18Mesh = new THREE.Mesh(component18Geometry, materials['carMaterial2']);
        component18Mesh.position.set(4.7, -0.25, 14.5);
        component18Mesh.rotation.x = THREE.MathUtils.degToRad(20);
        components.push(component18Mesh);

        // Component 19
        let component19Geometry = new THREE.BoxGeometry(0.35, 0.25, 0.04);
        let component19Mesh = new THREE.Mesh(component19Geometry, materials['carMaterial2']);
        component19Mesh.position.set(0.6, -0.25, 14.55);
        component19Mesh.rotation.y = THREE.MathUtils.degToRad(90);
        components.push(component19Mesh);

        // Component 20
        let component20Geometry = new THREE.BoxGeometry(0.35, 0.25, 0.04);
        let component20Mesh = new THREE.Mesh(component20Geometry, materials['carMaterial2']);
        component20Mesh.position.set(4.4, -0.25, 14.55);
        component20Mesh.rotation.y = THREE.MathUtils.degToRad(90);
        components.push(component20Mesh);

        // Component 21
        let component21Geometry = new THREE.BoxGeometry(0.15, 0.04, 1.55);
        let component21Mesh = new THREE.Mesh(component21Geometry, materials['carMaterial2']);
        component21Mesh.position.set(-0.07, -0.8, 14);
        component21Mesh.rotation.z = THREE.MathUtils.degToRad(20);
        components.push(component21Mesh);

        // Component 22
        let component22Geometry = new THREE.BoxGeometry(0.15, 0.04, 1.55);
        let component22Mesh = new THREE.Mesh(component22Geometry, materials['carMaterial2']);
        component22Mesh.position.set(5.07, -0.8, 14);
        component22Mesh.rotation.z = THREE.MathUtils.degToRad(-20);
        components.push(component22Mesh);

        return components;
    }
}

export { MyVehicleFrontWing };
