# SGI - Interactive Graphics Systems - M.EIC FEUP 2023/24

## Group: T07G07

| Name | Number | E-Mail |
| ---- | ------ | ------ |
| Diogo Fonte        | 202004175 | up202004175@edu.fe.up.pt |
| Rodrigo Figueiredo | 202005216 | up202005216@edu.fc.up.pt |

----

## Projects

### [TP1 - ThreeJS Basics](tp1)

- Strong Points
  - Flower: The flower was one of the components that required a lot of effort because, in addition to containing a stem represented by a curve, we decided to use LatheGeometry for the petals. The process of manipulating this geometry and replicating it correctly around the center of the flower was extremely laborious, but we were very pleased with the result.
  - Flower jar: Creating the flower jar was quite labor-intensive, as it required manipulating numerous points to achieve the desired result.
- Scene
  - Room with a centered table and the anniversary cake on top of a plate. Next to the cake there is a newspaper, a jar with a flower and a spring. We have two frames with our photos, a frame with a car, a window with a landscape view, a door and a lamp on top of the car frame.
  - Relative link to the scene: http://localhost/sgi-t07-g07/tp1/index.html (execute with Live Server)

-----

### [TP2 - Vintage Cinema](tp2)

- Strong Points
  - Scene Graph: Our scene graph has a good level of complexity, explores the concepts of transformations, hierarchy and property inherance. It also implements every functionality that made sense in the context of our scene.
  - Cinema screen with video: The theme of our project is "Vintage Cinema" so we needed to have a video for our cinema screen. It's correctly implemented, and apart from displaying the video it also has sound.
  - Buffer Geometry: The buffer geometry was the hardest primitive to implement and we took some time to really understand what we needed to do and how we could transfer our idea to code. After some time we managed to get it right and the buffer geometry is correctly implemented and totally configurable. We used the polygon primitive to add a prop to one of the walls of the cinema.
  - Interface: We implemented an interface where it's possible to change the active camera, turn on/off every light present at the scene and make the objects that use a wireframe change between wireframe and solid.
- Scene
  - The scene consists of a vintage cinema that contains 6 sofas with 2 pillows each, a stand for the projector in the middle of the room, a projector with an antique design, two speakers that make use of wireframes, and a screen where the movie is being displayed, that contains a video texture. The room also features some LEDs to ensure better lighting, and projecting shadows to the present objects. For the sofas we use MipMaps textures in order to use less computational resources when we increase the distance from them. There's also a skybox present at the scene with some "space" textures in order to provide more imersion in the movie. We also added a prop to one of the walls that uses a buffer geometry. Finally, there's an interface where it's possible to change the active camera, turn on/off every light present at the scene and make the objects that use a wireframe change between wireframe and solid.
  - Relative link to the scene: http://localhost/sgi-t07-g07/tp2/index.html (execute with Live Server)


----

### [TP3 - F1 Racing Game](tp3)

- Strong Points
  - Vehicle: We are very proud of our vehicle since it's very detailed and it resembles a lot a Formula 1 car, and that was exactly our objective. We took a lot of time since it is composed by a lot of different components but it was worth it and we couldn't be happier with the result.
  - Outdoor Display: Our outdoor display shows all the needed information, and is correctly updated when some information is changed. It also deals well with different game states, always displaying the correct elapsed time.
  - Menus: Our menus, including the initial and final one, were made with great detail and we made sure that apart from working they were visually appealing. All buttons represent different functionalities, and every single one of them works, including changing game difficulty, changing player name, etc.
  - Parkings: In our opinion the parks are visually appealing and we used different techniques in a successful way, including picking, and also presented valuable information to the user, like what vehicle he picked for him and for his opponent, with the option of deselecting the vehicle he first picked in order to choose another one. For the vehicles park there is also a countdown before the race starts.
  - YASF language: We made use of the YASF language for this pratical work in order to build some components of our scene in a faster way.

