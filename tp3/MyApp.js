
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MyReader } from './MyReader.js';
import { MyInterface } from './MyInterface.js';
import Stats from 'three/addons/libs/stats.module.js'

/**
 * This class contains the application object
 */
class MyApp  {
    /**
     * the constructor
     */
    constructor() {
        this.scene = null;
        this.stats = null;

        // camera related attributes
        this.activeCamera = null;
        this.activeCameraName = null;
        this.lastCameraName = null;
        this.cameras = [];
        this.frustumSize = 20;

        // other attributes
        this.renderer = null;
        this.controls = null;
        this.gui = null;
        this.axis = null;
        this.contents = null;
    }
    /**
     * initializes the application
     */
    init() {
                
        // Create an empty scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x101010 );

        this.stats = new Stats()
        this.stats.showPanel(1) // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom)

        this.initCameras();
        this.setActiveCamera('Perspective')

        // Create a renderer with Antialiasing
        this.renderer = new THREE.WebGLRenderer({antialias:true});
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setClearColor("#000000");
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Configure renderer size
        this.renderer.setSize( window.innerWidth, window.innerHeight );

        // Append Renderer to DOM
        document.getElementById("canvas").appendChild( this.renderer.domElement );

        // manage window resizes
        window.addEventListener('resize', this.onResize.bind(this), false );
    }

    /**
     * initializes all the cameras
     */
    initCameras() {
        const aspect = window.innerWidth / window.innerHeight;

        // Create a basic perspective camera
        const perspective1 = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 )
        perspective1.position.set(10,10,3)
        this.cameras['Perspective'] = perspective1

        const perspective2 = new THREE.PerspectiveCamera( 100, aspect, 0.1, 1000 )
        perspective2.position.set(10,10,3)
        this.cameras['Perspective2'] = perspective2

        const fixedCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        fixedCamera.position.set(0, -3.5, 2);
        fixedCamera.lookAt(new THREE.Vector3(0, -5, -2));
        this.cameras['Park1'] = fixedCamera;

        const fixedCamera2 = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        fixedCamera2.position.set(-10, -3.5, 1.5);
        fixedCamera2.lookAt(new THREE.Vector3(-10, -5, -2));
        this.cameras['Park2'] = fixedCamera2;

        const vehicle1 = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        vehicle1.position.set(0, 0, 0);
        this.cameras['Vehicle1'] = vehicle1;

        const vehicle2 = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        vehicle2.position.set(-4, 22, 8);
        vehicle2.lookAt(new THREE.Vector3(-5, 0, 8));
        this.cameras['Vehicle2'] = vehicle2;

        const statsCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        statsCamera.position.set(0, 6.5, 2.5);
        statsCamera.lookAt(new THREE.Vector3(10, 6.5, 2.5));
        this.cameras['Stats'] = statsCamera;

        const menuCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        menuCamera.position.set(0, -7, 0);
        menuCamera.lookAt(new THREE.Vector3(0, -11, 0));
        this.cameras['Menu'] = menuCamera;

        const difficultyCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        difficultyCamera.position.set(-10, -7, 0);
        difficultyCamera.lookAt(new THREE.Vector3(-10, -11, 0));
        this.cameras['Difficulty'] = difficultyCamera;

        const overCamera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        overCamera.position.set(0, -30, 15);
        overCamera.lookAt(new THREE.Vector3(0, -30, 16));
        this.cameras['GameOver'] = overCamera;
    }

    /**
     * sets the active camera by name
     * @param {String} cameraName 
     */
    setActiveCamera(cameraName) {   
        this.activeCameraName = cameraName
        this.activeCamera = this.cameras[this.activeCameraName]
    }

    getActiveCamera() {
        return this.cameras[this.activeCameraName]
    }

    /**
     * updates the active camera if required
     * this function is called in the render loop
     * when the active camera name changes
     * it updates the active camera and the controls
     */
    updateCameraIfRequired() {

        // camera changed?
        if (this.lastCameraName !== this.activeCameraName) {
            this.lastCameraName = this.activeCameraName;
            this.activeCamera = this.cameras[this.activeCameraName]
            document.getElementById("camera").innerHTML = this.activeCameraName
           
            // call on resize to update the camera aspect ratio
            // among other things
            this.onResize()

            if(this.activeCameraName == "Park1" || this.activeCameraName == "Park2" || 
                this.activeCameraName == "Vehicle1" || this.activeCameraName == "Vehicle2" || 
                this.activeCameraName == "Stats" || this.activeCameraName == "Menu" || 
                this.activeCameraName == "GameOver" || this.activeCameraName == "Difficulty") return;

            // are the controls yet?
            if (this.controls === null) {
                // Orbit controls allow the camera to orbit around a target.
                this.controls = new OrbitControls( this.activeCamera, this.renderer.domElement );
                this.controls.enableZoom = true;
                this.controls.update();
            }
            else {
                this.controls.object = this.activeCamera
            }
        }
    }

    /**
     * the window resize handler
     */
    onResize() {
        if (this.activeCamera !== undefined && this.activeCamera !== null) {
            this.activeCamera.aspect = window.innerWidth / window.innerHeight;
            this.activeCamera.updateProjectionMatrix();
            this.renderer.setSize( window.innerWidth, window.innerHeight );
        }
    }
    /**
     * 
     * @param {MyReader} contents the contents object 
     */
    setContents(contents) {
        this.contents = contents;

        window.addEventListener('pointermove', this.onPointerMove)
    }

    /**
     * @param {MyInterface} contents the gui interface object
     */
    setGui(gui) {   
        this.gui = gui
    }

    followVehicle() {
        if (this.contents.vehicle) {
            let vehiclePosition = this.contents.vehicle.position;
            let localDirection = this.contents.vehicle.localDirection;
    
            this.activeCamera.position.copy(vehiclePosition).addScaledVector(localDirection, -1).add(new THREE.Vector3(-0.25, 0.75, 0));
    
            this.activeCamera.lookAt(vehiclePosition.clone().add(localDirection));
        }
    }

    /**
    * the main render function. Called in a requestAnimationFrame loop
    */
    render () {
        this.stats.begin()
        this.updateCameraIfRequired()

        // update the animation if contents were provided
        if (this.activeCamera !== undefined && this.activeCamera !== null) {
            this.contents.update()
        }

        // required if controls.enableDamping or controls.autoRotate are set to true
        if(this.activeCameraName != "Park1" && this.activeCameraName != "Park2" && 
            this.activeCameraName != "Vehicle1" && this.activeCameraName != "Vehicle2" && 
            this.activeCameraName != "Stats" && this.activeCameraName != "Menu" && 
            this.activeCameraName != "GameOver" && this.activeCameraName != "Difficulty") this.controls.update();

        if(this.activeCameraName == "Vehicle1") this.followVehicle();

        // render the scene
        this.renderer.render(this.scene, this.activeCamera);

        // subsequent async calls to the render loop
        requestAnimationFrame( this.render.bind(this) );

        this.lastCameraName = this.activeCameraName
        this.stats.end()
    }
}


export { MyApp };