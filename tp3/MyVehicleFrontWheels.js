import * as THREE from 'three';
import { MyVehicleWheel } from './MyVehicleWheel.js';

class MyVehicleFrontWheels extends THREE.Object3D {

    /**
     * 
     * @param {MyApp} app the application object
     */
    constructor(app) {
        super();
        this.app = app;

        this.vehicleWheel1 = new MyVehicleWheel(this.app);
        this.vehicleWheel1.position.z = 12.0;
        this.add(this.vehicleWheel1);

        this.vehicleWheel2 = new MyVehicleWheel(this.app);
        this.vehicleWheel2.position.x = 5.0;
        this.vehicleWheel2.position.z = 12.0;
        this.add(this.vehicleWheel2);

    }

    rotate(degree, limit){
        if(degree < limit){
            this.vehicleWheel1.rotation.y = degree;
            this.vehicleWheel2.rotation.y = degree;
        }
    }

}

export { MyVehicleFrontWheels };
