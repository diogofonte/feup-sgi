import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { MyApp } from './MyApp.js';
import { MyReader } from './MyReader.js';

/**
    This class customizes the gui interface for the app
*/
class MyInterface  {

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
     * @param {MyReader} contents the contents objects 
     */
    setContents(contents) {
        this.contents = contents
    }

    /**
     * Initialize the gui interface
     */
    init() {

        const camerasFolder = this.datgui.addFolder( 'Cameras' );
        camerasFolder.add(this.app, 'activeCameraName', Object.keys(this.app.cameras)).name("Active Camera")

    }
}

export { MyInterface };