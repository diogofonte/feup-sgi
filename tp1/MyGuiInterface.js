import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { MyApp } from './MyApp.js';
import { MyContents } from './MyContents.js';

/**
    This class customizes the gui interface for the app
*/
class MyGuiInterface  {

    /**
     * 
     * @param {MyApp} app The application object 
     */
    constructor(app) {
        this.app = app
        this.datgui =  new GUI();
        this.contents = null
    }

    /**
     * Set the contents object
     * @param {MyContents} contents the contents objects 
     */
    setContents(contents) {
        this.contents = contents
    }


    /**
     * Initialize the gui interface
     */
    init() {
        // add a folder to the gui interface for the box
        const boxFolder = this.datgui.addFolder( 'Box' );
        // note that we are using a property from the contents object 
        boxFolder.add(this.contents, 'boxMeshSize', 0, 10).name("size").onChange( () => { this.contents.rebuildBox() } );
        boxFolder.add(this.contents.boxDisplacement, 'x', -5, 5);
        boxFolder.add(this.contents.boxDisplacement, 'y', -5, 5);
        boxFolder.add(this.contents.boxDisplacement, 'z', -5, 5);
        boxFolder.add(this.contents, 'boxEnabled', true).name("Enabled");
        boxFolder.close();

        // add a folder to the gui interface for the circle
        const circleFolder = this.datgui.addFolder( 'Circle' );
        circleFolder.add(this.contents, 'circleRadius', 0, 10).name("Radius").onChange( () => { this.contents.rebuildCircle() } );
        circleFolder.add(this.contents, 'circleSegments', 0, 50, 1).name("Segments").onChange( () => { this.contents.rebuildCircle() } );
        circleFolder.add(this.contents, 'circleEnabled', true).name("Enabled");
        circleFolder.close();

        // add a folder to the gui interface for the sphere
        const sphereFolder = this.datgui.addFolder( 'Sphere' );
        sphereFolder.add(this.contents, 'sphereRadius', 0, 10).name("Radius").onChange( () => { this.contents.rebuildSphere() } );
        sphereFolder.add(this.contents, 'sphereWidthSegments', 0, 50, 1).name("Width Segments").onChange( () => { this.contents.rebuildSphere() } );
        sphereFolder.add(this.contents, 'sphereHeightSegments', 0, 50, 1).name("Height Segments").onChange( () => { this.contents.rebuildSphere() } );
        sphereFolder.add(this.contents, 'sphereEnabled', true).name("Enabled");
        sphereFolder.close();
        
        // add a folder to the gui interface for the partial sphere
        const partialSphereFolder = this.datgui.addFolder( 'Partial Sphere' );
        partialSphereFolder.add(this.contents, 'partialSphereRadius', 0, 10).name("Radius").onChange( () => { this.contents.rebuildPartialSphere() } );
        partialSphereFolder.add(this.contents, 'partialSphereWidthSegments', 0, 50, 1).name("Width Segments").onChange( () => { this.contents.rebuildPartialSphere() } );
        partialSphereFolder.add(this.contents, 'partialSphereHeightSegments', 0, 50, 1).name("Height Segments").onChange( () => { this.contents.rebuildPartialSphere() } );
        partialSphereFolder.add(this.contents, 'partialSpherePhiStart', 0, 2*Math.PI).name("Phi Start").onChange( () => { this.contents.rebuildPartialSphere() } );
        partialSphereFolder.add(this.contents, 'partialSpherePhiLength', 0, 2*Math.PI).name("Phi Length").onChange( () => { this.contents.rebuildPartialSphere() } );
        partialSphereFolder.add(this.contents, 'partialSphereThetaStart', 0, Math.PI/2).name("Theta Start").onChange( () => { this.contents.rebuildPartialSphere() } );
        partialSphereFolder.add(this.contents, 'partialSphereThetaLength', 0, Math.PI/2).name("Theta Length").onChange( () => { this.contents.rebuildPartialSphere() } );
        partialSphereFolder.add(this.contents, 'partialSphereEnabled', true).name("Enabled");
        partialSphereFolder.close();

        // add a folder to the gui interface for the cylinder
        const cylinderFolder = this.datgui.addFolder( 'Cylinder' );
        cylinderFolder.add(this.contents, 'cylinderRadiusTop', 0, 10).name("Radius Top").onChange( () => { this.contents.rebuildCylinder() } );
        cylinderFolder.add(this.contents, 'cylinderRadiusBottom', 0, 10).name("Radius Bottom").onChange( () => { this.contents.rebuildCylinder() } );
        cylinderFolder.add(this.contents, 'cylinderHeight', 0, 30).name("Height").onChange( () => { this.contents.rebuildCylinder() } );
        cylinderFolder.add(this.contents, 'cylinderRadialSegments', 0, 50, 1).name("Radial Segments").onChange( () => { this.contents.rebuildCylinder() } );
        cylinderFolder.add(this.contents, 'cylinderEnabled', true).name("Enabled");
        cylinderFolder.close();

        // add a folder to the gui interface for the partial cylinder
        const paritalCylinderFolder = this.datgui.addFolder( 'Partial Cylinder' );
        paritalCylinderFolder.add(this.contents, 'partialCylinderRadiusTop', 0, 10).name("Radius Top").onChange( () => { this.contents.rebuildPartialCylinder() } );
        paritalCylinderFolder.add(this.contents, 'partialCylinderRadiusBottom', 0, 10).name("Radius Bottom").onChange( () => { this.contents.rebuildPartialCylinder() } );
        paritalCylinderFolder.add(this.contents, 'partialCylinderHeight', 0, 30).name("Height").onChange( () => { this.contents.rebuildPartialCylinder() } );
        paritalCylinderFolder.add(this.contents, 'partialCylinderRadialSegments', 0, 50, 1).name("Radial Segments").onChange( () => { this.contents.rebuildPartialCylinder() } );
        paritalCylinderFolder.add(this.contents, 'partialCylinderHeightSegments', 0, 50, 1).name("Height Segments").onChange( () => { this.contents.rebuildPartialCylinder() } );
        paritalCylinderFolder.add(this.contents, 'partialCylinderThetaStart', 0, 2*Math.PI).name("Theta Start").onChange( () => { this.contents.rebuildPartialCylinder() } );
        paritalCylinderFolder.add(this.contents, 'partialCylinderThetaLength', 0, 2*Math.PI).name("Theta Length").onChange( () => { this.contents.rebuildPartialCylinder() } );
        paritalCylinderFolder.add(this.contents, 'partialCylinderOpenEnded', true).name("Open Ended").onChange( () => { this.contents.rebuildPartialCylinder() } );;
        paritalCylinderFolder.add(this.contents, 'partialCylinderEnabled', true).name("Enabled");
        paritalCylinderFolder.close();

        // add a folder to the gui interface for the cone
        const coneFolder = this.datgui.addFolder( 'Cone' );
        coneFolder.add(this.contents, 'coneRadius', 0, 10).name("Radius").onChange( () => { this.contents.rebuildCone() } );
        coneFolder.add(this.contents, 'coneHeight', 0, 30).name("Height").onChange( () => { this.contents.rebuildCone() } );
        coneFolder.add(this.contents, 'coneRadialSegments', 0, 50, 1).name("Radial Segments").onChange( () => { this.contents.rebuildCone() } );
        coneFolder.add(this.contents, 'coneEnabled', true).name("Enabled");
        coneFolder.close();

        // add a folder to the gui interface for the partial cone
        const partialConeFolder = this.datgui.addFolder( 'Partial Cone' );
        partialConeFolder.add(this.contents, 'partialConeRadius', 0, 10).name("Radius").onChange( () => { this.contents.rebuildPartialCone() } );
        partialConeFolder.add(this.contents, 'partialConeHeight', 0, 30).name("Height").onChange( () => { this.contents.rebuildPartialCone() } );
        partialConeFolder.add(this.contents, 'partialConeRadialSegments', 0, 50, 1).name("Radial Segments").onChange( () => { this.contents.rebuildPartialCone() } );
        partialConeFolder.add(this.contents, 'partialConeHeightSegments', 0, 50, 1).name("Height Segments").onChange( () => { this.contents.rebuildPartialCone() } );
        partialConeFolder.add(this.contents, 'partialConeThetaStart', 0, 2*Math.PI).name("Theta Start").onChange( () => { this.contents.rebuildPartialCone() } );
        partialConeFolder.add(this.contents, 'partialConeThetaLength', 0, 2*Math.PI).name("Theta Length").onChange( () => { this.contents.rebuildPartialCone() } );
        partialConeFolder.add(this.contents, 'partialConeOpenEnded', true).name("Open Ended").onChange( () => { this.contents.rebuildPartialCone() } );;
        partialConeFolder.add(this.contents, 'partialConeEnabled', true).name("Enabled");
        partialConeFolder.close();

        // add a folder to the gui interface for the polyhedron
        const polyhedronFolder = this.datgui.addFolder( 'Polyhedron' );
        polyhedronFolder.add(this.contents, 'polyhedronRadius', 0, 10).name("Radius").onChange( () => { this.contents.rebuildPolyhedron() } );
        polyhedronFolder.add(this.contents, 'polyhedronDetail', 0, 5, 1).name("Detail").onChange( () => { this.contents.rebuildPolyhedron() } );
        polyhedronFolder.add(this.contents, 'polyhedronEnabled', true).name("Enabled");
        polyhedronFolder.close();
        
        const data = {  
            'diffuse color': this.contents.diffusePlaneColor,
            'specular color': this.contents.specularPlaneColor,
        };

        // adds a folder to the gui interface for the plane
        const planeFolder = this.datgui.addFolder( 'Plane' );
        planeFolder.addColor( data, 'diffuse color' ).onChange( (value) => { this.contents.updateDiffusePlaneColor(value) } );
        planeFolder.addColor( data, 'specular color' ).onChange( (value) => { this.contents.updateSpecularPlaneColor(value) } );
        planeFolder.add(this.contents, 'planeShininess', 0, 1000).name("shininess").onChange( (value) => { this.contents.updatePlaneShininess(value) } );
        planeFolder.close();

        // adds a folder to the gui interface for the camera
        const cameraFolder = this.datgui.addFolder('Camera')
        cameraFolder.add(this.app, 'activeCameraName', [ 'Perspective', 'Perspective2', 'Left', 'Top', 'Front', 'Right', 'Back' ] ).name("active camera");
        // note that we are using a property from the app 
        cameraFolder.add(this.app.activeCamera.position, 'x', 0, 10).name("x coord")
        cameraFolder.close();

        const spotLightFolder = this.datgui.addFolder('Spot Light');
        spotLightFolder.addColor( this.contents.light3, 'color' ).name("Color");
        spotLightFolder.add(this.contents.light3, 'intensity', 0, 40).name("Intensity (cd)");
        spotLightFolder.add(this.contents.light3, 'distance', 0, 20).name("Distance").onChange(() => { this.contents.updateLight() } );
        spotLightFolder.add(this.contents, 'light3Angle', 0, 90).name("Ângulo (degrees)").onChange((value) => { this.contents.updateLightAngle(value) } );
        spotLightFolder.add(this.contents.light3, 'decay', 0, 5).name("Decay");
        spotLightFolder.add(this.contents.light3.position, 'x', -10, 10).name("Position X");
        spotLightFolder.add(this.contents.light3.position, 'y', -10, 10).name("Position Y");
        spotLightFolder.add(this.contents.light3.target.position, 'x', -10, 10).name("Target X");
        spotLightFolder.add(this.contents.light3.target.position, 'y', -10, 10).name("Target Y");
        spotLightFolder.close();

        const planeTextureFolder = this.datgui.addFolder('Plane Texture');
        planeTextureFolder.add(this.contents, 'wrappingModeS', ['Repeat', 'Clamp To Edge', 'Mirrored Repeat'] ).onChange( (value) => { this.contents.updateWrappingMode(value, 'S') } ).name("Wrapping Mode S");
        planeTextureFolder.add(this.contents, 'wrappingModeT', ['Repeat', 'Clamp To Edge', 'Mirrored Repeat'] ).onChange( (value) => { this.contents.updateWrappingMode(value, 'T') } ).name("Wrapping Mode T");
        planeTextureFolder.add(this.contents, 'planeTextureRepeatU', 1, 10).onChange( (value) => { this.contents.updateTextureRepeat(value, 'U') } ).name("Texture Repeat U");
        planeTextureFolder.add(this.contents, 'planeTextureRepeatV', 1, 10).onChange( (value) => { this.contents.updateTextureRepeat(value, 'V') } ).name("Texture Repeat V");
        planeTextureFolder.add(this.contents.planeTexture.offset, 'x', 0, 1).name("Offset U");
        planeTextureFolder.add(this.contents.planeTexture.offset, 'y', 0, 1).name("Offset V");
        planeTextureFolder.add(this.contents.planeTexture, 'rotation', 0, Math.PI * 2).name("Rotation");
        planeTextureFolder.close();

        // Add a folder for controlling the curved surface
        const surfaceFolder = this.datgui.addFolder('Curved Surface');
        surfaceFolder.add(this.contents, 'samplesU', 1, 16).name('Samples U').onChange(() => { this.contents.createNurbsSurfaces()} );
        surfaceFolder.add(this.contents, 'samplesV', 1, 16).name('Samples V').onChange(() => { this.contents.createNurbsSurfaces()} );;
        surfaceFolder.close();
    }
}

export { MyGuiInterface };