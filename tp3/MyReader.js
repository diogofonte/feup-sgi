import * as THREE from 'three';
import { MyParser } from './MyParser.js';
import { MyTrack } from './MyTrack.js';
import { MyObstacle } from './MyObstacle.js';
import { MyVehicle } from './MyVehicle.js';
import { MyPicking } from './MyPicking.js';
import { MyFirework } from './MyFirework.js';
import { MyMenu } from './MyMenu.js';
import { MyFinalMenu } from './MyFinalMenu.js';

const POWER_UP_DURATION = 5; // seconds
const POWER_UP_INCREASE_MAX_SPEED = 4; // multiplier
const POWER_UP_DECREASE_TOTAL_TIME = 5; // seconds

const OBSTACLE_DURATION = 5; // seconds
const OBSTACLE_DECREASE_MAX_SPEED = 0.5; // multiplier
const OBSTACLE_INCREASE_TOTAL_TIME = 5; // seconds

const COLLISION_DURATION = 2.5;

class MyReader  {

    /**
       constructs the object
       @param {MyApp} app The application object
    */ 
    constructor(app) {
        this.app = app;

        this.parser = new MyParser(app);
        this.picker = new MyPicking(app);
        this.menu = new MyMenu(app, this);
        this.finalMenu = new MyFinalMenu(app, this);
        this.track = new MyTrack(app, this);

        document.addEventListener(
            "click",
            this.onClick.bind(this)
        );

        // Race
        this.race = false;

        // vehicles
        this.vehicle = null;
        this.opponentVehicle = null;

        this.vehicleColorText = null;
        this.vehicleColorHex = null;
        this.opponentColorText = null;
        this.opponentColorHex = null;

        this.maxLaps = 3;
        this.playerLaps = 0;
        this.opponentLaps = 0;

        this.playerCrossingFinish = false;
        this.opponentCrossingFinish = false;

        this.raceStartTime = null;
        this.totalPausedTime = 0;

        this.pauseStartTime = 0;
        this.pauseEndTime = 0;
        this.pauseDuration = 0;

        this.vehicleVelocityOnPause = 0;

        this.isPowerUpActive = false;
        this.powerUpStartTime = 0;
        this.powerUpEndTime = 0;
        this.powerUpRemainingTime = 0;
        this.canCatchPowerUp = true;

        this.isObstacleActive = false;
        this.obstacleStartTime = 0;
        this.obstacleEndTime = 0;
        this.obstacleRemainingTime = 0;
        this.canCatchObstacle = true;

        this.hasCollidedWithOpponent = false;
        this.collisionEndTime = 0;
        this.collisionRemainingTime = 0;
        this.canCollide = true;

        this.pickingObstacle = false;
        this.placingObstacle = false;

        this.obstacleToPlace = null;

        this.paused = false;

        this.canCallCreateText = true;

        this.tempLaps = -1;
        this.tempSpeed = -1;
        this.tempObstacle = true;
        this.tempPowerUp = true;
        this.tempPause = true;

        this.playerFinalTime = 0;
        this.opponentFinalTime = 0;

        this.playerName = "Anonymous";

        this.fireworks = []

        this.isRaceFinished = false;

        this.winner = null;

        this.difficulty = 'Normal';

        this.playerFinished = false;
        this.opponentFinished = false;

        this.launchFireWorks = false;

        //animation parameters
        this.keyPoints = [
            new THREE.Vector3(0, 0.17, 0), // start/finish line
            new THREE.Vector3(-0.5, 0.17, 3),
            new THREE.Vector3(-1, 0.17, 6),
            new THREE.Vector3(-1.20, 0.17, 9),
            new THREE.Vector3(0, 0.17, 11), // curve 1
            new THREE.Vector3(2.75, 0.17, 13),
            new THREE.Vector3(5.5, 0.17, 15), // curve 2
            new THREE.Vector3(6.5, 0.17, 18),
            new THREE.Vector3(7, 0.17, 21), // between curve 2 and 3
            new THREE.Vector3(6, 0.17, 24.5),
            new THREE.Vector3(5, 0.17, 27.5), // curve 3
            new THREE.Vector3(2.5, 0.17, 27),
            new THREE.Vector3(0, 0.17, 26), // curve 4
            new THREE.Vector3(-3, 0.17, 26.5),
            new THREE.Vector3(-6, 0.17, 28), // curve 5
            new THREE.Vector3(-9.5, 0.17, 27.5),
            new THREE.Vector3(-13, 0.17, 26), // curve 6
            new THREE.Vector3(-14, 0.17, 22),
            new THREE.Vector3(-15, 0.17, 16.5),
            new THREE.Vector3(-16, 0.17, 12), // curve 7
            new THREE.Vector3(-15, 0.17, 8),
            new THREE.Vector3(-14, 0.17, 4.5),
            new THREE.Vector3(-13.15, 0.17, 1),
            new THREE.Vector3(-12.5, 0.17, -2),
            new THREE.Vector3(-11.5, 0.17, -5.5),
            new THREE.Vector3(-10.5, 0.17, -9),
            new THREE.Vector3(-9, 0.17, -12), // curve 8
            new THREE.Vector3(-6, 0.17, -13),
            new THREE.Vector3(-3, 0.17, -12.5),
            new THREE.Vector3(0, 0.17, -11), // curve 9
            new THREE.Vector3(0.5, 0.17, -9),            
            new THREE.Vector3(0.25, 0.17, -6),
            new THREE.Vector3(0, 0.17, -3),
            new THREE.Vector3(0, 0.17, 0) // start/finish line
        ];

        this.clock = new THREE.Clock()
        this.mixerTime = 0
        this.mixerPause = false
        this.enableAnimationPosition = true

        this.app.setActiveCamera("Menu");

    }

    init() {
        this.menu.init();
        this.picker.pickableObjIds = ['start', 'difficulty', 'playerName'];
    }

    initOponentAnimation() {
        //this.debugKeyFrames()

        const positionKF = new THREE.VectorKeyframeTrack('.position', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
            [
                ...this.keyPoints[0],
                ...this.keyPoints[1],
                ...this.keyPoints[2],
                ...this.keyPoints[3],
                ...this.keyPoints[4],
                ...this.keyPoints[5],
                ...this.keyPoints[6],
                ...this.keyPoints[7],
                ...this.keyPoints[8],
                ...this.keyPoints[9],
                ...this.keyPoints[10],
                ...this.keyPoints[11],
                ...this.keyPoints[12],
                ...this.keyPoints[13],
                ...this.keyPoints[14],
                ...this.keyPoints[15],
                ...this.keyPoints[16],
                ...this.keyPoints[17],
                ...this.keyPoints[18],
                ...this.keyPoints[19],
                ...this.keyPoints[20],
                ...this.keyPoints[21],
                ...this.keyPoints[22],
                ...this.keyPoints[23],
                ...this.keyPoints[24],
                ...this.keyPoints[25],
                ...this.keyPoints[26],
                ...this.keyPoints[27],
                ...this.keyPoints[28],
                ...this.keyPoints[29],
                ...this.keyPoints[30],
                ...this.keyPoints[31],
                ...this.keyPoints[32],
                ...this.keyPoints[33]
            ],
            THREE.InterpolateSmooth
        );

        const yAxis = new THREE.Vector3(0, 1, 0)
        const q180 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(180));
        const q170 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(170));
        const q160 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(160));
        const q150 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(150));
        const q120 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(120));
        const q90 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(90));
        const q60 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(60));
        const q45 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(45));
        const q30 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(30));
        const q15 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(15));
        const q0 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(0));
        const qm15 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-15));
        const qm30 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-30));
        const qm45 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-45));
        const qm60 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-60));
        const qm90 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-90));
        const qm100 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-100));
        const qm120 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-120));
        const qm150 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-150));
        const qm160 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-160));
        const qm170 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-170));
        const qm180 = new THREE.Quaternion().setFromAxisAngle(yAxis, THREE.MathUtils.degToRad(-180));


        const quaternionKF = new THREE.QuaternionKeyframeTrack('.quaternion', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33],
            [
                q0.x, q0.y, q0.z, q0.w, // start/finish line
                qm15.x, qm15.y, qm15.z, qm15.w,
                qm15.x, qm15.y, qm15.z, qm15.w,
                q0.x, q0.y, q0.z, q0.w,
                q30.x, q30.y, q30.z, q30.w, // curve 1
                q45.x, q45.y, q45.z, q45.w,
                q30.x, q30.y, q30.z, q30.w, // curve 2
                q15.x, q15.y, q15.z, q15.w,
                q0.x, q0.y, q0.z, q0.w, // between curve 2 and 3
                qm30.x, qm30.y, qm30.z, qm30.w,
                qm60.x, qm60.y, qm60.z, qm60.w, // curve 3
                qm120.x, qm120.y, qm120.z, qm120.w,
                qm90.x, qm90.y, qm90.z, qm90.w, // curve 4
                qm60.x, qm60.y, qm60.z, qm60.w,
                qm90.x, qm90.y, qm90.z, qm90.w, // curve 5
                qm100.x, qm100.y, qm100.z, qm100.w,
                qm160.x, qm160.y, qm160.z, qm160.w, // curve 6
                qm170.x, qm170.y, qm170.z, qm170.w,
                qm170.x, qm170.y, qm170.z, qm170.w,
                q170.x, q170.y, q170.z, q170.w, // curve 7
                q160.x, q160.y, q160.z, q160.w,
                q160.x, q160.y, q160.z, q160.w,
                q160.x, q160.y, q160.z, q160.w,
                q160.x, q160.y, q160.z, q160.w,
                q160.x, q160.y, q160.z, q160.w,
                q160.x, q160.y, q160.z, q160.w,
                q120.x, q120.y, q120.z, q120.w, // curve 8
                q90.x, q90.y, q90.z, q90.w,
                q60.x, q60.y, q60.z, q60.w,
                q15.x, q15.y, q15.z, q15.w, // curve 9
                q0.x, q0.y, q0.z, q0.w,
                q0.x, q0.y, q0.z, q0.w,
                q0.x, q0.y, q0.z, q0.w,
                q0.x, q0.y, q0.z, q0.w, // start/finish line
            ]
        );

        const positionClip = new THREE.AnimationClip('positionAnimation', -1, [positionKF])
        const rotationClip = new THREE.AnimationClip('rotationAnimation', -1, [quaternionKF])

        // Create an AnimationMixer
        this.mixer = new THREE.AnimationMixer(this.opponentVehicle.carGroup)

        const positionAction = this.mixer.clipAction(positionClip);
        positionAction.loop = THREE.LoopRepeat;
        positionAction.repetitions = this.maxLaps+1; 
        positionAction.clampWhenFinished = false;

        const rotationAction = this.mixer.clipAction(rotationClip);
        rotationAction.loop = THREE.LoopRepeat;
        rotationAction.repetitions = this.maxLaps+1; 
        rotationAction.clampWhenFinished = false;

        positionAction.play();
        rotationAction.play();
    }

    /**
     * Set a specific point in the animation clip
     */
    setMixerTime() {
        this.mixer.setTime(this.mixerTime)
    }

    /**
     * Start/Stop all animations
     */
    checkAnimationStateIsPause() {
        if (this.mixerPause)
            this.mixer.timeScale = 0
        else
            this.mixer.timeScale = 1
    }


    /**
     * Build control points and a visual path for debug
     */
    debugKeyFrames() {

        let spline = new THREE.CatmullRomCurve3([...this.keyPoints])

        // Setup visual control points

        for (let i = 0; i < this.keyPoints.length; i++) {
            const geometry = new THREE.SphereGeometry(1, 32, 32)
            const material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
            const sphere = new THREE.Mesh(geometry, material)
            sphere.scale.set(0.2, 0.2, 0.2)
            sphere.position.set(... this.keyPoints[i])

            this.app.scene.add(sphere)
        }

        const tubeGeometry = new THREE.TubeGeometry(spline, 100, 0.05, 10, false)
        const tubeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
        const tubeMesh = new THREE.Mesh(tubeGeometry, tubeMaterial)

        this.app.scene.add(tubeMesh)

    }

    initializeVehiclePark() {

        this.redVehicle = new MyVehicle(this.app, -1.975, -4.9, -1.25, "red", "");
        this.app.scene.add(this.redVehicle)

        this.blueVehicle = new MyVehicle(this.app, -0.825, -4.9, -1.25, "blue", "");
        this.app.scene.add(this.blueVehicle)

        this.greenVehicle = new MyVehicle(this.app, 0.425, -4.9, -1.25, "green", "");
        this.app.scene.add(this.greenVehicle)

        this.orangeVehicle = new MyVehicle(this.app, 1.575, -4.9, -1.25, "orange", "");
        this.app.scene.add(this.orangeVehicle)

        this.picker.pickableObjIds = ['vehicleButtonRed', 'vehicleButtonBlue', 'vehicleButtonGreen', 'vehicleButtonOrange'];

    }

    resetVehiclePark() {

        this.app.scene.remove(this.redVehicle)
        this.app.scene.remove(this.blueVehicle)
        this.app.scene.remove(this.greenVehicle)
        this.app.scene.remove(this.orangeVehicle)

    }

    initOutdoorText(){
        if (this.elapsedTimeText) this.app.scene.remove(this.elapsedTimeText);
        this.elapsedTimeText = this.createText('Elapsed Time:', 9.85, 9, -1.8, 0xffffff)
        this.app.scene.add(this.elapsedTimeText);
        if (this.lapsCompletedText) this.app.scene.remove(this.lapsCompletedText);
        this.lapsCompletedText = this.createText('Laps Completed:', 9.85, 8, -1.8, 0xffffff)
        this.app.scene.add(this.lapsCompletedText);
        if (this.maxVelocityText) this.app.scene.remove(this.maxVelocityText);
        this.maxVelocityText = this.createText('Max Velocity:', 9.85, 7, -1.8, 0xffffff);
        this.app.scene.add(this.maxVelocityText);
        if (this.obstacleTimeText) this.app.scene.remove(this.obstacleTimeText);
        this.obstacleTimeText = this.createText('Obstacle Time:', 9.85, 6, -1.8, 0xffffff)
        this.app.scene.add(this.obstacleTimeText);
        if (this.powerupTimeText) this.app.scene.remove(this.powerupTimeText);
        this.powerupTimeText = this.createText('PowerUp Time:', 9.85, 5, -1.8, 0xffffff)
        this.app.scene.add(this.powerupTimeText);
        if (this.gameStateText) this.app.scene.remove(this.gameStateText);
        this.gameStateText = this.createText('Game State:', 9.85, 4, -1.8, 0xffffff)
        this.app.scene.add(this.gameStateText);
    }  

    initPickingTexts() {

        if (this.obstacle1Text) this.app.scene.remove(this.obstacle1Text);
        if (this.obstacle2Text) this.app.scene.remove(this.obstacle2Text);
        if (this.obstacle3Text) this.app.scene.remove(this.obstacle3Text);
        this.obstacle1Text = this.createText('Choose the obstacle you want to place', -10.8, -3.3, -0.25, 0xffffff);
        this.obstacle1Text.scale.set(0.055, -0.055, 0.055);
        this.obstacle1Text.rotation.set(0, 0, 0);
        this.obstacle2Text = this.createText('Decreases max speed', -10.55, -3.8, 0.4, 0xff0000);
        this.obstacle2Text.scale.set(0.035, -0.035, 0.035);
        this.obstacle2Text.rotation.set(0, 0, 0);
        this.obstacle3Text = this.createText('Increases total time', -9.95, -3.8, 0.4, 0xffaa00);
        this.obstacle3Text.scale.set(0.035, -0.035, 0.035);
        this.obstacle3Text.rotation.set(0, 0, 0);
        this.app.scene.add(this.obstacle1Text);
        this.app.scene.add(this.obstacle2Text);
        this.app.scene.add(this.obstacle3Text);

        if (this.park1Text) this.app.scene.remove(this.park1Text);
        if (this.park2Text) this.app.scene.remove(this.park2Text);
        if (this.park3Text) this.app.scene.remove(this.park3Text);
        this.park1Text = this.createText('Choose yours and your opponent\'s vehicle', -1.15, -3.3, -0.25, 0xffffff);
        this.park1Text.scale.set(0.075, -0.075, 0.075);
        this.park1Text.rotation.set(0, 0, 0);
        this.park2Text = this.createText('Your Vehicle:', -1.15, -3.5, -0.25, 0xffffff);
        this.park2Text.scale.set(0.075, -0.075, 0.075);
        this.park2Text.rotation.set(0, 0, 0);
        this.park3Text = this.createText('Your Opponent\'s Vehicle:', -1.15, -3.7, -0.25, 0xffffff);
        this.park3Text.scale.set(0.075, -0.075, 0.075);
        this.park3Text.rotation.set(0, 0, 0);
        this.app.scene.add(this.park1Text);
        this.app.scene.add(this.park2Text);
        this.app.scene.add(this.park3Text);

        if (this.vehicleText) this.app.scene.remove(this.vehicleText);
        if (this.opponentText) this.app.scene.remove(this.opponentText);
        this.vehicleText = this.createText('Not Chosen', -0.4, -3.5, -0.25, 0x888888);
        this.vehicleText.scale.set(0.075, -0.075, 0.075);
        this.vehicleText.rotation.set(0, 0, 0);
        this.opponentText = this.createText('Not Chosen', 0.2, -3.7, -0.25, 0x888888);
        this.opponentText.scale.set(0.075, -0.075, 0.075);
        this.opponentText.rotation.set(0, 0, 0);
        this.app.scene.add(this.vehicleText);
        this.app.scene.add(this.opponentText);
    }
    
    createText(text, x, y, z, color) {
        const texture = new THREE.TextureLoader().load('scenes/textures/font.png');
    
        const meshes = [];
        let xOffset = 0;
    
        for (let i = 0; i < text.length; i++) {

            let geometry = new THREE.PlaneGeometry(1, 1);
            let material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.DoubleSide,
                transparent: true,
                color: color
            });

            let charCode = text.charCodeAt(i);
            let u = ((charCode % (16 * 16)) % 16) * (1 / 16);
            let v = Math.floor((charCode % (16 * 16)) / 16) * (1 / 16);
    
            let mesh = new THREE.Mesh(geometry, material);
            let uvs = geometry.getAttribute('uv').clone();
    
            uvs.set([
                u, 1 - v - 1 / 16,
                u + 1 / 16, 1 - v - 1 / 16,
                u, 1 - v,
                u + 1 / 16, 1 - v,
            ]);
    
            geometry.setAttribute('uv', uvs);
    
            mesh.position.x = xOffset;
            meshes.push(mesh);
            xOffset += 0.75;
        }
    
        let group = new THREE.Group();
        meshes.forEach((mesh) => group.add(mesh));

        group.scale.set(0.4, -0.4, 0.4)
        group.rotation.set(0, THREE.MathUtils.degToRad(-90) ,0);
        group.position.set(x, y, z);
    
        return group;
    }

    startCountdown(text, count, x, y, z, callback) {
        const displayCount = (text, count, x, y, z, callback) => {
            if (count >= 1) {
                if (this.countDownText) this.app.scene.remove(this.countDownText);
                this.countDownText = this.createText(text + count.toString(), x, y, z, 0x00ff00);
                this.countDownText.scale.set(0.075, -0.075, 0.075);
                this.countDownText.rotation.set(0, 0, 0);
                this.app.scene.add(this.countDownText);
    
                count--;
                setTimeout(() => displayCount(text, count, x, y, z, callback), 1000);
            } else {
                callback();
            }
        }
    
        displayCount(text, count, x, y, z, callback);
    }

    initRace(){

        this.picker.pickableObjIds = [];

        if(this.difficulty == 'Normal') this.difficultyVelocity = 0.5;
        else if (this.difficulty == 'Easy') this.difficultyVelocity = 0.2;
        else this.difficultyVelocity = 1;

        this.playerFinalTime = 0;
        this.opponentFinalTime = 0;

        this.startCountdown("Starting the race in: ", 3, -0.75, -3.9, -0.25, () => {
            this.race = true;
            this.app.scene.add(this.vehicle);
            this.app.scene.add(this.opponentVehicle);
            this.track.init();
            this.app.setActiveCamera("Vehicle1");
            this.initOponentAnimation();
            this.initOutdoorText();
            this.raceStartTime = new Date();
            this.resetVehiclePark();
            if (this.countDownText) this.app.scene.remove(this.countDownText);
            if (this.vehicleText) this.app.scene.remove(this.vehicleText);
            if (this.opponentText) this.app.scene.remove(this.opponentText);
        });

    }

    resetRace(){

        this.mixer.stopAllAction();
        this.mixer = null;
        this.clock = new THREE.Clock()
        this.mixerTime = 0
        this.mixerPause = false
        this.enableAnimationPosition = true

        this.app.scene.remove(this.vehicle);
        this.app.scene.remove(this.opponentVehicle);
        
        this.track.reset();

        this.vehicle = null;
        this.opponentVehicle = null;

        this.playerLaps = 0;
        this.opponentLaps = 0;

        this.playerCrossingFinish = false;
        this.opponentCrossingFinish = false;

        this.raceStartTime = null;
        this.totalPausedTime = 0;

        this.pauseStartTime = 0;
        this.pauseEndTime = 0;
        this.pauseDuration = 0;

        this.vehicleVelocityOnPause = 0;

        this.isPowerUpActive = false;
        this.powerUpStartTime = 0;
        this.powerUpEndTime = 0;
        this.powerUpRemainingTime = 0;
        this.canCatchPowerUp = true;

        this.isObstacleActive = false;
        this.obstacleStartTime = 0;
        this.obstacleEndTime = 0;
        this.obstacleRemainingTime = 0;
        this.canCatchObstacle = true;

        this.hasCollidedWithOpponent = false;
        this.collisionEndTime = 0;
        this.collisionRemainingTime = 0;
        this.canCollide = true;

        this.pickingObstacle = false;
        this.placingObstacle = false;

        this.obstacleToPlace = null;

        this.canCallCreateText = true;

        this.tempLaps = -1;
        this.tempSpeed = -1;
        this.tempObstacle = true;
        this.tempPowerUp = true;
        this.tempPause = true;

        this.winner = null;

    }

    handleVehicleChoice(color){

        let colorText;
        let colorHex;

        if(color == "red"){
            colorText = "Red";
            colorHex = 0xff0000;
        } else if(color == "blue"){
            colorText = "Blue";
            colorHex = 0x0000ff;
        } else if(color == "green"){
            colorText = "Green";
            colorHex = 0x00ff00;
        } else {
            colorText = "Orange";
            colorHex = 0xffaa00;
        }

        if (this.vehicle == null){

            this.vehicle = new MyVehicle(this.app, -0.5, 0.17, 0, color, "player");
            this.vehicleColorText = colorText;
            this.vehicleColorHex = colorHex;

            if (this.vehicleText) this.app.scene.remove(this.vehicleText);
            this.vehicleText = this.createText(colorText, -0.4, -3.5, -0.25, colorHex);
            this.vehicleText.scale.set(0.075, -0.075, 0.075);
            this.vehicleText.rotation.set(0, 0, 0);
            this.app.scene.add(this.vehicleText);

        } else if (this.vehicle && (this.opponentVehicle == null) && (this.vehicle.color == color)) {

            if (this.vehicleText) this.app.scene.remove(this.vehicleText);
            if (this.opponentText) this.app.scene.remove(this.opponentText);

            this.vehicleText = this.createText('Not Chosen', -0.4, -3.5, -0.25, 0x888888);
            this.vehicleText.scale.set(0.075, -0.075, 0.075);
            this.vehicleText.rotation.set(0, 0, 0);
            this.opponentText = this.createText('Not Chosen', 0.2, -3.7, -0.25, 0x888888);
            this.opponentText.scale.set(0.075, -0.075, 0.075);
            this.opponentText.rotation.set(0, 0, 0);
            this.app.scene.add(this.vehicleText);
            this.app.scene.add(this.opponentText);

            this.vehicle = null;
            this.vehicleColorText = null;
            this.vehicleColorHex = null;
            this.opponentVehicle = null;
            this.opponentColorText = null;
            this.opponentColorHex = null;

        } else if (this.vehicle && (this.opponentVehicle == null)) {
            
            this.opponentVehicle = new MyVehicle(this.app, 0.5, 0.17, 0, color, "opponent");
            this.opponentColorText = colorText;
            this.opponentColorHex = colorHex;

            if (this.opponentText) this.app.scene.remove(this.opponentText);
            this.opponentText = this.createText(colorText, 0.2, -3.7, -0.25, colorHex);
            this.opponentText.scale.set(0.075, -0.075, 0.075);
            this.opponentText.rotation.set(0, 0, 0);
            this.app.scene.add(this.opponentText);

        }

    }

    onClick(){

        if(this.picker.lastPickedObj){

            if (this.picker.lastPickedObj.name.startsWith('vehicleButton')){

                if(this.picker.lastPickedObj.name == 'vehicleButtonRed') this.handleVehicleChoice("red");
                else if(this.picker.lastPickedObj.name == 'vehicleButtonBlue') this.handleVehicleChoice("blue");
                else if(this.picker.lastPickedObj.name == 'vehicleButtonGreen') this.handleVehicleChoice("green");
                else if(this.picker.lastPickedObj.name == 'vehicleButtonOrange') this.handleVehicleChoice("orange");

                if(this.vehicle && this.opponentVehicle){

                    this.initRace();

                }

            } else if(this.picker.lastPickedObj.name.startsWith('Obstacle') && this.pickingObstacle) {

                this.pickingObstacle = false;
                this.placingObstacle = true;

                this.obstacleToPlace = this.picker.lastPickedObj;

                this.app.setActiveCamera("Vehicle2");
                this.picker.pickableObjIds = ['track'];

            } else if(this.picker.lastPickedObj.name == 'track' && this.placingObstacle) {

                this.placingObstacle = false;

                let type = "decrease-max-speed";
                if(this.obstacleToPlace.name == "Obstacle1") type = "increase-total-time";

                let obstacle = new MyObstacle(this.app, this.picker.intersects[0].point.x, 0.25, this.picker.intersects[0].point.z, type);
                this.app.scene.add(obstacle.obstacle)

                this.picker.pickableObjIds = [];

                this.obstacleToPlace = null;

                this.vehicle.blockKeys = false;
                this.pause = false;
                this.mixerPause = false;
                this.checkAnimationStateIsPause();
                this.clock.getDelta()
                this.app.setActiveCamera("Vehicle1");

                this.powerUpStartTime = Date.now();
                this.powerUpEndTime = this.powerUpStartTime + (POWER_UP_DURATION * 1000);
                    
                this.isPowerUpActive = true;
                this.canCatchPowerUp = false;
                
            } else if(this.picker.lastPickedObj.name == 'start') {

                this.initializeVehiclePark();
                this.initPickingTexts();

                this.app.setActiveCamera("Park1");

                this.menu.reset();

            } else if(this.picker.lastPickedObj.name == 'backMenu') {

                this.menu.init();
                this.picker.pickableObjIds = ['start', 'difficulty', 'playerName'];
                
                this.app.setActiveCamera("Menu");

                this.finalMenu.reset();

            } else if(this.picker.lastPickedObj.name == 'restart') {

                this.initializeVehiclePark();
                this.initPickingTexts();

                this.app.setActiveCamera("Park1");

                this.finalMenu.reset();

            } else if(this.picker.lastPickedObj.name == 'playerName') {

                const nameInput = document.getElementById('name-input');
                nameInput.style.display = 'block';
                nameInput.focus();

                const handleInput = (event) => {
                    const enteredName = event.target.value;
                    console.log('Entered name:', enteredName);

                    this.playerName = enteredName;
                };

                const handleEnterKey = (event) => {
                    if (event.key === 'Enter') {
                        nameInput.style.display = 'none';
                        nameInput.removeEventListener('input', handleInput);
                        nameInput.removeEventListener('keydown', handleEnterKey);

                        this.menu.updateCurrentName();
                    }
                };

                nameInput.addEventListener('input', handleInput);
                nameInput.addEventListener('keydown', handleEnterKey);

            } else if(this.picker.lastPickedObj.name == 'difficulty') {

                this.app.setActiveCamera("Difficulty");
                this.picker.pickableObjIds = ['easy', 'normal', 'hard'];

            } else if(this.picker.lastPickedObj.name == 'easy') {

                this.difficulty = 'Easy';
                this.menu.updateCurrentDifficulty();
                this.app.setActiveCamera("Menu");
                this.picker.pickableObjIds = ['start', 'difficulty', 'playerName'];

            } else if(this.picker.lastPickedObj.name == 'normal') {

                this.difficulty = 'Normal';
                this.menu.updateCurrentDifficulty();
                this.app.setActiveCamera("Menu");
                this.picker.pickableObjIds = ['start', 'difficulty', 'playerName'];

            } else if(this.picker.lastPickedObj.name == 'hard') {

                this.difficulty = 'Hard';
                this.menu.updateCurrentDifficulty();
                this.app.setActiveCamera("Menu");
                this.picker.pickableObjIds = ['start', 'difficulty', 'playerName'];

            }

        }

    }

    update() {

        if(!this.race){

            if(this.isRaceFinished){

                this.finalMenu.init();
                this.app.setActiveCamera('GameOver');

                this.resetRace();

                this.picker.pickableObjIds = ['backMenu', 'restart'];
                this.launchFireWorks = true;

                this.isRaceFinished = false;
                this.playerFinished = false;
                this.opponentFinished = false;

            }

            if(this.launchFireWorks){
                // add new fireworks every 10% of the calls
                if(Math.random()  < 0.05 ) {
                    this.fireworks.push(new MyFirework(this.app, this, "left"))
                    this.fireworks.push(new MyFirework(this.app, this, "right"))
                    //console.log("firework added")
                }

                // for each fireworks 
                for( let i = 0; i < this.fireworks.length; i++ ) {
                    // is firework finished?
                    if (this.fireworks[i].done) {
                        // remove firework 
                        this.fireworks.splice(i,1) 
                        //console.log("firework removed")
                        continue 
                    }
                    // otherwise upsdate  firework
                    this.fireworks[i].update()
                }
            } 


        }

        else if (this.race) {

            // Handle time
            let currentTime = new Date();
            let elapsedTime = currentTime - this.raceStartTime - this.totalPausedTime;

            let milliseconds = elapsedTime % 1000;
            let seconds = Math.floor(elapsedTime / 1000) % 60;
            let minutes = Math.floor(elapsedTime / (1000 * 60));

            // Outdoor Display
            if (this.canCallCreateText && !this.pause) {
                
                if (this.minutesText) this.app.scene.remove(this.minutesText);
                if (this.secondsText) this.app.scene.remove(this.secondsText);
                
                this.minutesText = this.createText(minutes.toString() + ": ", 9.85, 9, 2.3, 0x00ff00);
                this.secondsText = this.createText(seconds.toString(), 9.85, 9, 3.1, 0x00ff00);
                
                this.app.scene.add(this.minutesText);
                this.app.scene.add(this.secondsText);

                this.canCallCreateText = false;
                setTimeout(() => {
                    this.canCallCreateText = true;
                }, 1000);
            }

            if(!this.playerFinished && this.playerLaps == this.maxLaps){
                this.playerFinalTime = elapsedTime;
                this.playerFinished = true;
            }

            if(!this.opponentFinished && this.opponentLaps == this.maxLaps){
                this.opponentFinalTime = elapsedTime;
                this.opponentFinished = true;
            }

            if(this.playerLaps >= this.maxLaps && this.opponentLaps >= this.maxLaps){
                this.race = false;
                this.isRaceFinished = true;
                if(this.playerFinalTime < this.opponentFinalTime) this.winner = this.playerName;
                else this.winner = "Opponent";
            }

            if(this.playerLaps != this.tempLaps){
                if (this.lapsText) this.app.scene.remove(this.lapsText);
                this.lapsText = this.createText(this.playerLaps.toString(), 9.85, 8, 3.1, 0x00ff00);
                this.app.scene.add(this.lapsText);
                this.tempLaps = this.playerLaps;
            }

            if(this.vehicle.maxSpeed != this.tempSpeed){
                if (this.speedText) this.app.scene.remove(this.speedText);
                this.speedText = this.createText((this.vehicle.maxSpeed * 2750).toString() + "Km/h", 9.85, 7, 2.3, 0x00ff00);
                this.app.scene.add(this.speedText);
                this.tempSpeed = this.vehicle.maxSpeed;
            }

            if(this.isObstacleActive != this.tempObstacle){
                if (this.obstacleText) this.app.scene.remove(this.obstacleText);
                if(!this.isObstacleActive){
                    this.obstacleText = this.createText("Inactive", 9.85, 6, 2.6, 0xff0000);
                }
                this.app.scene.add(this.obstacleText);
                this.tempObstacle = this.isObstacleActive;
            }

            setTimeout(() => {
                if(this.isObstacleActive){
                    if(this.obstacleText) this.app.scene.remove(this.obstacleText);
                    let seconds = Math.floor(this.obstacleRemainingTime / 1000) % 60;
                    this.obstacleText = this.createText(seconds.toString() + "s", 9.85, 6, 2.6, 0x00ff00);
                    this.app.scene.add(this.obstacleText);
                } 
            }, 1750);

            if(this.isPowerUpActive != this.tempPowerUp){
                if (this.powerUpText) this.app.scene.remove(this.powerUpText);
                if(this.isPowerUpActive){
                    let seconds = Math.floor(this.powerUpRemainingTime / 1000) % 60;
                    this.powerUpText = this.createText(seconds.toString() + "s", 9.85, 5, 2.4, 0x00ff00);
                } else {
                    this.powerUpText = this.createText("Inactive", 9.85, 5, 2.4, 0xff0000);
                }
                this.app.scene.add(this.powerUpText);
                this.tempPowerUp = this.isPowerUpActive;
            }

            setTimeout(() => {
                if(this.isPowerUpActive){
                    if(this.powerUpText) this.app.scene.remove(this.powerUpText);
                    let seconds = Math.floor(this.powerUpRemainingTime / 1000) % 60;
                    this.powerUpText = this.createText(seconds.toString() + "s", 9.85, 5, 2.4, 0x00ff00);
                    this.app.scene.add(this.powerUpText);
                } 
            }, 1750);

            if(this.pause != this.tempPause){
                if (this.pauseText) this.app.scene.remove(this.pauseText);
                if(this.pause){
                    this.pauseText = this.createText("Paused", 9.85, 4, 1.8, 0xff0000);
                } else {
                    this.pauseText = this.createText("Ongoing", 9.85, 4, 1.8, 0x00ff00);
                }
                this.app.scene.add(this.pauseText);
                this.tempPause = this.pause;
            }

            //console.log('Elapsed Time:', minutes, 'minutes', seconds, 'seconds', milliseconds, 'milliseconds');
            //console.log('Elapsed Time:', seconds, 'seconds');

            // Pause
            if (this.vehicle.isGamePaused){
                console.log("paused")
                this.pauseStartTime = new Date();
                this.vehicle.isGamePaused = false;
                this.mixerPause = true;
                this.checkAnimationStateIsPause();
                this.clock.getDelta()
                this.pause = true;
            }

            // Resume
            if(this.vehicle.isGameResumed){
                console.log("resumed")
                this.pauseEndTime = new Date();
                this.pauseDuration = this.pauseEndTime - this.pauseStartTime;

                if(this.isPowerUpActive) this.powerUpEndTime = Date.now() + this.powerUpRemainingTime;
                if(this.isObstacleActive) this.obstacleEndTime = Date.now() + this.obstacleRemainingTime;
            
                this.totalPausedTime += this.pauseDuration;
                this.vehicle.isGameResumed = false;
                this.mixerPause = false;
                this.checkAnimationStateIsPause();
                this.clock.getDelta()
                this.pause = false;
            }

            if(!this.pause){
                
                // oponent animation
                const delta = this.clock.getDelta()
                this.mixer.update(this.difficultyVelocity * delta)
                this.checkAnimationStateIsPause()
                // --------------------------

                this.vehicle.updateMovement();

                let vehicleSpherePosition = new THREE.Vector3();
                this.vehicle.sphereMesh.getWorldPosition(vehicleSpherePosition)
                let vehicleSphere2Position = new THREE.Vector3();
                this.vehicle.sphereMesh2.getWorldPosition(vehicleSphere2Position)

                if (!this.playerCrossingFinish && (vehicleSphere2Position.x >= -1 && vehicleSphere2Position.x <= 1) && (vehicleSphere2Position.z >= -0.2 && vehicleSphere2Position.z <= 0.2)) {
                    this.playerLaps++;
                    this.playerCrossingFinish = true;
                    console.log("Player laps:" + this.playerLaps)
                } else if (vehicleSphere2Position.x < -1 || vehicleSphere2Position.x > 1 || vehicleSphere2Position.z < -0.2 || vehicleSphere2Position.z > 0.2) {
                    this.playerCrossingFinish = false;
                }

                let opponentSpherePosition = new THREE.Vector3();
                this.opponentVehicle.sphereMesh.getWorldPosition(opponentSpherePosition)
                let opponentSphere2Position = new THREE.Vector3();
                this.opponentVehicle.sphereMesh2.getWorldPosition(opponentSphere2Position)

                if (!this.opponentCrossingFinish && (opponentSphere2Position.x >= -1 && opponentSphere2Position.x <= 1) && (opponentSphere2Position.z >= -0.2 && opponentSphere2Position.z <= 0.2)) {
                    this.opponentLaps++;
                    this.opponentCrossingFinish = true;
                    console.log("Opponent Laps:" + this.opponentLaps)
                } else if (opponentSphere2Position.x < -1 || opponentSphere2Position.x > 1 || opponentSphere2Position.z < -0.2 || opponentSphere2Position.z > 0.2) {
                    this.opponentCrossingFinish = false;
                }

                // Check collisions
                vehicleSpherePosition = new THREE.Vector3();
                this.vehicle.sphereMesh.getWorldPosition(vehicleSpherePosition)
                vehicleSphere2Position = new THREE.Vector3();
                this.vehicle.sphereMesh2.getWorldPosition(vehicleSphere2Position)

                // Power Up
                for (let i = 0; i < this.track.powerUps.length; i++) {
                    let powerUp = this.track.powerUps[i];
                    let powerUpSpherePosition = powerUp.sphereMesh.getWorldPosition(new THREE.Vector3());
                    let powerUpSphereRadius = powerUp.sphereRadius;
                
                    let distance1 = powerUpSpherePosition.distanceTo(vehicleSpherePosition);
                    let sumOfRadius1 = powerUpSphereRadius + (this.vehicle.sphereRadius * 0.07);
                
                    let distance2 = powerUpSpherePosition.distanceTo(vehicleSphere2Position);
                    let sumOfRadius2 = powerUpSphereRadius + (this.vehicle.sphereRadius * 0.07);
                    if (((distance2 < sumOfRadius2) || (distance1 < sumOfRadius1)) && !this.isObstacleActive) {
                        if (!this.isPowerUpActive && this.canCatchPowerUp) {
                            this.pickingObstacle = true;
                            this.vehicle.isGamePaused = true;
                            this.vehicle.blockKeys = true;
                            this.pause = true;
                            this.app.setActiveCamera("Park2");
                            this.picker.pickableObjIds = ['Obstacle1', 'Obstacle2'];

                            if(powerUp.type == "increase-max-speed"){
                                this.vehicle.maxSpeed *= POWER_UP_INCREASE_MAX_SPEED;
                                this.vehicle.maxReverseSpeed *= POWER_UP_INCREASE_MAX_SPEED;
                            } else {
                                this.playerFinalTime -= POWER_UP_DECREASE_TOTAL_TIME;
                            }
                    
                            console.log("Power up ativo")
                        }
                    }
                }

                if (this.isPowerUpActive) {
                    let currentTime = Date.now();

                    if (currentTime >= this.powerUpEndTime) {
                        console.log("Power up acabou")
                        this.vehicle.maxSpeed = 0.1;
                        this.vehicle.maxReverseSpeed = -0.05;

                        this.isPowerUpActive = false;
                        this.powerUpStartTime = 0;
                        this.powerUpEndTime = 0;
                
                        this.canCatchPowerUp = true;
                    } else {
                        this.powerUpRemainingTime = this.powerUpEndTime - currentTime;
                        //console.log('Remaining Time:', Math.floor(this.powerUpRemainingTime / 1000) % 60, 'seconds');
                    }
                }
                
                // Obstacles
                for (let j = 0; j < this.track.obstacles.length; j++) {
                    let obstacle = this.track.obstacles[j];
                    let obstacleSpherePosition = obstacle.sphereMesh.getWorldPosition(new THREE.Vector3());
                    let obstacleSphereRadius = obstacle.sphereRadius;
                
                    let distance1 = obstacleSpherePosition.distanceTo(vehicleSpherePosition);
                    let sumOfRadius1 = obstacleSphereRadius + (this.vehicle.sphereRadius * 0.07);
                
                    let distance2 = obstacleSpherePosition.distanceTo(vehicleSphere2Position);
                    let sumOfRadius2 = obstacleSphereRadius + (this.vehicle.sphereRadius * 0.07);

                    if ((distance2 < sumOfRadius2) || (distance1 < sumOfRadius1)) {
                        if (!this.isObstacleActive && this.canCatchObstacle) {

                            if(obstacle.type == "decrease-max-speed"){
                                this.vehicle.maxSpeed *= OBSTACLE_DECREASE_MAX_SPEED;
                                this.vehicle.maxReverseSpeed *= OBSTACLE_DECREASE_MAX_SPEED;
                                if(this.vehicle.velocity > this.vehicle.maxSpeed) this.vehicle.velocity = this.vehicle.maxSpeed;
                                else if(this.vehicle.velocity < this.vehicle.maxReverseSpeed) this.vehicle.velocity = this.vehicle.maxReverseSpeed;
                            } else {
                                this.playerFinalTime += OBSTACLE_INCREASE_TOTAL_TIME;
                            }     
                    
                            this.obstacleStartTime = Date.now();
                            this.obstacleEndTime = this.obstacleStartTime + (OBSTACLE_DURATION * 1000);
                    
                            this.isObstacleActive = true;
                            this.canCatchObstacle = false;
                            console.log("Obstaculo ativo")
                        }
                    }

                }

                if (this.isObstacleActive) {
                    let currentTime = Date.now();

                    if (currentTime >= this.obstacleEndTime) {
                        console.log("Obstaculo acabou")

                        if(!this.hasCollidedWithOpponent){
                            this.vehicle.maxSpeed = 0.1;
                            this.vehicle.maxReverseSpeed = -0.05;
                        }

                        this.isObstacleActive = false;
                        this.obstacleStartTime = 0;
                        this.obstacleEndTime = 0;
                
                        this.canCatchObstacle = true;
                    } else {
                        this.obstacleRemainingTime = this.obstacleEndTime - currentTime;
                        //console.log('Remaining Time:', Math.floor(this.obstacleRemainingTime / 1000) % 60, 'seconds');
                    }
                }

                // Collision between vehicles
                opponentSpherePosition = new THREE.Vector3();
                this.opponentVehicle.sphereMesh.getWorldPosition(opponentSpherePosition)
                opponentSphere2Position = new THREE.Vector3();
                this.opponentVehicle.sphereMesh2.getWorldPosition(opponentSphere2Position)

                let vehicleDistances1 = vehicleSpherePosition.distanceTo(opponentSpherePosition);
                let vehicleDistances2 = vehicleSpherePosition.distanceTo(opponentSphere2Position);
                let vehicleDistances3 = opponentSpherePosition.distanceTo(vehicleSphere2Position);

                let sumOfVehicleRadius = (this.vehicle.sphereRadius * 0.07) + (this.opponentVehicle.sphereRadius * 0.07);

                if (((vehicleDistances1 < sumOfVehicleRadius) || (vehicleDistances2 < sumOfVehicleRadius) || (vehicleDistances3 < sumOfVehicleRadius))) {
                    if (!this.hasCollidedWithOpponent && this.canCollide) {
                        this.vehicle.maxSpeed *= OBSTACLE_DECREASE_MAX_SPEED;
                        this.vehicle.maxReverseSpeed *= OBSTACLE_DECREASE_MAX_SPEED;
                        if(this.vehicle.velocity > this.vehicle.maxSpeed) this.vehicle.velocity = this.vehicle.maxSpeed;
                        else if(this.vehicle.velocity < this.vehicle.maxReverseSpeed) this.vehicle.velocity = this.vehicle.maxReverseSpeed;
                
                        this.collisionEndTime = Date.now() + (COLLISION_DURATION * 1000);
                
                        this.hasCollidedWithOpponent = true;
                        this.canCollide = false;
                        console.log("Colisao com oponente - penalizacao ativa")
                    }
                }

                if (this.hasCollidedWithOpponent) {
                    let currentTime = Date.now();

                    if (currentTime >= this.collisionEndTime) {
                        console.log("Colisao com oponente - penalizacao acabou")

                        if(!this.isObstacleActive){
                            this.vehicle.maxSpeed = 0.1;
                            this.vehicle.maxReverseSpeed = -0.05;
                        }

                        this.hasCollidedWithOpponent = false;
                        this.collisionEndTime = 0;
                
                        this.canCollide = true;
                    } else {
                        this.collisionRemainingTime = this.collisionEndTime - currentTime;
                        //console.log('Remaining Time:', Math.floor(this.obstacleRemainingTime / 1000) % 60, 'seconds');
                    }
                }

                // Check if vehicle is on track
                let position = new THREE.Vector3(vehicleSphere2Position.x, vehicleSphere2Position.y, vehicleSphere2Position.z)
                let raycaster = new THREE.Raycaster(position, new THREE.Vector3(0, -1, 0));
                let intersections = raycaster.intersectObject(this.app.scene);

                let onTrack = false;
                for (let i = 0; i < intersections.length; i++) {
                    if (intersections[i].object.name == "track") {
                        onTrack = true;
                        break;
                    }
                }

                if(onTrack && !this.isObstacleActive && !this.isPowerUpActive && !this.hasCollidedWithOpponent){
                    this.vehicle.maxSpeed = 0.1;
                    this.vehicle.maxReverseSpeed = -0.05;
                } else if(!this.isObstacleActive && !this.isPowerUpActive && !this.hasCollidedWithOpponent){
                    this.vehicle.maxSpeed = 0.1 * 0.3;
                    this.vehicle.maxReverseSpeed = -0.05 * 0.3;
                    if(this.vehicle.velocity > this.vehicle.maxSpeed) this.vehicle.velocity = this.vehicle.maxSpeed;
                    else if(this.vehicle.velocity < this.vehicle.maxReverseSpeed)this.vehicle.velocity = this.vehicle.maxReverseSpeed;
                }

            }
            

        }

    }

}

export { MyReader };