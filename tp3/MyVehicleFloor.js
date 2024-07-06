import * as THREE from 'three';

class MyVehicleFloor extends THREE.Object3D {

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
        this.position.y = -0.5;
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
    
        const materials = {
            carMaterial: getColorMaterial(this.color)
        };

        // Component 1
        let component1Geometry = new THREE.BoxGeometry(5, 0.1, 7);
        let component1Mesh = new THREE.Mesh(component1Geometry, materials['carMaterial']);
        component1Mesh.position.set(2.5, 0, 4.6);
        components.push(component1Mesh);

        // Component 2
        let component2Geometry = new THREE.BoxGeometry(3.75, 0.1, 1.5);
        let component2Mesh = new THREE.Mesh(component2Geometry, materials['carMaterial']);
        component2Mesh.position.set(2.5, 0, 0.35);
        components.push(component2Mesh);

        // Component 3
        let component3Geometry = new THREE.BoxGeometry(0.8, 0.1, 0.5);
        let component3Mesh = new THREE.Mesh(component3Geometry, materials['carMaterial']);
        component3Mesh.position.set(4.6, 0, 8.35);
        components.push(component3Mesh);

        // Component 4
        let component4Geometry = new THREE.BoxGeometry(0.8, 0.1, 0.5);
        let component4Mesh = new THREE.Mesh(component4Geometry, materials['carMaterial']);
        component4Mesh.position.set(0.4, 0, 8.35);
        components.push(component4Mesh);

        return components;
    }
}

export { MyVehicleFloor };
