import * as THREE from 'three';

class MyVehicleRearWing extends THREE.Object3D {

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
        let component1Geometry = new THREE.BoxGeometry(0.2, 0.05, 1.5);
        let component1Mesh = new THREE.Mesh(component1Geometry, materials['carMaterial2']);
        component1Mesh.position.set(2.5, 0.5, -1);
        components.push(component1Mesh);

        // Component 2
        let component2Geometry = new THREE.BoxGeometry(2.5, 0.05, 0.35);
        let component2Mesh = new THREE.Mesh(component2Geometry, materials['carMaterial2']);
        component2Mesh.position.set(2.5, 0.5, -1.75);
        component2Mesh.rotation.x = THREE.MathUtils.degToRad(35);
        components.push(component2Mesh);

        // Component 3
        let component3Geometry = new THREE.BoxGeometry(0.075, 0.65, 1.35);
        let component3Mesh = new THREE.Mesh(component3Geometry, materials['carMaterial']);
        component3Mesh.position.set(1.25, 0.3, -1.5);
        component3Mesh.rotation.x = THREE.MathUtils.degToRad(25);
        components.push(component3Mesh);

        // Component 4
        let component4Geometry = new THREE.BoxGeometry(0.075, 0.65, 1.35);
        let component4Mesh = new THREE.Mesh(component4Geometry, materials['carMaterial']);
        component4Mesh.position.set(3.75, 0.3, -1.5);
        component4Mesh.rotation.x = THREE.MathUtils.degToRad(25);
        components.push(component4Mesh);

        // Component 5
        let component5Geometry = new THREE.BoxGeometry(0.072, 1.35, 0.85);
        let component5Mesh = new THREE.Mesh(component5Geometry, materials['carMaterial']);
        component5Mesh.position.set(1.25, 0.975, -1.825);
        components.push(component5Mesh);

        // Component 6
        let component6Geometry = new THREE.BoxGeometry(0.072, 1.35, 0.85);
        let component6Mesh = new THREE.Mesh(component6Geometry, materials['carMaterial']);
        component6Mesh.position.set(3.75, 0.975, -1.825);
        components.push(component6Mesh);

        // Component 7
        let component7Geometry = new THREE.BoxGeometry(0.075, 0.65, 1.25);
        let component7Mesh = new THREE.Mesh(component7Geometry, materials['carMaterial']);
        component7Mesh.position.set(1.25, 1.45, -1.3);
        components.push(component7Mesh);

        // Component 8
        let component8Geometry = new THREE.BoxGeometry(0.075, 0.65, 1.25);
        let component8Mesh = new THREE.Mesh(component8Geometry, materials['carMaterial']);
        component8Mesh.position.set(3.75, 1.45, -1.3);
        components.push(component8Mesh);

        // Component 9
        let component9Geometry = new THREE.BoxGeometry(2.5, 0.05, 1);
        let component9Mesh = new THREE.Mesh(component9Geometry, materials['carMaterial2']);
        component9Mesh.position.set(2.5, 1.35, -1.25);
        components.push(component9Mesh);

        // Component 10
        let component10Geometry = new THREE.BoxGeometry(2.5, 0.05, 0.15);
        let component10Mesh = new THREE.Mesh(component10Geometry, materials['carMaterial2']);
        component10Mesh.position.set(2.5, 1.375, -1.8);
        component10Mesh.rotation.x = THREE.MathUtils.degToRad(30);
        components.push(component10Mesh);

        // Component 11
        let component11Geometry = new THREE.BoxGeometry(2.5, 0.05, 0.35);
        let component11Mesh = new THREE.Mesh(component11Geometry, materials['carMaterial2']);
        component11Mesh.position.set(2.5, 1.625, -1.7);
        component11Mesh.rotation.x = THREE.MathUtils.degToRad(30);
        components.push(component11Mesh);

        return components;
    }
}

export { MyVehicleRearWing };
