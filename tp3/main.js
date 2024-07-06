import { MyApp } from './MyApp.js';
import { MyInterface } from './MyInterface.js';
import { MyReader } from './MyReader.js';

// create the application object
let app = new MyApp()
// initializes the application
app.init()

// create the contents object
let contents = new MyReader(app)
// initializes the contents
contents.init()
// hooks the contents object in the application object
app.setContents(contents);

// create the gui interface object
let gui = new MyInterface(app)
// set the contents object in the gui interface object
gui.setContents(contents)

// we call the gui interface init 
// after contents were created because
// interface elements may control contents items
gui.init();

// main animation loop - calls every 50-60 ms.
app.render()
