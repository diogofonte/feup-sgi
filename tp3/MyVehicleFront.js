import * as THREE from 'three';

class MyVehicleFront extends THREE.Object3D {

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
        let component1Geometry = new THREE.CylinderGeometry(0.35, 0.9, 5, 4, 32);
        let component1Mesh = new THREE.Mesh(component1Geometry, materials['carMaterial2']);
        component1Mesh.position.set(2.5, 0.1, 10);
        component1Mesh.rotation.x = THREE.MathUtils.degToRad(90);
        component1Mesh.rotation.y = THREE.MathUtils.degToRad(45);
        components.push(component1Mesh);

        // Component 2
        let component2Geometry = new THREE.CylinderGeometry(0.2, 0.35, 0.4, 4, 32);
        let component2Mesh = new THREE.Mesh(component2Geometry, materials['carMaterial2']);
        component2Mesh.position.set(2.5, 0.07, 12.65);
        component2Mesh.rotation.x = THREE.MathUtils.degToRad(100);
        component2Mesh.rotation.y = THREE.MathUtils.degToRad(45);
        components.push(component2Mesh);

        // Component 3
        let component3Geometry = new THREE.BoxGeometry(0.5, 0.15, 1.5);
        let component3Mesh = new THREE.Mesh(component3Geometry, materials['carMaterial2']);
        component3Mesh.position.set(2.5, 0, 13.5);
        component3Mesh.rotation.x = THREE.MathUtils.degToRad(7.5);
        components.push(component3Mesh);

        // Component 4
        let component4Geometry = new THREE.BoxGeometry(0.9, 0.1, 0.2);
        let component4Mesh = new THREE.Mesh(component4Geometry, materials['carMaterial2']);
        component4Mesh.position.set(2.5, -0.1, 14.2);
        component4Mesh.rotation.x = THREE.MathUtils.degToRad(7.5);
        components.push(component4Mesh);

        return components;
    }
}

export { MyVehicleFront };
