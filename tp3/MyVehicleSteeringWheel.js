import * as THREE from 'three';

class MyVehicleSteeringWheel extends THREE.Object3D {

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
        let component1Geometry = new THREE.BoxGeometry(0.3, 0.35, 0.05);
        let component1Mesh = new THREE.Mesh(component1Geometry, materials['carBlack']);
        component1Mesh.position.set(2.5, 0.75, 7.25);
        components.push(component1Mesh);

        // Component 2
        let component2Geometry = new THREE.TorusGeometry(0.25, 0.035, 32, 100, 1.7);
        let component2Mesh = new THREE.Mesh(component2Geometry, materials['carBlack']);
        component2Mesh.position.set(2.46, 0.75, 7.25);
        component2Mesh.rotation.z = THREE.MathUtils.degToRad(-50);
        components.push(component2Mesh);

        // Component 3
        let component3Geometry = new THREE.TorusGeometry(0.25, 0.035, 32, 100, 1.7);
        let component3Mesh = new THREE.Mesh(component3Geometry, materials['carBlack']);
        component3Mesh.position.set(2.535, 0.73, 7.25);
        component3Mesh.rotation.z = THREE.MathUtils.degToRad(125);
        components.push(component3Mesh);

        // Component 4
        let component4Geometry = new THREE.CylinderGeometry(0.025, 0.025, 0.35, 32, 32);
        let component4Mesh = new THREE.Mesh(component4Geometry, materials['carBlack']);
        component4Mesh.position.set(2.5, 0.65, 7.4);
        component4Mesh.rotation.y = THREE.MathUtils.degToRad(90);
        component4Mesh.rotation.z = THREE.MathUtils.degToRad(125);
        components.push(component4Mesh);

        return components;
    }
}

export { MyVehicleSteeringWheel };
