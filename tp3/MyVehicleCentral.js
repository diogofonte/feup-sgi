import * as THREE from 'three';

class MyVehicleCentral extends THREE.Object3D {

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
        let component1Geometry = new THREE.BoxGeometry(3, 1, 5);
        let component1Mesh = new THREE.Mesh(component1Geometry, materials['carMaterial']);
        component1Mesh.position.set(2.5, 0, 3.74);
        components.push(component1Mesh);

        // Component 2
        let component2Geometry = new THREE.BoxGeometry(1, 1, 1.75);
        let component2Mesh = new THREE.Mesh(component2Geometry, materials['carMaterial']);
        component2Mesh.position.set(1.5, 0, 7.1);
        components.push(component2Mesh);

        // Component 3
        let component3Geometry = new THREE.BoxGeometry(1, 1, 1.75);
        let component3Mesh = new THREE.Mesh(component3Geometry, materials['carMaterial']);
        component3Mesh.position.set(3.5, 0, 7.1);
        components.push(component3Mesh);

        // Component 4
        let component4Geometry = new THREE.CylinderGeometry(0.6, 0.3, 6.5, 32, 32);
        let component4Mesh = new THREE.Mesh(component4Geometry, materials['carMaterial']);
        component4Mesh.position.set(1.1, 0, 4.75);
        component4Mesh.rotation.x = THREE.MathUtils.degToRad(-90);
        components.push(component4Mesh);

        // Component 5
        let component5Geometry = new THREE.CylinderGeometry(0.6, 0.3, 6.5, 32, 32);
        let component5Mesh = new THREE.Mesh(component5Geometry, materials['carMaterial']);
        component5Mesh.position.set(4.1, 0, 4.75);
        component5Mesh.rotation.x = THREE.MathUtils.degToRad(-90);
        components.push(component5Mesh);

        // Component 6
        let component6Geometry = new THREE.BoxGeometry(1.25, 1, 1.5);
        let component6Mesh = new THREE.Mesh(component6Geometry, materials['carMaterial']);
        component6Mesh.position.set(2.5, 0, 0.65);
        components.push(component6Mesh);

        // Component 7
        let component7Geometry = new THREE.CylinderGeometry(1.5, 0.5, 4, 4, 32);
        let component7Mesh = new THREE.Mesh(component7Geometry, materials['carMaterial2']);
        component7Mesh.position.set(2.5, 0.5, 1.75);
        component7Mesh.rotation.x = THREE.MathUtils.degToRad(90);
        component7Mesh.rotation.y = THREE.MathUtils.degToRad(45);
        components.push(component7Mesh);

        // Component 8
        let component8Geometry = new THREE.CylinderGeometry(1, 1.5, 2.5, 4, 32);
        let component8Mesh = new THREE.Mesh(component8Geometry, materials['carMaterial2']);
        component8Mesh.position.set(2.5, 0.5, 5);
        component8Mesh.rotation.x = THREE.MathUtils.degToRad(90);
        component8Mesh.rotation.y = THREE.MathUtils.degToRad(45);
        components.push(component8Mesh);

        // Component 9
        let component9Geometry = new THREE.CylinderGeometry(0.5, 0.35, 4.15, 32, 32, false, 0, 3.14);
        let component9Mesh = new THREE.Mesh(component9Geometry, materials['carMaterial']);
        component9Mesh.position.set(2.5, 1, 1.85);
        component9Mesh.rotation.x = THREE.MathUtils.degToRad(90);
        component9Mesh.rotation.y = THREE.MathUtils.degToRad(90);
        component9Mesh.rotation.z = THREE.MathUtils.degToRad(-10);
        components.push(component9Mesh);

        // Component 10
        let component10Geometry = new THREE.CylinderGeometry(0.35, 0.5, 2.5, 32, 32, false, 0, 3.14);
        let component10Mesh = new THREE.Mesh(component10Geometry, materials['carMaterial']);
        component10Mesh.position.set(2.5, 1.18, 4.98);
        component10Mesh.rotation.x = THREE.MathUtils.degToRad(90);
        component10Mesh.rotation.y = THREE.MathUtils.degToRad(90);
        component10Mesh.rotation.z = THREE.MathUtils.degToRad(7.5);
        components.push(component10Mesh);

        // Component 11
        let component11Geometry = new THREE.CylinderGeometry(0.15, 0.30, 3.5, 32);
        let component11Mesh = new THREE.Mesh(component11Geometry, materials['carMaterial']);
        component11Mesh.position.set(1.75, 0.65, 5.5);
        component11Mesh.rotation.x = THREE.MathUtils.degToRad(90);
        component11Mesh.rotation.z = THREE.MathUtils.degToRad(-7.5);
        components.push(component11Mesh);

        // Component 12
        let component12Geometry = new THREE.CylinderGeometry(0.15, 0.30, 3.5, 32);
        let component12Mesh = new THREE.Mesh(component12Geometry, materials['carMaterial']);
        component12Mesh.position.set(3.25, 0.65, 5.5);
        component12Mesh.rotation.x = THREE.MathUtils.degToRad(90);
        component12Mesh.rotation.z = THREE.MathUtils.degToRad(7.5);
        components.push(component12Mesh);

        // Component 13
        let component13Geometry = new THREE.BoxGeometry(0.1, 0.25, 0.3);
        let component13Mesh = new THREE.Mesh(component13Geometry, materials['carMaterial2']);
        component13Mesh.position.set(2.5, 1.5, 5.75);
        component13Mesh.rotation.x = THREE.MathUtils.degToRad(-5);
        components.push(component13Mesh);

        // Component 14
        let component14Geometry = new THREE.CylinderGeometry(0.175, 0.175, 0.4, 3);
        let component14Mesh = new THREE.Mesh(component14Geometry, materials['carMaterial2']);
        component14Mesh.position.set(2.5, 1.65, 5.75);
        component14Mesh.rotation.x = THREE.MathUtils.degToRad(45);
        component14Mesh.rotation.z = THREE.MathUtils.degToRad(90);
        components.push(component14Mesh);

        return components;
    }
}

export { MyVehicleCentral };
