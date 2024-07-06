import * as THREE from 'three';
import { MyFileReader } from './parser/MyFileReader.js';

class MyParser {

    /**
       constructs the object
       @param {MyApp} app The application object
    */ 
       constructor(app) {
        this.app = app;

        this.textureDictionary = {};
        this.materialDictionary = {};
        this.lights = {};

        this.reader = new MyFileReader(app, this, this.onSceneLoaded);
        this.reader.open("scenes/scene.xml");

    }

    /**
     * Called when the scene xml file load is complete
     * @param {MySceneData} data the entire scene data object
     */
    onSceneLoaded(data) {
        //console.info("scene data loaded " + data + ". visit MySceneData javascript class to check contents for each data item.")
        this.onAfterSceneLoadedAndBeforeRender(data);
    }

    output(obj, indent = 0) {
        //console.log("" + new Array(indent * 4).join(' ') + " - " + obj.type + " " + (obj.id !== undefined ? "'" + obj.id + "'" : ""))
    }

    onAfterSceneLoadedAndBeforeRender(data) {

        this.createSkybox(data.skyboxes)
        this.createAmbient(data.options.ambient)
        this.createBackground(data.options.background)
        this.createFog(data.fog)
        this.createTextures(data.textures)
        this.createMaterials(data.materials)

        let finalGroup = this.traverseGraphRecursive(data.nodes[data.rootId], null, new THREE.Matrix4(), false, false)
        this.app.scene.add(finalGroup)
    }

    createAmbient(ambient) {
        if ( ambient != null) this.app.scene.add(new THREE.AmbientLight(new THREE.Color(ambient)))
        else console.log("Missing ambient");
    }

    createBackground(background) {
        if ( background != null) this.app.scene.background = new THREE.Color(background)
        else console.log("Missing background");
    }

    createFog(fog) {
        if ( fog != null) this.app.scene.fog = new THREE.Fog(fog.color, fog.near, fog.far)
        else console.log("Missing fog");
    }

    createTextures(textures) {
        for (var key in textures) {
            if(textures[key].isVideo) {

                let video = document.getElementById( 'shrek-video' );
                let texture = new THREE.VideoTexture( video );
                texture.colorSpace = THREE.SRGBColorSpace;
                this.textureDictionary[textures[key].id] = texture;

            } else if(!textures[key].mipmaps) {

                let texture = new THREE.TextureLoader().load(textures[key].filepath);
                texture.generateMipmaps = false;
                for (let i = 0; i <= 7; i++) {
                    if (textures[key][`mipmap${i}`] !== null) this.loadMipmap(texture, i, textures[key][`mipmap${i}`])
                }
                this.textureDictionary[textures[key].id] = texture; 

            } else {

                let texture = new THREE.TextureLoader().load(textures[key].filepath);
                texture.generateMipmaps = true;
                texture.magFilter = THREE[textures[key].magFilter];
                texture.minFilter = THREE[textures[key].minFilter];
                texture.anisotropy = textures[key].anisotropy;
                this.textureDictionary[textures[key].id] = texture; 

            }
        }
    }

    loadMipmap(parentTexture, level, path) {
        // load texture. On loaded call the function to create the mipmap for the specified level 
        new THREE.TextureLoader().load(path, 
            function(mipmapTexture)  // onLoad callback
            {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                ctx.scale(1, 1);
                
                // const fontSize = 48
                const img = mipmapTexture.image         
                canvas.width = img.width;
                canvas.height = img.height

                // first draw the image
                ctx.drawImage(img, 0, 0 )
                             
                // set the mipmap image in the parent texture in the appropriate level
                parentTexture.mipmaps[level] = canvas
            },
            undefined, // onProgress callback currently not supported
            function(err) {
                console.error('Unable to load the image ' + path + ' as mipmap level ' + level + ".", err)
            }
        )
    }

    createMaterials(materials) {
        for (var key in materials) {
            let material = new THREE.MeshPhongMaterial({
                color: new THREE.Color(materials[key].color), 
                specular: new THREE.Color(materials[key].specular), 
                emissive: new THREE.Color(materials[key].emissive), 
                shininess: materials[key].shininess,
            });

            if(materials[key].wireframe){
                material.wireframe = materials[key].wireframe
                this.wireframes[materials[key].id] = true
            }

            if(materials[key].shading == "flat") material.flatShading = true;
            else material.flatShading = false;

            if(materials[key].twosided == true) material.side = THREE.DoubleSide;
                else material.side = THREE.FrontSide;

            if(materials[key].textureref != null){
                material.map = this.textureDictionary[materials[key].textureref];
                material.map.repeat.set(materials[key].texlength_s, materials[key].texlength_t);
                if(materials[key].bumpref != null){
                    material.bumpMap = this.textureDictionary[materials[key].bumpref];
                    material.bumpScale = materials[key].bumpscale;
                }
                if(materials[key].specularref != null){
                    material.specularMap = this.textureDictionary[materials[key].specularref];
                }
            }

            this.materialDictionary[materials[key].id] = material;
        }
    }

    traverseGraphRecursive(node, materialRef, transformationMatrix, castshadows, receiveshadows){

        if(node.castShadows) castshadows = true;
        if(node.receiveShadows) receiveshadows = true;

        if (node.type === "primitive") {
            switch(node.subtype){
                case 'cylinder':
                    return this.createCylinder(node, materialRef, transformationMatrix, castshadows, receiveshadows);
                case 'ring':
                    return this.createRing(node, materialRef, transformationMatrix, castshadows, receiveshadows);
                case 'rectangle':
                    return this.createRectangle(node, materialRef, transformationMatrix, castshadows, receiveshadows);
                case 'circle':
                    return this.createCircle(node, materialRef, transformationMatrix, castshadows, receiveshadows);
                case 'lathe':
                    return this.createLathe(node, materialRef, transformationMatrix, castshadows, receiveshadows);
                case 'torus':
                    return this.createTorus(node, materialRef, transformationMatrix, castshadows, receiveshadows);
                case 'sphere':
                    return this.createSphere(node, materialRef, transformationMatrix, castshadows, receiveshadows);
                case 'box':
                    return this.createBox(node, materialRef, transformationMatrix, castshadows, receiveshadows);
                case 'polygon':
                    return this.createBufferGeometry(node, transformationMatrix, castshadows, receiveshadows);
                case 'nurbs':
                    return this.createNurbs(node, materialRef, transformationMatrix, castshadows, receiveshadows);
                default:
                    return null;
            }
        } else {
            switch (node.type) {
                case 'pointlight':
                    this.createPointLight(node)
                    return null;
                case 'spotlight':
                    this.createSpotLight(node)
                    return null;
                case 'directionallight':
                    this.createDirectionalLight(node)
                    return null;
                default:
                    break;
            }
        }

        // Material
        let materialId = materialRef;
        if (node.materialIds.length > 0) {
            materialId = node.materialIds[0];
        }

        // Transformation Matrix
        let localMatrix = new THREE.Matrix4();
        for (let i= 0; i < node.transformations.length; i++) {
            let transformation = node.transformations[i]
            switch (transformation.type) {
                case 'T':
                    localMatrix.multiply(new THREE.Matrix4().makeTranslation(new THREE.Vector3(transformation.translate[0], transformation.translate[1], transformation.translate[2])));
                    break;
                case 'R':
                    const euler = new THREE.Euler(THREE.MathUtils.degToRad(transformation.rotation[0]) ,THREE.MathUtils.degToRad(transformation.rotation[1]), THREE.MathUtils.degToRad(transformation.rotation[2]), 'XYZ')
                    localMatrix.multiply(new THREE.Matrix4().makeRotationFromEuler(euler));
                    break;
                case 'S':
                    localMatrix.multiply(new THREE.Matrix4().makeScale(transformation.scale[0] ,transformation.scale[1], transformation.scale[2]));
                    break;
                default:
                    break;
            }
        }

        let matrixResult = new THREE.Matrix4().multiplyMatrices(transformationMatrix, localMatrix);
    
        let group = new THREE.Group();
    
        for (let i=0; i < node.children.length; i++) {
            let child = node.children[i]
            let result = this.traverseGraphRecursive(child, materialId, matrixResult, castshadows, receiveshadows);
            if(result != null) group.add(result);
        }
    
        return group;

    }

    createCylinder(child, materialId, transformationMatrix, castshadows, receiveshadows){
        let attributes = child.representations[0];
        let cylinderGeometry = new THREE.CylinderGeometry(
            attributes.top, 
            attributes.base, 
            attributes.height, 
            attributes.slices, 
            attributes.stacks, 
            attributes.capsclose, 
            attributes.thetastart, 
            attributes.thetalength
        );

        let material = this.materialDictionary[materialId];
        let cylinder = new THREE.Mesh(cylinderGeometry, material );

        if(castshadows) cylinder.castShadow = true;
        if(receiveshadows) cylinder.receiveShadow = true;

        cylinder.applyMatrix4(transformationMatrix);
        cylinder.updateMatrix();

        return cylinder

    }

    createRing(child, materialId, transformationMatrix, castshadows, receiveshadows){
        let attributes = child.representations[0];
        let ringGeometry = new THREE.RingGeometry(
            attributes.inner, 
            attributes.outter, 
            attributes.slices, 
            attributes.stacks, 
            attributes.thetastart, 
            attributes.thetalength
        );

        let material = this.materialDictionary[materialId];
        let ring = new THREE.Mesh(ringGeometry, material );

        if(castshadows) ring.castShadow = true;
        if(receiveshadows) ring.receiveShadow = true;

        ring.applyMatrix4(transformationMatrix);
        ring.updateMatrix();

        return ring

    }
    
    createRectangle(child, materialId, transformationMatrix, castshadows, receiveshadows){
        let attributes = child.representations[0];
        let rectangleGeometry = new THREE.PlaneGeometry(
            attributes.xy1[0] - attributes.xy2[0], 
            attributes.xy1[1] - attributes.xy2[1],
            attributes.parts_x,
            attributes.parts_y
        );

        let material = this.materialDictionary[materialId];
        let rectangle = new THREE.Mesh(rectangleGeometry, material);

        rectangle.position.x =(attributes.xy1[0] + attributes.xy2[0]) / 2
        rectangle.position.y =(attributes.xy1[1] + attributes.xy2[1]) / 2

        if(castshadows) rectangle.castShadow = true;
        if(receiveshadows) rectangle.receiveShadow = true;

        rectangle.applyMatrix4(transformationMatrix);
        rectangle.updateMatrix();

        return rectangle

    }

    createCircle(child, materialId, transformationMatrix, castshadows, receiveshadows){
        let attributes = child.representations[0];
        let circleGeometry = new THREE.CircleGeometry(
            attributes.radius, 
            attributes.segments, 
            attributes.thetastart, 
            attributes.thetalength
        );

        let material = this.materialDictionary[materialId];
        let circle = new THREE.Mesh(circleGeometry, material );

        if(castshadows) circle.castShadow = true;
        if(receiveshadows) circle.receiveShadow = true;

        circle.applyMatrix4(transformationMatrix);
        circle.updateMatrix();

        return circle

    }

    createLathe(child, materialId, transformationMatrix, castshadows, receiveshadows){
        let attributes = child.representations[0];

        const points = [];
        for ( let i = 0; i < 10; i ++ ) {
            points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
        }

        let latheGeometry = new THREE.LatheGeometry(
            points,
            attributes.segments, 
            attributes.phistart, 
            attributes.philength
        );

        let material = this.materialDictionary[materialId];
        let lathe = new THREE.Mesh(latheGeometry, material );

        if(castshadows) lathe.castShadow = true;
        if(receiveshadows) lathe.receiveShadow = true;

        lathe.applyMatrix4(transformationMatrix);
        lathe.updateMatrix();

        return lathe

    }

    createTorus(child, materialId, transformationMatrix, castshadows, receiveshadows){
        let attributes = child.representations[0];
        let torusGeometry = new THREE.TorusGeometry(
            attributes.radius, 
            attributes.tube,
            attributes.radialSegments, 
            attributes.tubularSegments,
            attributes.arc
        );

        let material = this.materialDictionary[materialId];
        let torus = new THREE.Mesh(torusGeometry, material );

        if(castshadows) torus.castShadow = true;
        if(receiveshadows) torus.receiveShadow = true;

        torus.applyMatrix4(transformationMatrix);
        torus.updateMatrix();

        return torus

    }

    createSphere(child, materialId, transformationMatrix, castshadows, receiveshadows){
        let attributes = child.representations[0];
        let sphereGeometry = new THREE.SphereGeometry(
            attributes.radius,
            attributes.slices,
            attributes.stacks,
            attributes.phistart,
            attributes.philength,
            attributes.thetastart,
            attributes.thetalength
        );

        let material = this.materialDictionary[materialId];
        let sphere = new THREE.Mesh(sphereGeometry, material );

        if(castshadows) sphere.castShadow = true;
        if(receiveshadows) sphere.receiveShadow = true;

        sphere.applyMatrix4(transformationMatrix);
        sphere.updateMatrix();

        return sphere

    }

    createNurbs(child, materialId, transformationMatrix, castshadows, receiveshadows){
        let attributes = child.representations[0];

        let nurbsBuilder = new MyNurbsBuilder;

        let controlPoints = Array.from({length: attributes.degree_u + 1}, (_, u) => 
            Array.from({length: attributes.degree_v + 1}, (_, v) => {
            const index = u * (attributes.degree_v + 1) + v;
            const { xx, yy, zz } = attributes.controlpoints[index];
            return [xx, yy, zz, 1];
        })
        );

        let material = this.materialDictionary[materialId];
        let surfaceData = nurbsBuilder.build(controlPoints, attributes.degree_u, attributes.degree_v, attributes.parts_u, attributes.parts_v, material) 
        
        let nurbs = new THREE.Mesh( surfaceData, material );
        
        if(castshadows) nurbs.castShadow = true;
        if(receiveshadows) nurbs.receiveShadow = true;

        nurbs.applyMatrix4(transformationMatrix);
        nurbs.updateMatrix();

        return nurbs
    }

    createBox(child, materialId, transformationMatrix, castshadows, receiveshadows){
        let attributes = child.representations[0];
        let boxGeometry = new THREE.BoxGeometry(
            attributes.xyz2[0] - attributes.xyz1[0],
            attributes.xyz2[1] - attributes.xyz1[1],
            attributes.xyz2[2] - attributes.xyz1[2],
            attributes.parts_x,
            attributes.parts_y,
            attributes.parts_z
        );

        let material = this.materialDictionary[materialId];
        let box = new THREE.Mesh(boxGeometry, material );

        if(castshadows) box.castShadow = true;
        if(receiveshadows) box.receiveShadow = true;

        box.applyMatrix4(transformationMatrix);
        box.updateMatrix();

        return box
    }

    createBufferGeometry(child, transformationMatrix, castshadows, receiveshadows){

        let attributes = child.representations[0];

        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const normals = [];
        const colors = [];
    
        positions.push(0, 0, 0);
        normals.push(0, 0, 1);
        colors.push(attributes.color_c.r, attributes.color_c.g, attributes.color_c.b, attributes.color_c.a);

        for (let j = 0; j < attributes.stacks; j++) {
            const currentRadius = attributes.radius * ((j + 1) / attributes.stacks);
        
            for (let i = 0; i < attributes.slices; i++) {
                const angle = (i / attributes.slices) * Math.PI * 2;
                const x = Math.cos(angle) * currentRadius;
                const y = Math.sin(angle) * currentRadius;
        
                positions.push(x, y, 0);
                normals.push(0, 0, 1);
                let color = new THREE.Color().lerpColors(attributes.color_c, attributes.color_p, j / attributes.stacks);
                colors.push(color.r, color.g, color.b, color.a);
            }
        }

        const indices = [];

        // Stack 0
        for(let i = 1; i <= attributes.slices; i++){
            indices.push(i, 0, (i % attributes.slices) + 1);
        }

        // Stack 1 - attributes.stacks
        for(let i = 1; i < attributes.stacks; i++){

            for(let j = 1; j <= attributes.slices; j++){
                let indice = j + i * attributes.slices;
                if(j != attributes.slices){
                    indices.push(indice, indice - attributes.slices, indice - attributes.slices + 1);
                    indices.push(indice, indice - attributes.slices + 1, indice + 1);
                } else {
                    indices.push(indice, indice - attributes.slices, indice - (j * 2) + 1);
                    indices.push(indice, indice - (j * 2) + 1, indice - attributes.slices + 1);
                }
            }
        }
    
        geometry.setIndex(indices);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
    
        geometry.computeBoundingSphere();
    
        const material = new THREE.MeshStandardMaterial( {
            color: 0xffffff, side: THREE.DoubleSide, vertexColors: true, transparent: false, wireframe: false
        } );
        let bufferGeometry = new THREE.Mesh(geometry, material);
        
        bufferGeometry.applyMatrix4(transformationMatrix);
        bufferGeometry.updateMatrix();
    
        if(castshadows) bufferGeometry.castShadow = true;
        if(receiveshadows) bufferGeometry.receiveShadow = true;
    
        return bufferGeometry; 
    }

    createSkybox(skybox){
        let skyboxImagepaths = [skybox.default.front, skybox.default.back, skybox.default.up, skybox.default.down, skybox.default.right, skybox.default.left]
        let materialArray = skyboxImagepaths.map(image => {
            let texture = new THREE.TextureLoader().load(image);

            return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
        });

        let skyboxGeometry = new THREE.BoxGeometry(skybox.default.size[0], skybox.default.size[1], skybox.default.size[2]);

        let skyboxMesh = new THREE.Mesh(skyboxGeometry, materialArray);
        skyboxMesh.position.set(skybox.default.center[0], skybox.default.center[1], skybox.default.center[2]);

        this.app.scene.add(skyboxMesh);
    }

    createPointLight(child){
        let light = new THREE.PointLight( child.color, child.intensity, child.distance, child.decay );
        light.enabled = child.enabled
        light.position.set( child.position[0], child.position[1], child.position[2] );
        light.castShadow = child.castshadow;

        if(child.castshadow){
            light.shadow.camera.far = child.shadowfar
            light.shadow.mapSize.width = child.shadowmapsize
            light.shadow.mapSize.height = child.shadowmapsize
        }

        this.lights[child.id] = light

        if(light.enabled){
            this.app.scene.add( light );
        }

        let pointLightHelper = new THREE.PointLightHelper( light, 0.5 );
        //this.app.scene.add( pointLightHelper );
        
    }

    createSpotLight(child){
        let spotLight = new THREE.SpotLight( child.color, child.intensity, child.distance, THREE.MathUtils.degToRad(child.angle), child.penumbra, child.decay );
        spotLight.enabled = child.enabled
        spotLight.position.set( child.position[0], child.position[1], child.position[2] );
        spotLight.castShadow = child.castshadow;

        if(child.castshadow){
            spotLight.shadow.camera.far = child.shadowfar
            spotLight.shadow.mapSize.width = child.shadowmapsize
            spotLight.shadow.mapSize.height = child.shadowmapsize
        }

        let spotLightTarget = new THREE.Object3D(); 
        spotLightTarget.position.set(child.target[0], child.target[1], child.target[2]);
        this.app.scene.add( spotLightTarget );
        spotLight.target = spotLightTarget;

        this.lights[child.id] = spotLight

        if(spotLight.enabled){
            this.app.scene.add( spotLight );
        }

        /*let spotLightHelper = new THREE.SpotLightHelper( spotLight );
        this.app.scene.add( spotLightHelper );*/
    }

    createDirectionalLight(child){
        let directionalLight = new THREE.DirectionalLight( child.color, child.intensity );
        directionalLight.enabled = child.enabled
        directionalLight.position.set( child.position[0], child.position[1], child.position[2] );
        directionalLight.castShadow = child.castshadow;

        if(child.castshadow){
            directionalLight.shadow.camera.far = child.shadowfar
            directionalLight.shadow.camera.left = child.shadowleft
            directionalLight.shadow.camera.right = child.shadowright
            directionalLight.shadow.camera.bottom = child.shadowbottom
            directionalLight.shadow.camera.top = child.shadowtop
            directionalLight.shadow.mapSize.width = child.shadowmapsize
            directionalLight.shadow.mapSize.height = child.shadowmapsize
        }

        this.lights[child.id] = directionalLight

        if(directionalLight.enabled){
            this.app.scene.add( directionalLight );
        }

        let directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 2 );
        this.app.scene.add( directionalLightHelper )
    }

}
export { MyParser };