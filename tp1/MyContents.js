import * as THREE from 'three';
import { MyAxis } from './MyAxis.js';
import { MyNurbsBuilder } from './MyNurbsBuilder.js';

/**
 *  This class contains the contents of out application
 */

class MyContents  {

    /**
       constructs the object
       @param {MyApp} app The application object
    */ 
    constructor(app) {
        this.app = app;
        this.axis = null;

        // box related attributes
        this.boxMesh = null;
        this.boxMeshSize = 2.0;
        this.boxEnabled = false;
        this.lastBoxEnabled = null;
        this.boxDisplacement = new THREE.Vector3(0,4.5,0);

        // circle related attributes
        this.circleMesh = null;
        this.circleRadius = 2.0;
        this.circleSegments = 24;  
        this.circleEnabled = false;
        this.lastCircleEnabled = null;

        // sphere related attributes
        this.sphereMesh = null;
        this.sphereRadius = 2.0;
        this.sphereWidthSegments = 12;  
        this.sphereHeightSegments = 8;  
        this.sphereEnabled = false;
        this.lastSphereEnabled = null;

        // partial sphere related attributes
        this.partialSphereMesh = null;
        this.partialSphereRadius = 2.0;
        this.partialSphereWidthSegments = 12;  
        this.partialSphereHeightSegments = 8; 
        this.partialSpherePhiStart = Math.PI * 0.25;  
        this.partialSpherePhiLength = Math.PI * 1.5;  
        this.partialSphereThetaStart = Math.PI * 0.25;
        this.partialSphereThetaLength = Math.PI * 0.5;   
        this.partialSphereEnabled = false;
        this.lastPartialSphereEnabled = null;

        // cylinder related attributes
        this.cylinderMesh = null;
        this.cylinderRadiusTop = 4.0;
        this.cylinderRadiusBottom = 4.0;
        this.cylinderRadialSegments = 12;
        this.cylinderHeight = 8;
        this.cylinderEnabled = false;
        this.lastCylinderEnabled = null;

        // partial cylinder related attributes
        this.partialCylinderMesh = null;
        this.partialCylinderRadiusTop = 4.0;
        this.partialCylinderRadiusBottom = 4.0;
        this.partialCylinderRadialSegments = 12;
        this.partialCylinderHeight = 8;
        this.partialCylinderHeightSegments = 2;
        this.partialCylinderOpenEnded = false;
        this.partialCylinderThetaStart = Math.PI * 0.25;
        this.partialCylinderThetaLength = Math.PI * 1.5;
        this.partialCylinderEnabled = false;
        this.lastPartialCylinderEnabled = null;

        // cone related attributes
        this.coneMesh = null;
        this.coneRadius = 6.0;
        this.coneHeight = 8;
        this.coneRadialSegments = 16;
        this.coneEnabled = false;
        this.lastConeEnabled = null;

        // partial cone related attributes
        this.partialConeMesh = null;
        this.partialConeRadius = 6.0;
        this.partialConeHeight = 8;
        this.partialConeRadialSegments = 16;
        this.partialConeHeightSegments = 2;
        this.partialConeThetaStart = Math.PI * 0.25;  
        this.partialConeThetaLength = Math.PI * 0.5; 
        this.partialConeOpenEnded = false;
        this.partialConeEnabled = false;
        this.lastPartialConeEnabled = null;

        // polyhedron related attributes
        this.polyhedronVerticesOfCube = [
            - 1, - 1, - 1, 1, - 1, - 1, 1, 1, - 1, - 1, 1, - 1,
            - 1, - 1, 1, 1, - 1, 1, 1, 1, 1, - 1, 1, 1,
        ];
        this.polyhedronIndicesOfFaces = [
            2, 1, 0, 0, 3, 2,
            0, 4, 7, 7, 3, 0,
            0, 1, 5, 5, 4, 0,
            1, 2, 6, 6, 5, 1,
            2, 3, 7, 7, 6, 2,
            4, 5, 6, 6, 7, 4,
        ];
        this.polyhedronMesh = null;
        this.polyhedronRadius = 7.0;
        this.polyhedronDetail = 2;
        this.polyhedronEnabled = false;
        this.lastPolyhedronEnabled = null;

        this.light3 = null;
        this.light3Angle = 70;

        // plane related attributes
        //texture
        this.planeTexture = new THREE.TextureLoader().load('textures/floor.avif');
        this.planeTexture.wrapS = THREE.RepeatWrapping;
        this.planeTexture.wrapT = THREE.RepeatWrapping;

        // Plane
        this.diffusePlaneColor =  "rgb(128,128,128)"
        this.specularPlaneColor = "rgb(0,0,0)"
        this.planeShininess = 0
        // alternative 1
        /*this.planeMaterial = new THREE.MeshPhongMaterial({
            color: this.diffusePlaneColor,
            specular: this.specularPlaneColor,
            emissive: "#000000", shininess: this.planeShininess,
            map: this.planeTexture 
        })*/
        // alternative 2
        this.planeMaterial = new THREE.MeshLambertMaterial({
            map : this.planeTexture });

        let plane = new THREE.PlaneGeometry( 10, 10 );

        // Scene Sizes

        // walls
        this.wallWidth = 10;
        this.wallHeight = 8;
        // table top
        this.tableTopWidth = 4;
        this.tableTopHeight = 0.4;
        this.tableTopDepth = 4;
        this.tableTexture = new THREE.TextureLoader().load('textures/wood.avif');
        // table legs
        this.tableLegHeight = 2;
        this.tableLegRadius = 0.2;
        this.tableLegRadialSegments = 12;
        this.tableLegHeightSegments = 12;
        // plate
        this.plateRadiusTop = 0.6;
        this.plateRadiusBottom = 0.5;
        this.plateHeight = 0.1;
        this.plateRadialSegments = 50;
        this.plateHeightSegments = 6;
        // cake
        this.cakeRadius = 0.5;
        this.cakeHeight = 0.3;
        this.cakeRadialSegments = 50;
        this.cakeHeightSegments = 6;
        this.cakeThetaStart = 0;
        this.cakeThetaLength = Math.PI * 1.75;
        this.candleRadius = 0.025;
        this.candleHeight = 0.2;
        this.candleRadialSegments = 50;
        this.candleHeightSegments = 6;
        this.flameHeight = 0.05;
        // chair legs
        this.chairLegWidth = 0.2; 
        this.chairLegHeight = 1; 
        this.chairLegDepth = 0.2;
        this.chairLegWidthSegments = 10;
        this.chairLegHeightSegments = 10;
        this.chairLegDepthSegments = 10;  
        // chair seat
        this.chairSeatRadius = 0.9;
        this.chairSeatHeight = 0.15;
        this.chairSeatRadialSegments = 15;
        this.chairSeatHeightSegments = 6;
        this.chairSeatThetaStart = 0;
        this.chairSeatThetaLength = 2 * Math.PI;
        this.chairTexture = new THREE.TextureLoader().load('textures/wood.avif');
        // chair rest
        this.chairComponent1Width = 0.15; 
        this.chairComponent1Height = 1;
        this.chairComponent1Depth = 0.15;
        this.chairComponent1WidthSegments = 10;
        this.chairComponent1HeightSegments = 10;
        this.chairComponent1DepthSegments   = 10;
        this.chairComponent2Radius = (this.chairSeatRadius / 1.7) + (this.chairComponent1Depth / 2);
        this.chairComponent2Height = 0.15;
        this.chairComponent2RadialSegments = 50;
        this.chairComponent2HeightSegments = 6;
        this.chairComponent2ThetaStart = 0;
        this.chairComponent2ThetaLength = Math.PI;
        // frame border
        this.frameBorderWidth = 0.1;
        this.frameBorderHeight = 1.5;
        this.frameBorderDepth = 0.05; 
        this.frameBorderWidthSegments = 10;
        this.frameBorderHeightSegments = 10;
        this.frameBorderDepthSegments = 10;
        // frame background
        this.frameBackgroundWidth = 1.5;
        // window background
        this.windowBackgroundRadius = 1.75;
        this.windowBackgroundSegments = 32;
        this.windowTexture = new THREE.TextureLoader().load('textures/landscape.jpeg');
        // window border
        this.windowBorderRadius = this.windowBackgroundRadius;
        this.windowBorderHeight = 0.2;
        this.windowBorderRadialSegments = 50;
        this.windowBorderHeightSegments = 6;
        this.windowBorderThetaStart = 0;
        this.windowBorderThetaLength = 2 * Math.PI;
        // window dividers
        this.windowDidiversWidth = 0.3;
        this.windowDidiversHeight = this.windowBorderRadius * 2 - 0.018;
        this.windowDidiversDepth = 0.1; 
        this.windowDidiversWidthSegments = 10;
        this.windowDidiversHeightSegments = 10;
        this.windowDidiversDepthSegments = 10;
        // Door
        this.doorTexture = new THREE.TextureLoader().load('textures/door.webp');
        this.doorWidth = 0.05;
        this.doorHeight = 7;
        this.doorDepth = 3.5; 
        this.doorWidthSegments = 10;
        this.doorHeightSegments = 10;
        this.doorDepthSegments = 10;
        // Door handle
        this.doorHandleTexture = new THREE.TextureLoader().load('textures/alum.jpg');
        this.doorHandleCylinderRadius = 0.08;
        this.doorHandleCylinderHeight = 0.1;
        this.doorHandleCylinderRadialSegments = 10;
        this.doorHandleSphereRadius = 0.15;
        this.doorHandleSphereWidthSegments = 10;
        this.doorHandleSphereHeightSegments = 10;
        // Light bulb
        this.lightBulbTexture = new THREE.TextureLoader().load('textures/alum.jpg');
        this.lightBulbWidth = 0.1;
        this.lightBulbHeight = 0.5;
        this.lightBulbDepth = 1;
        this.lightBulbWidthSegments = 10;
        this.lightBulbHeightSegments = 10;
        this.lightBulbDepthSegments = 10;

        const map = new THREE.TextureLoader().load( 'textures/uv_grid_opengl.jpg' );
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        map.anisotropy = 16;
        map.colorSpace = THREE.SRGBColorSpace;
        this.material = new THREE.MeshLambertMaterial( { 
                        map: map,
                        side: THREE.DoubleSide,
                        transparent: true, 
                        opacity: 0.90 
                    } );
        //this.builder = new MyNurbsBuilder();
        //this.meshes = [];
        this.samplesU = 8;         // maximum defined in MyGuiInterface
        this.samplesV = 8;         // maximum defined in MyGuiInterface

        // Newspaper
        const newspaperMap = new THREE.TextureLoader().load( 'textures/newspaper.jpg' );
        newspaperMap.wrapS = newspaperMap.wrapT = THREE.RepeatWrapping;
        newspaperMap.anisotropy = 16;
        newspaperMap.colorSpace = THREE.SRGBColorSpace;
        this.newspaperMaterial = new THREE.MeshLambertMaterial( { 
                        map: newspaperMap,
                        side: THREE.DoubleSide,
                        transparent: true, 
                        opacity: 0.90 
                    } );

        // Flower Jar
        const flowerJarMap = new THREE.TextureLoader().load( 'textures/flower_jar.avif' );
        flowerJarMap.wrapS = flowerJarMap.wrapT = THREE.RepeatWrapping;
        flowerJarMap.anisotropy = 16;
        flowerJarMap.colorSpace = THREE.SRGBColorSpace;
        this.flowerJarMaterial = new THREE.MeshLambertMaterial( { 
                        map: flowerJarMap,
                        side: THREE.DoubleSide,
                        transparent: false, 
                        opacity: 0.90 
                    } );

        this.builder = new MyNurbsBuilder();
        this.meshes = [];
        //this.init();
    }

    /**
     * builds the box mesh with material assigned
     */
    buildBox() {    

        //texture
        this.boxTexture = new THREE.TextureLoader().load('textures/feup_entry.jpg');
        this.boxTexture.wrapS = THREE.RepeatWrapping;
        this.boxTexture.wrapT = THREE.RepeatWrapping;

        // material
        this.diffuseBoxColor =  "ffff77"
        this.specularBoxColor = "rgb(0,0,0)"
        this.boxShininess = 90

        this.boxMaterial = new THREE.MeshLambertMaterial({
            map : this.boxTexture });

        var box = new THREE.BoxGeometry( this.boxMeshSize, this.boxMeshSize, this.boxMeshSize);
        this.boxMesh = new THREE.Mesh( box, this.boxMaterial );
        this.boxMesh.rotation.x = -Math.PI / 2;
        this.boxMesh.position.y = this.boxDisplacement.y;
    }

    buildCircle() {
        let circleMaterial = new THREE.MeshPhongMaterial({
            color: "#ffff77", 
            specular: "#000000", 
            emissive: "#000000", 
            shininess: 90 
        });

        let circle = new THREE.CircleGeometry(this.circleRadius, this.circleSegments);
        this.circleMesh = new THREE.Mesh(circle, circleMaterial);
        this.circleMesh.rotation.x = -Math.PI / 4;
        this.circleMesh.position.y = 4;
    }

    buildSphere() {
        let sphereMaterial = new THREE.MeshPhongMaterial({ color: "#ffff77", 
        specular: "#000000", emissive: "#000000", shininess: 90 })

        let sphere = new THREE.SphereGeometry( this.sphereRadius, this.sphereWidthSegments, this.sphereHeightSegments );
        this.sphereMesh = new THREE.Mesh( sphere, sphereMaterial );
        this.sphereMesh.position.y = 6;
    }

    buildPartialSphere() {
        let partialSphereMaterial = new THREE.MeshPhongMaterial({ color: "#ffff77", 
        specular: "#000000", emissive: "#000000", shininess: 90 })

        let partialSphere = new THREE.SphereGeometry(
            this.partialSphereRadius,
            this.partialSphereWidthSegments, this.partialSphereHeightSegments,
            this.partialSpherePhiStart, this.partialSpherePhiLength,
            this.partialSphereThetaStart, this.partialSphereThetaLength );
        this.partialSphereMesh = new THREE.Mesh( partialSphere, partialSphereMaterial );
        this.partialSphereMesh.position.y = 6;
    }

    buildCylinder() {
        let cylinderMaterial = new THREE.MeshPhongMaterial({ color: "#ffff77", 
        specular: "#000000", emissive: "#000000", shininess: 90 })

        let cylinder = new THREE.CylinderGeometry(
            this.cylinderRadiusTop, this.cylinderRadiusBottom, this.cylinderHeight, this.cylinderRadialSegments );
        this.cylinderMesh = new THREE.Mesh( cylinder, cylinderMaterial );
        this.cylinderMesh.position.y = 8;
    }

    buildPartialCylinder() {
        let partialCylinderMaterial = new THREE.MeshPhongMaterial({ color: "#ffff77", 
        specular: "#000000", emissive: "#000000", shininess: 90 })

        let partialCylinder = new THREE.CylinderGeometry(
            this.partialCylinderRadiusTop, this.partialCylinderRadiusBottom, this.partialCylinderHeight,
            this.partialCylinderRadialSegments, this.partialCylinderHeightSegments,
            this.partialCylinderOpenEnded,
            this.partialCylinderThetaStart, this.partialCylinderThetaLength );
        this.partialCylinderMesh = new THREE.Mesh( partialCylinder, partialCylinderMaterial );
        this.partialCylinderMesh.position.y = 8;
    }

    buildCone() {
        let coneMaterial = new THREE.MeshPhongMaterial({ color: "#ffff77", 
        specular: "#000000", emissive: "#000000", shininess: 90 })

        let cone = new THREE.ConeGeometry( this.coneRadius, this.coneHeight, this.coneRadialSegments );
        this.coneMesh = new THREE.Mesh( cone, coneMaterial );
        this.coneMesh.position.y = 8;
    }

    buildPartialCone() {
        let partialConeMaterial = new THREE.MeshPhongMaterial({ color: "#ffff77", 
        specular: "#000000", emissive: "#000000", shininess: 90 })

        let partialCone = new THREE.ConeGeometry(
            this.partialConeRadius, this.partialConeHeight,
            this.partialConeRadialSegments, this.partialConeHeightSegments,
            this.partialConeOpenEnded,
            this.partialConeThetaStart, this.partialConeThetaLength );
        this.partialConeMesh = new THREE.Mesh( partialCone, partialConeMaterial );
        this.partialConeMesh.position.y = 8;
    }

    buildPolyhedron() {
        let polyhedronMaterial = new THREE.MeshPhongMaterial({ color: "#ffff77", 
        specular: "#000000", emissive: "#000000", shininess: 90 })

        let polyhedron = new THREE.PolyhedronGeometry(
            this.polyhedronVerticesOfCube, this.polyhedronIndicesOfFaces, this.polyhedronRadius, this.polyhedronDetail );
        this.polyhedronMesh = new THREE.Mesh( polyhedron, polyhedronMaterial );
        this.polyhedronMesh.position.y = 8;
    }

    buildWall(wall) {
        // Diffuse material
        let wallMaterial = new THREE.MeshLambertMaterial({
            color : "#253342" });

        let wallGeometry = new THREE.PlaneGeometry( this.wallWidth, this.wallHeight );
        let wallMesh = new THREE.Mesh( wallGeometry, wallMaterial );
        switch (wall) {
            case 1:
                wallMesh.position.x = -(this.wallWidth / 2);
                wallMesh.position.y = this.wallHeight / 2;
                wallMesh.rotation.y = Math.PI / 2;
                break;
            case 2:
                wallMesh.position.z = -(this.wallWidth / 2);
                wallMesh.position.y = this.wallHeight / 2;
                break;
            case 3:
                wallMesh.position.x = (this.wallWidth / 2);
                wallMesh.position.y = this.wallHeight / 2;
                wallMesh.rotation.y = -Math.PI / 2;
                wallMesh.receiveShadow = true;
                wallMesh.castShadow = true;
                break;
            case 4:
                wallMesh.position.z = (this.wallWidth / 2);
                wallMesh.position.y = this.wallHeight / 2;
                wallMesh.rotation.y = Math.PI;
                break;
        }
        this.app.scene.add( wallMesh );
    }

    buildTop() {
        let topGeometry = new THREE.BoxGeometry( this.tableTopWidth, this.tableTopHeight, this.tableTopDepth );
        let topMesh = new THREE.Mesh( topGeometry, this.tableMaterial );
        topMesh.position.x = 0;
        topMesh.position.y = this.tableLegHeight + (this.tableTopHeight / 2);
        topMesh.receiveShadow = true;
        topMesh.castShadow = true;
        this.app.scene.add( topMesh );
    }

    buildLeg(leg) {
        let legGeometry = new THREE.CylinderGeometry( 
            this.tableLegRadius, 
            this.tableLegRadius, 
            this.tableLegHeight, 
            this.tableLegRadialSegments,
            this.tableLegHeightSegments    
        );
        let legMesh = new THREE.Mesh( legGeometry, this.tableMaterial );
        // 1  4
        // 2  3
        switch (leg) {
            case 1:
                legMesh.position.x = -((this.tableTopWidth / 2) - this.tableLegRadius);
                legMesh.position.y = this.tableLegHeight / 2;
                legMesh.position.z = -((this.tableTopDepth / 2) - this.tableLegRadius);
                break;
            case 2:
                legMesh.position.x = -((this.tableTopWidth / 2) - this.tableLegRadius);
                legMesh.position.y = this.tableLegHeight / 2;
                legMesh.position.z = ((this.tableTopDepth / 2) - this.tableLegRadius);
                break;
            case 3:
                legMesh.position.x = ((this.tableTopWidth / 2) - this.tableLegRadius);
                legMesh.position.y = this.tableLegHeight / 2;
                legMesh.position.z = ((this.tableTopDepth / 2) - this.tableLegRadius);
                break;
            case 4:
                legMesh.position.x = ((this.tableTopWidth / 2) - this.tableLegRadius);
                legMesh.position.y = this.tableLegHeight / 2;
                legMesh.position.z = -((this.tableTopDepth / 2) - this.tableLegRadius);
                break;
        }
        legMesh.receiveShadow = true;
        legMesh.castShadow = true;
        this.app.scene.add( legMesh );
    }

    buildTable() {

        this.tableMaterial = new THREE.MeshPhongMaterial({
            color: "#ffffff",
            specular: "#ffffff",
            emissive: "#000000", 
            shininess: 90,
            map: this.tableTexture 
        })

        this.buildTop();
        // left (1); back (2); right (3); front (4);
        this.buildLeg(1);
        this.buildLeg(2);
        this.buildLeg(3);
        this.buildLeg(4);
    }

    buildPlate() {
        let plateMaterial = new THREE.MeshPhongMaterial({ 
            color: "#ffffff", 
            specular: "#000000", 
            emissive: "#000000", 
            shininess: 90 
        })

        let plateGeometry = new THREE.CylinderGeometry( 
            this.plateRadiusTop, 
            this.plateRadiusBottom, 
            this.plateHeight, 
            this.plateRadialSegments,
            this.plateHeightSegments    
        );
        let plateMesh = new THREE.Mesh( plateGeometry, plateMaterial );
        plateMesh.position.y = this.tableLegHeight + this.tableTopHeight + (this.plateHeight / 2);
        plateMesh.receiveShadow = true;
        plateMesh.castShadow = true;
        this.app.scene.add( plateMesh );
    }

    buildCandle() {
        let bodyMaterial = new THREE.MeshPhongMaterial({ 
            color: "#ffffff", 
            specular: "#000000", 
            emissive: "#000000", 
            shininess: 90 
        })

        let bodyGeometry = new THREE.CylinderGeometry( 
            this.candleRadius, 
            this.candleRadius, 
            this.candleHeight, 
            this.candleRadialSegments,
            this.candleHeightSegments 
        );
        let bodyMesh = new THREE.Mesh( bodyGeometry, bodyMaterial );
        bodyMesh.position.y = this.tableLegHeight + this.tableTopHeight + this.plateHeight + this.cakeHeight + (this.candleHeight / 2);
        bodyMesh.receiveShadow = true;
        bodyMesh.castShadow = true;
        this.app.scene.add( bodyMesh );

        let flameMaterial = new THREE.MeshPhongMaterial({
            color: "#990000", 
            specular: "#000000", 
            emissive: "#000000", 
            shininess: 90 
        })

        let flameGeometry = new THREE.ConeGeometry( 
            this.candleRadius,
            this.flameHeight,
            this.candleRadialSegments
        );
        let flameMesh = new THREE.Mesh( flameGeometry, flameMaterial );
        flameMesh.position.y = this.tableLegHeight + this.tableTopHeight + this.plateHeight + this.cakeHeight + this.candleHeight + (this.flameHeight / 2);
        this.app.scene.add( flameMesh );
    }

    buildCakeInterior(cakeMaterial, cakeMesh, position) {

        let cakeInteriorGeometry = new THREE.PlaneGeometry( this.cakeRadius, this.cakeHeight );
        let cakeInteriorMesh = new THREE.Mesh( cakeInteriorGeometry, cakeMaterial );
        switch (position) {
            case 1:
                cakeInteriorMesh.position.x = 0;
                cakeInteriorMesh.position.y = 0;
                cakeInteriorMesh.position.z = this.cakeRadius / 2;
                cakeInteriorMesh.rotation.y = -Math.PI / 2;
                break;
            case 2:
                cakeInteriorMesh.rotation.y = Math.PI / 4;
                cakeInteriorMesh.position.y = 0;
                cakeInteriorMesh.position.x = -this.cakeRadius / (2 * Math.sqrt(2));
                cakeInteriorMesh.position.z = this.cakeRadius / (2 * Math.sqrt(2));
            
                break;
        }
        cakeMesh.add( cakeInteriorMesh );
    }

    buildCake() {
        let cakeMaterial = new THREE.MeshPhongMaterial({ 
            color: "#ff7e82", 
            specular: "#000000", 
            emissive: "#000000", 
            shininess: 90 
        })

        let cakeGeometry = new THREE.CylinderGeometry( 
            this.cakeRadius, 
            this.cakeRadius, 
            this.cakeHeight, 
            this.cakeRadialSegments,
            this.cakeHeightSegments,
            false,
            this.cakeThetaStart,
            this.cakeThetaLength   
        );
        let cakeMesh = new THREE.Mesh( cakeGeometry, cakeMaterial );
        cakeMesh.position.y = this.tableLegHeight + this.tableTopHeight + this.plateHeight + (this.cakeHeight / 2);
        cakeMesh.receiveShadow = true;
        cakeMesh.castShadow = true;
        this.app.scene.add( cakeMesh );

        this.buildCakeInterior(cakeMaterial, cakeMesh, 1);
        this.buildCakeInterior(cakeMaterial, cakeMesh, 2);

        this.buildCandle();
    }

    buildChairLeg(leg, chairSeatMesh) {
        let chairLegGeometry = new THREE.BoxGeometry( 
            this.chairLegWidth, 
            this.chairLegHeight,
            this.chairLegDepth, 
            this.chairLegWidthSegments, 
            this.chairLegHeightSegments,
            this.chairLegDepthSegments    
        );
        let chairLegMesh = new THREE.Mesh( chairLegGeometry, this.chairMaterial );
        // 1  4
        // 2  3
        switch (leg) {
            case 1:
                chairLegMesh.position.x = -(this.chairSeatRadius / 2);
                chairLegMesh.position.y = -(this.chairLegHeight / 2) - (this.chairSeatHeight / 2);
                chairLegMesh.position.z = (this.chairSeatRadius / 2.5);
                break;
            case 2:
                chairLegMesh.position.x = -(this.chairSeatRadius / 2);
                chairLegMesh.position.y = -(this.chairLegHeight / 2) - (this.chairSeatHeight / 2);
                chairLegMesh.position.z = -(this.chairSeatRadius / 2.5);
                break;
            case 3:
                chairLegMesh.position.x = (this.chairSeatRadius / 2);
                chairLegMesh.position.y = -(this.chairLegHeight / 2) - (this.chairSeatHeight / 2);
                chairLegMesh.position.z = (this.chairSeatRadius / 2.5);
                break;
            case 4:
                chairLegMesh.position.x = (this.chairSeatRadius / 2);
                chairLegMesh.position.y = -(this.chairLegHeight / 2) - (this.chairSeatHeight / 2);
                chairLegMesh.position.z = -(this.chairSeatRadius / 2.5);
                break;
        }
        chairLegMesh.receiveShadow = true;
        chairLegMesh.castShadow = true;
        chairSeatMesh.add( chairLegMesh );
    }

    buildChairRest(chairSeatMesh){
        this.buildCharRestComponents(1, this.chairMaterial, chairSeatMesh);
        this.buildCharRestComponents(2, this.chairMaterial, chairSeatMesh);

        let chairComponent2Geometry = new THREE.CylinderGeometry( 
            this.chairComponent2Radius, 
            this.chairComponent2Radius, 
            this.chairComponent2Height, 
            this.chairComponent2RadialSegments,
            this.chairComponent2HeightSegments,
            false,
            this.chairComponent2ThetaStart,
            this.chairComponent2ThetaLength   
        );
        let chairComponent2Mesh = new THREE.Mesh( chairComponent2Geometry, this.chairMaterial );

        chairComponent2Mesh.position.y = this.chairComponent1Height + this.chairSeatHeight / 2;
        chairComponent2Mesh.position.z = -this.chairSeatRadius / 1.7;
        chairComponent2Mesh.rotation.y = Math.PI / 2;
        chairComponent2Mesh.rotation.z = Math.PI / 2;

        chairSeatMesh.add( chairComponent2Mesh );

        // Need to cover bottom of the cylinder
        let chairComponent2InteriorGeometry = new THREE.PlaneGeometry( this.chairComponent2Height, this.chairComponent2Radius * 2 );
        let chairComponent2InteriorMesh = new THREE.Mesh( chairComponent2InteriorGeometry, this.chairMaterial );
        chairComponent2Mesh.add(chairComponent2InteriorMesh);
        chairComponent2InteriorMesh.rotation.y = -Math.PI / 2;
        chairComponent2InteriorMesh.rotation.z = Math.PI / 2;
    }

    buildCharRestComponents(component, material, parentMesh){
        let chairComponent1Geometry = new THREE.BoxGeometry( 
            this.chairComponent1Width, 
            this.chairComponent1Height,
            this.chairComponent1Depth, 
            this.chairComponent1WidthSegments, 
            this.chairComponent1HeightSegments,
            this.chairComponent1DepthSegments    
        );
        let chairComponent1Mesh = new THREE.Mesh( chairComponent1Geometry, material );

        switch (component) {
            case 1:
                chairComponent1Mesh.position.x = -this.chairSeatRadius / 1.7;
                chairComponent1Mesh.position.y = this.chairComponent1Height / 2 + this.chairSeatHeight / 2;
                chairComponent1Mesh.position.z = -this.chairSeatRadius / 1.7;
                break;
            case 2:
                chairComponent1Mesh.position.x = this.chairSeatRadius / 1.7;
                chairComponent1Mesh.position.y = this.chairComponent1Height / 2 + this.chairSeatHeight / 2;
                chairComponent1Mesh.position.z = -this.chairSeatRadius / 1.7;
                break;
        }

        chairComponent1Mesh.receiveShadow = true;
        chairComponent1Mesh.castShadow = true;
        parentMesh.add( chairComponent1Mesh );
    }

    buildChair(){
        this.chairMaterial = new THREE.MeshLambertMaterial({
            map : this.tableTexture });

        let chairSeatGeometry = new THREE.CylinderGeometry( 
            this.chairSeatRadius, 
            this.chairSeatRadius, 
            this.chairSeatHeight, 
            this.chairSeatRadialSegments,
            this.chairSeatHeightSegments,
            false,
            this.chairSeatThetaStart,
            this.chairSeatThetaLength   
        );
        let chairSeatMesh = new THREE.Mesh( chairSeatGeometry, this.chairMaterial );
        chairSeatMesh.position.y = this.chairLegHeight + (this.chairSeatHeight / 2);
        chairSeatMesh.position.z = -((this.tableTopDepth / 2) - 0.5) -(this.tableTopWidth / 4.5) + (this.chairLegDepth);
        chairSeatMesh.receiveShadow = true;
        chairSeatMesh.castShadow = true;
        this.app.scene.add( chairSeatMesh );

        this.buildChairLeg(1, chairSeatMesh);
        this.buildChairLeg(2, chairSeatMesh);
        this.buildChairLeg(3, chairSeatMesh);
        this.buildChairLeg(4, chairSeatMesh);
        this.buildChairRest(chairSeatMesh);
    }

    buildFrames(){
        // Frame Backgrounds
        this.diogoPhoto = new THREE.MeshLambertMaterial({
            map : new THREE.TextureLoader().load('textures/diogo.jpg') });
        this.rodrigoPhoto = new THREE.MeshLambertMaterial({
            map : new THREE.TextureLoader().load('textures/rodrigo.jpg') });

        let frameBackgroundGeometry = new THREE.PlaneGeometry( this.frameBackgroundWidth, this.frameBackgroundWidth);
        // left
        let frameBackground1Mesh = new THREE.Mesh( frameBackgroundGeometry, this.diogoPhoto );
        // right
        let frameBackground2Mesh = new THREE.Mesh( frameBackgroundGeometry, this.rodrigoPhoto );
        
        frameBackground1Mesh.position.x = -this.wallWidth/4;
        frameBackground1Mesh.position.y = this.wallHeight/2;
        frameBackground1Mesh.position.z = -this.wallWidth/2 + 0.01;

        frameBackground2Mesh.position.x = this.wallWidth/4;
        frameBackground2Mesh.position.y = this.wallHeight/2;
        frameBackground2Mesh.position.z = -this.wallWidth/2 + 0.01;

        this.app.scene.add( frameBackground1Mesh );
        this.app.scene.add( frameBackground2Mesh );

        // Frame Borders

        let frameBorderMaterial = new THREE.MeshPhongMaterial({ 
            color: "#C0C0C0", 
            specular: "#000000", 
            emissive: "#000000", 
            shininess: 90 
        });

        let frameBorderGeometry = new THREE.BoxGeometry( 
            this.frameBorderWidth, 
            this.frameBorderHeight,
            this.frameBorderDepth, 
            this.frameBorderWidthSegments, 
            this.frameBorderHeightSegments,
            this.frameBorderDepthSegments    
        );

        this.buildFrameBorders(frameBorderMaterial, frameBorderGeometry, frameBackground1Mesh, frameBackground2Mesh);
    }

    buildFrameBorders(material, geometry, parentMesh1, parentMesh2){
        //left
        let frame1Top = new THREE.Mesh( geometry, material );
        frame1Top.position.y = this.frameBackgroundWidth / 2;
        frame1Top.position.z = this.frameBorderDepth / 2 - 0.01;
        frame1Top.rotation.z = Math.PI / 2;
        parentMesh1.add(frame1Top);

        let frame1Bottom = new THREE.Mesh( geometry, material );
        frame1Bottom.position.y = -this.frameBackgroundWidth / 2;
        frame1Bottom.position.z = this.frameBorderDepth / 2 - 0.01;
        frame1Bottom.rotation.z = Math.PI / 2;
        parentMesh1.add(frame1Bottom);

        let frame1Left = new THREE.Mesh( geometry, material );
        frame1Left.position.x = -this.frameBackgroundWidth / 2;
        frame1Left.position.z = this.frameBorderDepth / 2 - 0.01;
        parentMesh1.add(frame1Left);

        let frame1Right = new THREE.Mesh( geometry, material );
        frame1Right.position.x = this.frameBackgroundWidth / 2;
        frame1Right.position.z = this.frameBorderDepth / 2 - 0.01;
        parentMesh1.add(frame1Right);

        //right
        let frame2Top = new THREE.Mesh( geometry, material );
        frame2Top.position.y = this.frameBackgroundWidth / 2;
        frame2Top.position.z = this.frameBorderDepth / 2 - 0.01;
        frame2Top.rotation.z = Math.PI / 2;
        parentMesh2.add(frame2Top);

        let frame2Bottom = new THREE.Mesh( geometry, material );
        frame2Bottom.position.y = -this.frameBackgroundWidth / 2;
        frame2Bottom.position.z = this.frameBorderDepth / 2 - 0.01;
        frame2Bottom.rotation.z = Math.PI / 2;
        parentMesh2.add(frame2Bottom);

        let frame2Left = new THREE.Mesh( geometry, material );
        frame2Left.position.x = -this.frameBackgroundWidth / 2;
        frame2Left.position.z = this.frameBorderDepth / 2 - 0.01;
        parentMesh2.add(frame2Left);

        let frame2Right = new THREE.Mesh( geometry, material );
        frame2Right.position.x = this.frameBackgroundWidth / 2;
        frame2Right.position.z = this.frameBorderDepth / 2 - 0.01;
        parentMesh2.add(frame2Right);
    }

    buildWindow(){
        // Window Background
        this.landscape = new THREE.MeshLambertMaterial({
            map : this.windowTexture });

        let windowBackgroundGeometry = new THREE.CircleGeometry( this.windowBackgroundRadius, this.windowBackgroundSegments);
        let windowBackgroundMesh = new THREE.Mesh( windowBackgroundGeometry, this.landscape );

        windowBackgroundMesh.position.y = this.wallHeight/2;
        windowBackgroundMesh.position.z = this.wallWidth/2 - 0.01;
        windowBackgroundMesh.rotation.x = Math.PI;
        windowBackgroundMesh.rotation.z = Math.PI;

        this.app.scene.add( windowBackgroundMesh );

        let windowMaterial = new THREE.MeshPhongMaterial({ 
            color: "#C4A484", 
            specular: "#000000", 
            emissive: "#000000", 
            shininess: 90 
        });
        // Preencher por dentro
        windowMaterial.side = THREE.DoubleSide;

        this.buildWindowBorder(windowMaterial, windowBackgroundMesh);
        this.buildWindowDividers(windowMaterial, windowBackgroundMesh);
    }

    buildWindowBorder(windowMaterial, parentMesh){
        let windowBorderGeometry = new THREE.CylinderGeometry( 
            this.windowBorderRadius,
            this.windowBorderRadius,
            this.windowBorderHeight,
            this.windowBorderRadialSegments,
            this.windowBorderHeightSegments,
            true,
            this.windowBorderThetaStart,
            this.windowBorderThetaLength 
        );

        let windowBorderMesh = new THREE.Mesh( windowBorderGeometry, windowMaterial );
        windowBorderMesh.position.z = this.windowBorderHeight / 2 - 0.01;
        windowBorderMesh.rotation.x = Math.PI / 2;

        parentMesh.add(windowBorderMesh);
    }

    buildWindowDividers(windowMaterial, parentMesh){
        let windowDividersGeometry = new THREE.BoxGeometry( 
            this.windowDidiversWidth, 
            this.windowDidiversHeight,
            this.windowDidiversDepth, 
            this.windowDidiversWidthSegments, 
            this.windowDidiversHeightSegments,
            this.windowDidiversDepthSegments    
        );

        let windowDivider1Mesh = new THREE.Mesh( windowDividersGeometry, windowMaterial );
        windowDivider1Mesh.position.z = this.windowBorderHeight / 2 - 0.01;
        parentMesh.add(windowDivider1Mesh);

        let windowDivider2Mesh = new THREE.Mesh( windowDividersGeometry, windowMaterial );
        windowDivider2Mesh.position.z = this.windowBorderHeight / 2 - 0.01;
        windowDivider2Mesh.rotation.z = Math.PI / 2;
        parentMesh.add(windowDivider2Mesh);
    }

    buildDoor(){

        let doorMaterial = new THREE.MeshLambertMaterial({ 
            map: this.doorTexture
        })

        let doorGeometry = new THREE.BoxGeometry( 
            this.doorWidth,
            this.doorHeight,
            this.doorDepth,
            this.doorWidthSegments,
            this.doorHeightSegments,
            this.doorDepthSegments
        );
        let doorMesh = new THREE.Mesh( doorGeometry, doorMaterial );
        doorMesh.position.set(this.wallWidth / 2 - this.doorWidth / 2, this.doorHeight / 2, this.wallWidth / 6);
        doorMesh.receiveShadow = true;
        doorMesh.castShadow = true;
        this.app.scene.add( doorMesh );

        // Handle
        let doorHandleMaterial = new THREE.MeshLambertMaterial({ 
            map: this.doorHandleTexture, 
        })

        let doorHandleCylinder = new THREE.CylinderGeometry(
            this.doorHandleCylinderRadius, 
            this.doorHandleCylinderRadius, 
            this.doorHandleCylinderHeight, 
            this.doorHandleCylinderRadialSegments 
            );
        this.doorHandleCylinderMesh = new THREE.Mesh( doorHandleCylinder, doorHandleMaterial );
        this.doorHandleCylinderMesh.rotation.z = Math.PI / 2;
        this.doorHandleCylinderMesh.position.set(-this.doorWidth / 2 - this.doorHandleCylinderHeight / 2, 0, -this.doorDepth / 3);
        doorMesh.add(this.doorHandleCylinderMesh);

        let doorHandleSphere = new THREE.SphereGeometry(
            this.doorHandleSphereRadius,
            this.doorHandleSphereWidthSegments, 
            this.doorHandleSphereHeightSegments
            );
        this.doorHandleSphereMesh = new THREE.Mesh( doorHandleSphere, doorHandleMaterial );
        this.doorHandleSphereMesh.position.set(-this.doorWidth / 2 - this.doorHandleCylinderHeight - this.doorHandleCylinderRadius, 0, -this.doorDepth / 3);
        doorMesh.add(this.doorHandleSphereMesh);
    }

    buildLightBulb(){

        let lightBulbMaterial = new THREE.MeshLambertMaterial({ 
            map: this.lightBulbTexture
        })

        let lightBulbGeometry = new THREE.BoxGeometry( 
            this.lightBulbWidth,
            this.lightBulbHeight,
            this.lightBulbDepth,
            this.lightBulbWidthSegments,
            this.lightBulbHeightSegments,
            this.lightBulbDepthSegments
        );
        let lightBulbMesh = new THREE.Mesh( lightBulbGeometry, lightBulbMaterial );
        lightBulbMesh.position.set(- this.wallWidth / 2 + this.lightBulbWidth / 2, 6, 0);
        this.app.scene.add( lightBulbMesh );

    }

    // Deletes the contents of the line if it exists and recreates them
    recompute() {
        //if (this.polyline !== null) this.app.scene.remove(this.polyline)
        //this.initPolyline()

        //if (this.quadraticBezierCurve !== null) this.app.scene.remove(this.quadraticBezierCurve)
        //this.initQuadraticBezierCurve()

        //if (this.cubicBezierCurve !== null) this.app.scene.remove(this.cubicBezierCurve)
        //this.initCubicBezierCurve()

        //if (this.catmullRomCurve !== null) this.app.scene.remove(this.catmullRomCurve)
        //this.initCatmullRomCurve()

        this.recomputeCar();
        this.recomputeFlower();
        this.recomputeSpring();
    }

    recomputeCar() {
        if (this.carBackWheel !== null) this.app.scene.remove(this.carBackWheel)
        if (this.carFrontWheel !== null) this.app.scene.remove(this.carFrontWheel)
        if (this.carBack !== null) this.app.scene.remove(this.carBack)
        if (this.carMid !== null) this.app.scene.remove(this.carMid)
        if (this.carFront !== null) this.app.scene.remove(this.carFront)
        this.initCar()
    }

    recomputeFlower(){
        if (this.flowerStem !== null) this.app.scene.remove(this.flowerStem)
        this.initFlower()
    }

    recomputeSpring(){
        if (this.spring !== null) this.app.scene.remove(this.spring)
        this.initSpring()
    }
    
    drawHull(position, points) {
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        let line = new THREE.Line( geometry, this.hullMaterial );

        // set initial position
        line.position.set(position.x,position.y,position.z)

        this.app.scene.add( line );
    }

    initPolyline() {
        // define vertex points
        let points = [
            new THREE.Vector3( -0.6, -0.6, 0.0 ),
            new THREE.Vector3(  0.6, -0.6, 1.0 ),
            new THREE.Vector3(  0.6,  0.6, 2.0 ),
            new THREE.Vector3( -0.6,  0.6, 3.0 )
        ]

        let points2 = [
            new THREE.Vector3( -0.2, -0.2, 0.0 ),
            new THREE.Vector3(  0.2, -0.2, 1.0 ),
            new THREE.Vector3(  0.2,  0.2, 1.0 ),
            new THREE.Vector3( -0.2,  0.2, 0.0 ),
            new THREE.Vector3( -0.2,  0.2, 2.0 )
        ]

        let position = new THREE.Vector3(0,0,0)
        let position2 = new THREE.Vector3(-4,4,0)

        this.drawHull(position, points);

        // define geometry
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        const geometry2 = new THREE.BufferGeometry().setFromPoints( points2 );

        // create the line from material and geometry
        this.polyline = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xff0000 } ) );

        this.polyline2 = new THREE.Line( geometry2, new THREE.LineBasicMaterial( { color: 0xff0000 } ) );

        // set initial position
        this.polyline.position.set(position.x,position.y,position.z)
        this.polyline2.position.set(position2.x,position2.y,position2.z)

        // add the line to the scene
        this.app.scene.add( this.polyline );
        this.app.scene.add( this.polyline2 );
    }

    initQuadraticBezierCurve() {
        let points = [
            new THREE.Vector3( -0.9, -0.6, 0.0 ), // starting point
            new THREE.Vector3(    0,  1.6, 1.0 ), // control point
            new THREE.Vector3(  0.6, -0.6, 2.0 )  // ending point
        ]
    
        let position = new THREE.Vector3(-2,4,0);
        this.drawHull(position, points);
    
        let curve = new THREE.QuadraticBezierCurve3( points[0], points[1], points[2])
    
        // sample a number of points on the curve
        let sampledPoints = curve.getPoints( this.numberOfSamples );
    
        this.curveGeometry = new THREE.BufferGeometry().setFromPoints( sampledPoints )
        this.lineMaterial = new THREE.LineBasicMaterial( { color: 0x00ff00 } )
        this.lineObj = new THREE.Line( this.curveGeometry, this.lineMaterial )
    
        this.lineObj.position.set(position.x,position.y,position.z)
        this.app.scene.add( this.lineObj );
    }

    initCubicBezierCurve() {
        let points = [
            new THREE.Vector3( -0.6, -0.6, 0.0 ),
            new THREE.Vector3( -0.6,  0.6, 1.0 ),
            new THREE.Vector3(  1.6, -0.6, 2.0 ),
            new THREE.Vector3(  0.6, 0.8, 3.0 )
        ]
    
        let position = new THREE.Vector3(-4,0,0);
        this.drawHull(position, points);
    
        let curve = new THREE.CubicBezierCurve3( points[0], points[1], points[2], points[3]);
    
        // sample a number of points on the curve
        let sampledPoints = curve.getPoints( this.numberOfSamples );
    
        this.curveGeometry = new THREE.BufferGeometry().setFromPoints( sampledPoints );
        this.lineMaterial = new THREE.LineBasicMaterial( { color: 0xff00ff } );
        this.lineObj = new THREE.Line( this.curveGeometry, this.lineMaterial );
    
        this.lineObj.position.set(position.x,position.y,position.z);
        this.app.scene.add( this.lineObj );
    }

    initCatmullRomCurve() {
        let points = [
            new THREE.Vector3( -0.6, 0.0, 0.0 ),
            new THREE.Vector3( -0.7,  0.6, 0.3 ),
            new THREE.Vector3(  0.0, 0.0, 2.0 ),
            new THREE.Vector3(  0.3, -0.6, 0.3 ),
            new THREE.Vector3(  0.6, 0.2, 0.0 ),
            new THREE.Vector3(  1.2, 0.6, 0.6 ),
            new THREE.Vector3(  1.2, 0.0, 0.3 ),
            new THREE.Vector3(  2.0, 0.0, 1.0 )
        ]
    
        let position = new THREE.Vector3(0,0,0)
        this.drawHull(position, points);
    
        let curve = new THREE.CatmullRomCurve3( points );
    
        // sample a number of points on the curve
        let sampledPoints = curve.getPoints( this.numberOfSamples );
    
        this.curveGeometry = new THREE.BufferGeometry().setFromPoints( sampledPoints );
        this.lineMaterial = new THREE.LineBasicMaterial( { color: 0xffff00 } );
        this.lineObj = new THREE.Line( this.curveGeometry, this.lineMaterial );
    
        this.lineObj.position.set(position.x,position.y,position.z)
        this.app.scene.add( this.lineObj );
    }

    /**
     * removes (if existing) and recreates the nurbs surfaces
     */

    createNurbsSurfaces() {  
        // are there any meshes to remove?
        if (this.meshes !== null) {
            // traverse mesh array
            for (let i=0; i<this.meshes.length; i++) {
                // remove all meshes from the scene
                this.app.scene.remove(this.meshes[i])
            }
            this.meshes = [] // empty the array  
        }
     
        // declare local variables
        let controlPoints;
        let surfaceData;
        let mesh;
        let orderU = 1
        let orderV = 1
        // build nurb #1
        controlPoints =
            [   // U = 0
                [ // V = 0..1;
                    [-2.0, -2.0, 0.0, 1 ],
                    [-2.0,  2.0, 0.0, 1 ]
                ],
                // U = 1
                [ // V = 0..1
                    [ 2.0, -2.0, 0.0, 1 ],
                    [ 2.0,  2.0, 0.0, 1 ]                                                
                ]
            ]
       
        surfaceData = this.builder.build(controlPoints,
                      orderU, orderV, this.samplesU,
                      this.samplesV, this.material)  
        mesh = new THREE.Mesh( surfaceData, this.material );
        mesh.rotation.x = 0
        mesh.rotation.y = 0
        mesh.rotation.z = 0
        mesh.scale.set( 1,1,1 )
        mesh.position.set( -4, 3, 0 )
        
        this.app.scene.add( mesh )
        this.meshes.push (mesh)
    }

    initCar() {
        // Frame for the car
        this.carFrameWidth = 0.05;
        this.carFrameHeight = 2.5;
        this.carFrameDepth = 4; 
        this.carFrameWidthSegments = 10;
        this.carFrameHeightSegments = 10;
        this.carFrameDepthSegments = 10;

        let carFrameMaterial = new THREE.MeshLambertMaterial({ 
            color: "#ffffff"
        })

        let carFrameGeometry = new THREE.BoxGeometry( 
            this.carFrameWidth,
            this.carFrameHeight,
            this.carFrameDepth,
            this.carFrameWidthSegments,
            this.carFrameHeightSegments,
            this.carFrameDepthSegments
        );
        let carFrameMesh = new THREE.Mesh( carFrameGeometry, carFrameMaterial );
        carFrameMesh.position.set(-this.wallWidth / 2 + this.carFrameWidth / 2, 4, 0);
        this.app.scene.add( carFrameMesh );

        // Car
        const car = new THREE.Group();

        this.initCarWheels(car);
        this.initCarBack(car);
        this.initCarMidAndFront(car);

        carFrameMesh.add( car );
        car.rotation.y = Math.PI / 2;
        car.position.set(this.carFrameWidth / 2 + 0.01, -this.carFrameHeight / 2 + 0.4, 2.4 * 0.75);
        car.scale.set(0.75, 0.75, 0);
    }

    initCarWheels(car){
        let radius = 0.9;
        let h = (4 / 3) * radius;

        let points = [
            new THREE.Vector3( 0.0, 0.0, 0.0 ),
            new THREE.Vector3( 0.0,  h, 0.0 ),
            new THREE.Vector3(  radius * 2, h, 0.0 ),
            new THREE.Vector3(  radius * 2, 0.0, 0.0 )
        ]
    
        let positionBack = new THREE.Vector3(0, 0, 0);
        let positionFront = new THREE.Vector3(1.2 + radius*2, 0, 0);
        //this.drawHull(position, points);
    
        let curve = new THREE.CubicBezierCurve3( points[0], points[1], points[2], points[3]);
    
        // sample a number of points on the curve
        let sampledPoints = curve.getPoints( this.numberOfSamples );
    
        this.curveGeometry = new THREE.BufferGeometry().setFromPoints( sampledPoints );
        this.lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 3 } );
        this.carBackWheel = new THREE.Line( this.curveGeometry, this.lineMaterial );
        this.carFrontWheel = new THREE.Line( this.curveGeometry, this.lineMaterial );
    
        this.carBackWheel.position.set(positionBack.x,positionBack.y,positionBack.z);
        this.carFrontWheel.position.set(positionFront.x,positionFront.y,positionFront.z);
        car.add(this.carBackWheel);
        car.add(this.carFrontWheel);
    }

    initCarBack(car){
        let radius = 2.4;
        let h = (4 / 3) * (Math.sqrt(2) - 1) * radius;

        let points = [
            new THREE.Vector3( 0.0, 0.0, 0.0 ),
            new THREE.Vector3( 0.0,  h, 0.0 ),
            new THREE.Vector3(  h, radius, 0.0 ),
            new THREE.Vector3(  radius, radius, 0.0 )
        ]
    
        let position = new THREE.Vector3(0, 0, 0);
        //this.drawHull(position, points);
    
        let curve = new THREE.CubicBezierCurve3( points[0], points[1], points[2], points[3]);
    
        // sample a number of points on the curve
        let sampledPoints = curve.getPoints( this.numberOfSamples );
    
        this.curveGeometry = new THREE.BufferGeometry().setFromPoints( sampledPoints );
        this.lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 3  } );
        this.carBack = new THREE.Line( this.curveGeometry, this.lineMaterial );
    
        this.carBack.position.set(position.x,position.y,position.z);
        car.add(this.carBack);
    }

    initCarMidAndFront(car){
        let radius = 1.2;
        let h = (4 / 3) * (Math.sqrt(2) - 1) * radius;

        let points = [
            new THREE.Vector3( 0.0, radius, 0.0 ),
            new THREE.Vector3( h,  radius, 0.0 ),
            new THREE.Vector3(  radius, h, 0.0 ),
            new THREE.Vector3(  radius, 0.0, 0.0 )
        ]
    
        let positionMid = new THREE.Vector3(2.4, 1.2, 0);
        let positionFront = new THREE.Vector3(3.6, 0, 0);
        //this.drawHull(position, points);
    
        let curve = new THREE.CubicBezierCurve3( points[0], points[1], points[2], points[3]);
    
        // sample a number of points on the curve
        let sampledPoints = curve.getPoints( this.numberOfSamples );
    
        this.curveGeometry = new THREE.BufferGeometry().setFromPoints( sampledPoints );
        this.lineMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 3  } );
        this.carMid = new THREE.Line( this.curveGeometry, this.lineMaterial );
        this.carFront = new THREE.Line( this.curveGeometry, this.lineMaterial );
    
        this.carMid.position.set(positionMid.x,positionMid.y,positionMid.z);
        this.carFront.position.set(positionFront.x,positionFront.y,positionFront.z);
        car.add(this.carMid);
        car.add(this.carFront);
    }

    initFlower(){
        let flowerBaseMaterial = new THREE.MeshLambertMaterial({
            color: "#ffff77", 
        });

        let flowerBaseRadius = 0.12;
        let flowerBaseSegments = 30;

        // Base Bottom
        let flowerBottomBaseGeometry = new THREE.CircleGeometry(flowerBaseRadius, flowerBaseSegments);
        this.flowerBottomBaseMesh = new THREE.Mesh(flowerBottomBaseGeometry, flowerBaseMaterial);
        this.flowerBottomBaseMesh.position.set(1.4, this.tableLegHeight + this.tableTopHeight + 1.25, 1.25);
        this.flowerBottomBaseMesh.rotation.x = Math.PI / 2;
        this.flowerBottomBaseMesh.rotation.y = -Math.PI / 12;
        this.flowerBottomBaseMesh.scale.set(0.75,0.75,0.75);
        this.flowerBottomBaseMesh.receiveShadow = true;
        this.flowerBottomBaseMesh.castShadow = true;
        this.app.scene.add(this.flowerBottomBaseMesh);

        // Base Top
        let flowerTopBaseGeometry = new THREE.SphereGeometry( flowerBaseRadius, flowerBaseSegments, flowerBaseSegments, 0, Math.PI * 2, 0, Math.PI / 2 );
        this.flowerTopBaseMesh = new THREE.Mesh(flowerTopBaseGeometry, flowerBaseMaterial);
        this.flowerTopBaseMesh.rotation.x = -Math.PI / 2;
        this.flowerTopBaseMesh.receiveShadow = true;
        this.flowerTopBaseMesh.castShadow = true;
        this.flowerBottomBaseMesh.add(this.flowerTopBaseMesh);

        // Petals
        const points = [];
        for ( let i = 0; i < 10; i ++ ) {
            points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
        }
        this.petalsGeometry = new THREE.LatheGeometry( points, 30, 0, Math.PI / 8);
        this.petalsMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
        this.petalsMesh = new THREE.Mesh( this.petalsGeometry, this.petalsMaterial );
        this.petalsMesh.scale.set(0.02, 0.005, 0.02);
        this.petalsMesh.rotation.x = -Math.PI / 2;
        this.petalsMesh.position.set(0, 0, -0.05);

        const numPetals = 12;
        this.petalsMeshes = [];
    
        for (let i = 0; i < numPetals; i++) {
            const angle = (i / numPetals) * Math.PI * 2;
            const petal = this.petalsMesh.clone();
            petal.rotation.y = angle;
            petal.receiveShadow = true;
            petal.castShadow = true;
            this.flowerBottomBaseMesh.add(petal);
            this.petalsMeshes.push(petal);
        }

        // Stem
        this.initFlowerStem(this.flowerBottomBaseMesh);
    }

    initFlowerStem(flowerBaseMesh){
        let points = [
            new THREE.Vector3( 0.0, 0.0, 0.0 ),
            new THREE.Vector3( 0.3,  0.5, 0.0 ),
            new THREE.Vector3(  -0.3, 1.0, 0.0 ),
            new THREE.Vector3(  0.0, 1.5, 0.0 )
        ]
    
        let position= new THREE.Vector3(0, 0, 1.5);
        //this.drawHull(position, points);
    
        let curve = new THREE.CubicBezierCurve3( points[0], points[1], points[2], points[3]);
    
        // sample a number of points on the curve
        let sampledPoints = curve.getPoints( this.numberOfSamples );
    
        this.curveGeometry = new THREE.BufferGeometry().setFromPoints( sampledPoints );
        this.lineMaterial = new THREE.LineBasicMaterial( { color: 0x013220, linewidth: 4  } );
        this.flowerStem = new THREE.Line( this.curveGeometry, this.lineMaterial );
    
        this.flowerStem.position.set(position.x,position.y,position.z);
        this.flowerStem.rotation.x = -Math.PI / 2;
        this.flowerStem.receiveShadow = true;
        this.flowerStem.castShadow = true;
        flowerBaseMesh.add(this.flowerStem);        
    }

    initSpring(){

        const points = [];
        const radius = 0.1;
        const height = 1;

        const numPoints = 200;
        const numCoils = 10;

        for (let i = 0; i < numPoints; i++) {
            let t = i / numPoints;
            let angle = 2 * Math.PI * numCoils * t;
            let x = radius * Math.cos(angle);
            let y = radius * Math.sin(angle);
            let z = t * height;

            points.push(new THREE.Vector3(x, y, z));
        }

        this.springGeometry = new THREE.BufferGeometry().setFromPoints( points );

        this.springMaterial = new THREE.LineBasicMaterial( { color: 0x808080, linewidth: 3 } );
        this.springObj = new THREE.Line( this.springGeometry, this.springMaterial );

        this.springObj.position.set(-1.25, this.tableLegHeight + this.tableTopHeight + radius, 0.75)
        this.springObj.receiveShadow = true;
        this.springObj.castShadow = true;
        this.app.scene.add(this.springObj);

    }

    removeMeshes() {
        // are there any meshes to remove?
        if (this.meshes !== null) {
            // traverse mesh array
            for (let i=0; i<this.meshes.length; i++) {
                // remove all meshes from the scene
                this.app.scene.remove(this.meshes[i])
            }
            this.meshes = [] // empty the array  
        }
    }

    createNewspaper() {
        let newspaperSamplesU = 24;
        let newspaperSamplesV = 24;
     
        // declare local variables
        let newspaperControlPoints;
        let newspaperSurfaceData;
        let newspaperMesh;
        let newspaperOrderU = 2
        let newspaperOrderV = 1
        newspaperControlPoints =
            [   // U = 0
                [ // V = 0..1;
                    [ -0.75, -1.0, 0.0, 1 ],
                    [ -0.75,  1.0, 0.0, 1 ]
                ],
                // U = 1
                [ // V = 0..1
                    [ 0, -1.0, 1.0, 1 ],
                    [ 0,  1.0, 1.0, 1 ]
                ],
                // U = 2
                [ // V = 0..1
                    [ 0.75, -1.0, 0.0, 1 ],
                    [ 0.75,  1.0, 0.0, 1 ]
                ]
            ];
       
        newspaperSurfaceData = this.builder.build(newspaperControlPoints,
                newspaperOrderU, newspaperOrderV, newspaperSamplesU,
                newspaperSamplesV, this.newspaperMaterial);
        newspaperMesh = new THREE.Mesh( newspaperSurfaceData, this.newspaperMaterial );
        newspaperMesh.scale.set(0.4, 0.4, 0.4);
        newspaperMesh.rotation.x = Math.PI/2;
        newspaperMesh.rotation.y = 0;
        newspaperMesh.rotation.z = Math.PI;
        newspaperMesh.position.set(1.40, 2.599999, -1.25);
        newspaperMesh.receiveShadow = true;
        newspaperMesh.castShadow = true;
        
        this.app.scene.add(newspaperMesh);
        this.meshes.push(newspaperMesh);
    }

    createFlowerJar() {
        let flowerSamplesU = 24;
        let flowerSamplesV = 24;
     
        // declare local variables
        let leftControlPoints;
        let leftSurfaceData;
        let leftMesh;
        let leftOrderU = 11
        let leftOrderV = 3
        // build nurb #1
        leftControlPoints =
            [   // U = 0
                [ // V = 0..3
                    [0, 0, -0.6, 1],
                    [0, 0, -0.6, 1],
                    [0, 0, 0.6, 1],
                    [0, 0, 0.6, 1],
                ],
                // U = 1
                [ // V = 0..3
                    [0, 0, -0.85, 1],
                    [1.20, 0, -0.85, 1],
                    [1.20, 0, 0.85, 1],
                    [0, 0, 0.85, 1],
                ],
                // U = 2
                [ // V = 0..3
                    [0, 0.2, -0.95, 1],
                    [1.25, 0.2, -0.95, 1],
                    [1.25, 0.2, 0.95, 1],
                    [0, 0.2, 0.95, 1],
                ],
                // U = 3
                [ // V = 0..3
                    [0, 0.4, -1 , 1],
                    [1.25, 0.4, -1, 1],
                    [1.25, 0.4, 1, 1],
                    [0, 0.4, 1, 1],
                ],
                // U = 4
                [ // V = 0..3
                    [0, 0.6, -0.95, 1],
                    [1, 0.6, -0.95, 1],
                    [1, 0.6, 0.95, 1],
                    [0, 0.6, 0.95, 1],
                ],
                // U = 5
                [ // V = 0..3
                    [0, 0.8, -0.85, 1],
                    [1, 0.8, -0.85, 1],
                    [1, 0.8, 0.85, 1],
                    [0, 0.8, 0.85, 1],
                ],
                // U = 6
                [ // V = 0..3
                    [0, 1, -0.6, 1],
                    [0.75, 1, -0.6, 1],
                    [0.75, 1, 0.6, 1],
                    [0, 1, 0.6, 1],
                ],
                // U = 7
                [ // V = 0..3
                    [0, 1.25, -0.4, 1],
                    [0.5, 1.25, -0.4, 1],
                    [0.5, 1.25, 0.4, 1],
                    [0, 1.25, 0.4, 1],
                ],
                // U = 8
                [ // V = 0..3
                    [0, 1.5, -0.45, 1],
                    [0.54, 1.5, -0.45, 1],
                    [0.54, 1.5, 0.45, 1],
                    [0, 1.5, 0.45, 1],
                ],
                // U = 9
                [ // V = 0..3
                    [0, 1.6, -0.5, 1],
                    [0.75, 1.6, -0.5, 1],
                    [0.75, 1.6, 0.5, 1],
                    [0, 1.6, 0.5, 1],
                ],
                // U = 10
                [ // V = 0..3
                    [0, 1.8, -0.6, 1],
                    [0.75, 1.8, -0.6, 1],
                    [0.75, 1.8, 0.6, 1],
                    [0, 1.8, 0.6, 1],
                ],
                // U = 11
                [ // V = 0..3
                    [0, 2, -0.5, 1],
                    [0.75, 2, -0.5, 1],
                    [0.75, 2, 0.5, 1],
                    [0, 2, 0.5, 1],
                ]
            ]
       
        leftSurfaceData = this.builder.build(leftControlPoints,
                leftOrderU, leftOrderV, flowerSamplesU,
                flowerSamplesV, this.flowerJarMaterial);
        leftMesh = new THREE.Mesh( leftSurfaceData, this.flowerJarMaterial );
        leftMesh.scale.set(0.4, 0.4, 0.4);
        leftMesh.rotation.x = 0;
        leftMesh.rotation.y = 0;
        leftMesh.rotation.z = 0;
        leftMesh.receiveShadow = true;
        leftMesh.castShadow = true;
        this.meshes.push(leftMesh);

        // Right Surface
        // declare local variables
        let rightControlPoints;
        let rightSurfaceData;
        let rightMesh;
        let rightOrderU = 11
        let rightOrderV = 3
        // build nurb #1
        rightControlPoints =
            [   // U = 0
                [ // V = 0..3
                    [0, 0, 0.6, 1],
                    [0, 0, 0.6, 1],
                    [0, 0, -0.6, 1],
                    [0, 0, -0.6, 1],
                ],
                // U = 1
                [ // V = 0..3
                    [0, 0, 0.85, 1],
                    [1.15, 0, 0.85, 1],
                    [1.15, 0, -0.85, 1],
                    [0, 0, -0.85, 1],
                ],
                // U = 2
                [ // V = 0..3
                    [0, 0.2, 0.95, 1],
                    [1.25, 0.2, 0.95, 1],
                    [1.25, 0.2, -0.95, 1],
                    [0, 0.2, -0.95, 1],
                ],
                // U = 3
                [ // V = 0..3
                    [0, 0.4, 1 , 1],
                    [1.25, 0.4, 1, 1],
                    [1.25, 0.4, -1, 1],
                    [0, 0.4, -1, 1],
                ],
                // U = 4
                [ // V = 0..3
                    [0, 0.6, 0.95, 1],
                    [1, 0.6, 0.95, 1],
                    [1, 0.6, -0.95, 1],
                    [0, 0.6, -0.95, 1],
                ],
                // U = 5
                [ // V = 0..3
                    [0, 0.8, 0.85, 1],
                    [1, 0.8, 0.85, 1],
                    [1, 0.8, -0.85, 1],
                    [0, 0.8, -0.85, 1],
                ],
                // U = 6
                [ // V = 0..3
                    [0, 1, 0.6, 1],
                    [0.75, 1, 0.6, 1],
                    [0.75, 1, -0.6, 1],
                    [0, 1, -0.6, 1],
                ],
                // U = 7
                [ // V = 0..3
                    [0, 1.25, 0.4, 1],
                    [0.5, 1.25, 0.4, 1],
                    [0.5, 1.25, -0.4, 1],
                    [0, 1.25, -0.4, 1],
                ],
                // U = 8
                [ // V = 0..3
                    [0, 1.5, 0.45, 1],
                    [0.54, 1.5, 0.45, 1],
                    [0.54, 1.5, -0.45, 1],
                    [0, 1.5, -0.45, 1],
                ],
                // U = 9
                [ // V = 0..3
                    [0, 1.6, 0.5, 1],
                    [0.75, 1.6, 0.5, 1],
                    [0.75, 1.6, -0.5, 1],
                    [0, 1.6, -0.5, 1],
                ],
                // U = 10
                [ // V = 0..3
                    [0, 1.8, 0.6, 1],
                    [0.75, 1.8, 0.6, 1],
                    [0.75, 1.8, -0.6, 1],
                    [0, 1.8, -0.6, 1],
                ],
                // U = 11
                [ // V = 0..3
                    [0, 2, 0.5, 1],
                    [0.75, 2, 0.5, 1],
                    [0.75, 2, -0.5, 1],
                    [0, 2, -0.5, 1],
                ]
            ]
       
        rightSurfaceData = this.builder.build(rightControlPoints,
                      rightOrderU, rightOrderV, flowerSamplesU,
                      flowerSamplesV, this.flowerJarMaterial);
        rightMesh = new THREE.Mesh(rightSurfaceData, this.flowerJarMaterial);
        rightMesh.rotation.x = 0;
        rightMesh.rotation.y = Math.PI;
        rightMesh.rotation.z = 0;
        rightMesh.scale.set(0.4, 0.4, 0.4);
        rightMesh.receiveShadow = true;
        rightMesh.castShadow = true;
        this.meshes.push(rightMesh);
            
        /*leftMesh.position.set(1.25, this.tableLegHeight + this.tableTopHeight, 1.25)
        rightMesh.position.set(1.25, this.tableLegHeight + this.tableTopHeight, 1.25)
        this.app.scene.add(leftMesh)
        this.app.scene.add(rightMesh)*/

        // Dirt
        let dirtMap = new THREE.TextureLoader().load( 'textures/dirt.jpg' );
        let dirtMaterial = new THREE.MeshBasicMaterial( { map: dirtMap } );
        let dirtGeometry = new THREE.CircleGeometry(0.20, 30);
        this.dirtMesh = new THREE.Mesh(dirtGeometry, dirtMaterial);
        this.dirtMesh.rotation.x = -Math.PI / 2;
        this.dirtMesh.position.y = 0.60;

        const flowerJarMesh = new THREE.Group();
        flowerJarMesh.add(leftMesh);
        flowerJarMesh.add(rightMesh);

        flowerJarMesh.add(this.dirtMesh);

        flowerJarMesh.position.set(1.25, this.tableLegHeight + this.tableTopHeight, 1.25)
        this.app.scene.add(flowerJarMesh);
        
    }

    init() {
        // create once
        if (this.axis === null) {
            // create and attach the axis to the scene
            this.axis = new MyAxis(this)
            this.app.scene.add(this.axis)
        }
        
        // variables to hold the curves
        this.polyline = null
        this.quadraticBezierCurve = null
        this.cubicBezierCurve = null
        this.catmullRomCurve = null

        // Car
        this.carBackWheel = null;
        this.carFrontWheel = null;
        this.carBack = null;
        this.carMid = null;
        this.carFront = null;

        // Flower
        this.flowerStem = null;

        // Spring
        this.spring = null;

        // number of samples to use for the curves (not for polyline)
        this.numberOfSamples = 16

        // hull material and geometry
        this.hullMaterial =
            new THREE.MeshBasicMaterial( {color: 0xffffff, opacity: 0.50, transparent: true} );

        // curve recomputation
        this.recompute();

        // Curved Surfaces

        // add a point light on top of the model
        const pointLight = new THREE.PointLight( 0xffffff, 500, 0 );
        pointLight.position.set( 0, 20, 0 );
        //this.app.scene.add( pointLight );

        // add a point light helper for the previous point light
        const sphereSize = 0.5;
        const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
        //this.app.scene.add( pointLightHelper );
        

        // add an ambient light
        const ambientLight = new THREE.AmbientLight( 0x555555, 4);
        this.app.scene.add( ambientLight );

        // Directional light
        const light2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
        light2.position.set(0, 9, 0);
        light2.castShadow = true;
        light2.shadow.mapSize.width = 4096;
        light2.shadow.mapSize.height = 4096;
        light2.shadow.camera.near = 0.5;
        light2.shadow.camera.far = 100;
        this.app.scene.add( light2 );
        
        // New target
        const targetObject = new THREE.Object3D(); 
        targetObject.position.set(5,5,0);
        //this.app.scene.add(targetObject);
        //light2.target = targetObject;

        // Directional light helper
        const light2Helper = new THREE.DirectionalLightHelper( light2, 2 );
        //this.app.scene.add( light2Helper );

        
        // Spot Light
        this.light3 = new THREE.SpotLight( 0xffffff, 5.5, 12, THREE.MathUtils.degToRad(this.light3Angle), 1, 0);
        this.light3.position.set( -4, 5, 0 );
        this.light3.castShadow = true;
        this.light3.shadow.mapSize.width = 4096;
        this.light3.shadow.mapSize.height = 4096;
        this.light3.shadow.camera.near = 0.5;
        this.light3.shadow.camera.far = 100;

        this.app.scene.add( this.light3 );

        // New target
        const target2Object = new THREE.Object3D(); 
        target2Object.position.set(0,2,0);
        this.app.scene.add(target2Object);
        this.light3.target = target2Object;

        // Spot Light helper
        this.light3Helper = new THREE.SpotLightHelper( this.light3 );
        //this.app.scene.add( this.light3Helper );
        

        // Rect Area Light
        const light4 = new THREE.RectAreaLight( 0xffffff, 5, 10, 10 );
        light4.position.set(2, 2, 2);
        light4.lookAt(0,0,0);
        //this.app.scene.add(light4);
        
        this.buildBox();
        this.buildCircle();
        this.buildSphere();
        this.buildPartialSphere();
        this.buildCylinder();
        this.buildPartialCylinder();
        this.buildCone();
        this.buildPartialCone();
        this.buildPolyhedron();

        // Scene Components
        // Walls: left (1); back (2); right (3); front (4);
        this.buildWall(1);
        this.buildWall(2);
        this.buildWall(3);
        this.buildWall(4);
        // Table
        this.buildTable();
        // Plate
        this.buildPlate();
        // Cake
        this.buildCake();
        // Chair
        this.buildChair();
        // Frames
        this.buildFrames();
        // Window
        this.buildWindow();
        // Door
        this.buildDoor();
        // Light bulb
        this.buildLightBulb();

        this.removeMeshes();

        // Newspaper
        this.createNewspaper();
        // Flower Jar
        this.createFlowerJar();
        
        // Floor
        let planeSizeU = 10;
        let planeSizeV = 10;  //7;
        let planeUVRate = planeSizeV / planeSizeU;
        let planeTextureUVRate = 840/840// image dimensions
        this.planeTextureRepeatU = 2.5;
        this.planeTextureRepeatV = this.planeTextureRepeatU * planeUVRate * planeTextureUVRate;
        this.planeTexture.repeat.set( this.planeTextureRepeatU, this.planeTextureRepeatV );
        this.planeTexture.rotation = 0;
        this.planeTexture.offset = new THREE.Vector2(0,0);

        var plane = new THREE.PlaneGeometry( planeSizeU, planeSizeV );
        this.planeMesh = new THREE.Mesh( plane, this.planeMaterial );
        this.planeMesh.rotation.x = -Math.PI / 2;
        this.planeMesh.position.y = 0;
        this.planeMesh.receiveShadow = true;
        this.planeMesh.castShadow = true;
        this.app.scene.add(this.planeMesh);
    }

    /**
     * updates the diffuse plane color and the material
     * @param {THREE.Color} value 
     */
    updateDiffusePlaneColor(value) {
        this.diffusePlaneColor = value
        this.planeMaterial.color.set(this.diffusePlaneColor)
    }
    /**
     * updates the specular plane color and the material
     * @param {THREE.Color} value 
     */
    updateSpecularPlaneColor(value) {
        this.specularPlaneColor = value
        this.planeMaterial.specular.set(this.specularPlaneColor)
    }
    /**
     * updates the plane shininess and the material
     * @param {number} value 
     */
    updatePlaneShininess(value) {
        this.planeShininess = value
        this.planeMaterial.shininess = this.planeShininess
    }

    /**
     * rebuilds the box mesh if required
     * this method is called from the gui interface
     */
    rebuildBox() {
        // remove boxMesh if exists
        if (this.boxMesh !== undefined && this.boxMesh !== null) {  
            this.app.scene.remove(this.boxMesh)
        }
        this.buildBox();
        this.lastBoxEnabled = null
    }

    rebuildCircle() {
        // remove circleMesh if exists
        if (this.circleMesh !== undefined && this.circleMesh !== null) {  
            this.app.scene.remove(this.circleMesh)
        }
        this.buildCircle();
        this.lastCircleEnabled = null
    }

    rebuildSphere() {
        // remove sphereMesh if exists
        if (this.sphereMesh !== undefined && this.sphereMesh !== null) {  
            this.app.scene.remove(this.sphereMesh)
        }
        this.buildSphere();
        this.lastSphereEnabled = null
    }

    rebuildPartialSphere() {
        // remove sphereMesh if exists
        if (this.partialSphereMesh !== undefined && this.partialSphereMesh !== null) {  
            this.app.scene.remove(this.partialSphereMesh)
        }
        this.buildPartialSphere();
        this.lastPartialSphereEnabled = null
    }

    rebuildCylinder() {
        // remove cylinderMesh if exists
        if (this.cylinderMesh !== undefined && this.cylinderMesh !== null) {  
            this.app.scene.remove(this.cylinderMesh)
        }
        this.buildCylinder();
        this.lastCylinderEnabled = null
    }

    rebuildPartialCylinder() {
        // remove partialCylinderMesh if exists
        if (this.partialCylinderMesh !== undefined && this.partialCylinderMesh !== null) {  
            this.app.scene.remove(this.partialCylinderMesh)
        }
        this.buildPartialCylinder();
        this.lastPartialCylinderEnabled = null
    }

    rebuildCone() {
        // remove coneMesh if exists
        if (this.coneMesh !== undefined && this.coneMesh !== null) {  
            this.app.scene.remove(this.coneMesh)
        }
        this.buildCone();
        this.lastConeEnabled = null
    }
    
    rebuildPartialCone() {
        // remove PartialConeMesh if exists
        if (this.partialConeMesh !== undefined && this.partialConeMesh !== null) {  
            this.app.scene.remove(this.partialConeMesh)
        }
        this.buildPartialCone();
        this.lastPartialConeEnabled = null
    }

    rebuildPolyhedron() {
        // remove polyhedronMesh if exists
        if (this.polyhedronMesh !== undefined && this.polyhedronMesh !== null) {  
            this.app.scene.remove(this.polyhedronMesh)
        }
        this.buildPolyhedron();
        this.lastPolyhedronEnabled = null

        let position = new THREE.Vector3(-2,4,0);
        this.drawHull(position, points);
    
        let curve = new THREE.QuadraticBezierCurve3( points[0], points[1], points[2])
    
        // sample a number of points on the curve
        let sampledPoints = curve.getPoints( this.numberOfSamples );
    
        this.curveGeometry = new THREE.BufferGeometry().setFromPoints( sampledPoints )
        this.lineMaterial = new THREE.LineBasicMaterial( { color: 0x00ff00 } )
        this.lineObj = new THREE.Line( this.curveGeometry, this.lineMaterial )
    
        this.lineObj.position.set(position.x,position.y,position.z)
        this.app.scene.add( this.lineObj );
    }

    updateBoxIfRequired() {
        if (this.boxEnabled !== this.lastBoxEnabled) {
            this.lastBoxEnabled = this.boxEnabled;
            if (this.boxEnabled) {
                this.app.scene.add(this.boxMesh);
            }
            else {
                this.app.scene.remove(this.boxMesh);
            }
        }
    }

    updateCircleIfRequired() {
        if (this.circleEnabled !== this.lastCircleEnabled) {
            this.lastCircleEnabled = this.circleEnabled;
            if (this.circleEnabled) {
                this.app.scene.add(this.circleMesh);
            }
            else {
                this.app.scene.remove(this.circleMesh);
            }
        }
    }

    updateSphereIfRequired() {
        if (this.sphereEnabled !== this.lastSphereEnabled) {
            this.lastSphereEnabled = this.sphereEnabled;
            if (this.sphereEnabled) {
                this.app.scene.add(this.sphereMesh);
            }
            else {
                this.app.scene.remove(this.sphereMesh);
            }
        }
    }

    updatePartialSphereIfRequired() {
        if (this.partialSphereEnabled !== this.lastPartialSphereEnabled) {
            this.lastPartialSphereEnabled = this.partialSphereEnabled;
            if (this.partialSphereEnabled) {
                this.app.scene.add(this.partialSphereMesh);
            }
            else {
                this.app.scene.remove(this.partialSphereMesh);
            }
        }
    }

    updateCylinderIfRequired() {
        if (this.cylinderEnabled !== this.lastCylinderEnabled) {
            this.lastCylinderEnabled = this.cylinderEnabled;
            if (this.cylinderEnabled) {
                this.app.scene.add(this.cylinderMesh);
            }
            else {
                this.app.scene.remove(this.cylinderMesh);
            }
        }
    }

    updatePartialCylinderIfRequired() {
        if (this.partialCylinderEnabled !== this.lastPartialCylinderEnabled) {
            this.lastPartialCylinderEnabled = this.partialCylinderEnabled;
            if (this.partialCylinderEnabled) {
                this.app.scene.add(this.partialCylinderMesh);
            }
            else {
                this.app.scene.remove(this.partialCylinderMesh);
            }
        }
    }

    updateConeIfRequired() {
        if (this.coneEnabled !== this.lastConeEnabled) {
            this.lastConeEnabled = this.coneEnabled;
            if (this.coneEnabled) {
                this.app.scene.add(this.coneMesh);
            }
            else {
                this.app.scene.remove(this.coneMesh);
            }
        }
    }
    
    updatePartialConeIfRequired() {
        if (this.partialConeEnabled !== this.lastPartialConeEnabled) {
            this.lastPartialConeEnabled = this.partialConeEnabled;
            if (this.lastPartialConeEnabled) {
                this.app.scene.add(this.partialConeMesh);
            }
            else {
                this.app.scene.remove(this.partialConeMesh);
            }
        }
    }

    updatePolyhedronIfRequired() {
        if (this.polyhedronEnabled !== this.lastPolyhedronEnabled) {
            this.lastPolyhedronEnabled = this.polyhedronEnabled;
            if (this.lastPolyhedronEnabled) {
                this.app.scene.add(this.polyhedronMesh);
            }
            else {
                this.app.scene.remove(this.polyhedronMesh);
            }
        }
    }

     /**
     * updates the contents
     * this method is called from the render method of the app
     *
     */
     update() {
        // check if box mesh needs to be updated
        this.updateBoxIfRequired();

        this.updateCircleIfRequired();

        this.updateSphereIfRequired();
        
        this.updatePartialSphereIfRequired();
        
        this.updateCylinderIfRequired();

        this.updatePartialCylinderIfRequired();

        this.updateConeIfRequired();

        this.updatePartialConeIfRequired();

        this.updatePolyhedronIfRequired();

        // sets the box mesh position based on the displacement vector
        this.boxMesh.position.x = this.boxDisplacement.x;
        this.boxMesh.position.y = this.boxDisplacement.y;
        this.boxMesh.position.z = this.boxDisplacement.z;
        
    }

    updateLightAngle(value) {
        this.light3Angle = value;
        this.light3.angle = THREE.MathUtils.degToRad(value);

        this.light3.target.updateMatrixWorld();
        this.light3Helper.update();
    }

    updateLight() {
        this.light3.target.updateMatrixWorld();
        this.light3Helper.update();
    }

    updateWrappingMode(value, flag) {

        this.planeTexture.dispose();

        if(flag == 'S'){

            switch(value) {
                case 'Repeat':
                    this.planeTexture.wrapS = THREE.RepeatWrapping;
                    break;
                case 'Clamp To Edge':
                    this.planeTexture.wrapS = THREE.ClampToEdgeWrapping;
                    break;
                case 'Mirrored Repeat':
                    this.planeTexture.wrapS = THREE.MirroredRepeatWrapping;
                    break;
                default:
                    break;
            }

        } else if(flag == 'T'){

            switch(value) {
                case 'Repeat':
                    this.planeTexture.wrapT = THREE.RepeatWrapping;
                    break;
                case 'Clamp To Edge':
                    this.planeTexture.wrapT = THREE.ClampToEdgeWrapping;
                    break;
                case 'Mirrored Repeat':
                    this.planeTexture.wrapT = THREE.MirroredRepeatWrapping;
                    break;
                default:
                    break;
            }

        }

        this.planeTexture.updateRequired = true;

    }

    updateTextureRepeat(value, flag){

        this.planeTexture.dispose();

        if(flag == 'U') this.planeTextureRepeatU = value;
        else if(flag == 'V') this.planeTextureRepeatV = value;

        this.planeTexture.repeat.set(this.planeTextureRepeatU, this.planeTextureRepeatV);

    }

}

export { MyContents };