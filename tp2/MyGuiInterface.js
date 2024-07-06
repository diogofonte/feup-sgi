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

        const camerasFolder = this.datgui.addFolder( 'Cameras' );
        camerasFolder.add(this.app, 'activeCameraName', Object.keys(this.app.cameras)).name("Active Camera")

        const lightsFolder = this.datgui.addFolder( 'Lights' );
        for(let light in this.contents.lights){
            lightsFolder.add(this.contents.lights[light], 'enabled').name(light).onChange((value) => {this.contents.updateLight(value, light)})
        }
        lightsFolder.close();

        const wireFramesFolder = this.datgui.addFolder( 'Wireframes' );
        wireFramesFolder.add(this.contents, 'wireframesEnabled', true).name('Wireframes').onChange((value) => {this.contents.updateWireframes(value)})

    }
}

export { MyGuiInterface };