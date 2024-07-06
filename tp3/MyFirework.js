import * as THREE from 'three'

class MyFirework {

    constructor(app, scene, side) {
        this.app = app
        this.scene = scene
        this.side = side;

        this.done     = false 
        this.dest     = [] 
        
        this.vertices = null
        this.colors   = null
        this.geometry = null
        this.points   = null
        
        this.material = new THREE.PointsMaterial({
            size: 0.1,
            color: 0xffffff,
            opacity: 1,
            vertexColors: true,
            transparent: true,
            depthTest: false,
        })
        
        this.height = 4
        this.speed = 60

        this.launch() 

        this.particleSystem = new THREE.Points(this.geometry, this.material);
        this.app.scene.add(this.particleSystem);
        //console.log("firework launched");

    }

    /**
     * compute particle launch
     */

    launch() {
        let color = new THREE.Color()
        color.setHSL( THREE.MathUtils.randFloat( 0.1, 0.9 ), 1, 0.9 )
        let colors = [ color.r, color.g, color.b ]

        if(this.side == "left"){
            let x = THREE.MathUtils.randFloat( -3.4, -3.5 ) 
            let y = THREE.MathUtils.randFloat( -29.75, -30.25)
            let z = THREE.MathUtils.randFloat( 25.45, 25.55) 
            this.dest.push( x, y, z ) 
            let vertices = [0,-35,25.5]
            
            this.geometry = new THREE.BufferGeometry()
            this.geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(vertices), 3 ) );
            this.geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array(colors), 3 ) );
            this.points = new THREE.Points( this.geometry, this.material )
            this.points.castShadow = true;
            this.points.receiveShadow = true;
            this.app.scene.add( this.points ) 
        } else {
            let x = THREE.MathUtils.randFloat( 3.5, 3.5 ) 
            let y = THREE.MathUtils.randFloat( -29.75, -30.25)
            let z = THREE.MathUtils.randFloat( 25.45, 25.55) 
            this.dest.push( x, y, z ) 
            let vertices = [0,-35,25.5]
            
            this.geometry = new THREE.BufferGeometry()
            this.geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array(vertices), 3 ) );
            this.geometry.setAttribute( 'color', new THREE.BufferAttribute( new Float32Array(colors), 3 ) );
            this.points = new THREE.Points( this.geometry, this.material )
            this.points.castShadow = true;
            this.points.receiveShadow = true;
            this.app.scene.add( this.points ) 
        }
         
        //console.log("firework launched")
    }

    /**
     * compute explosion
     * @param {*} vector 
     */
    explode(origin, n, rangeBegin, rangeEnd) {
        // ... existing code ...

        const positions = [];
        const colors = [];

        for (let i = 0; i < n; i++) {
            let color = new THREE.Color();
            color.setHSL(THREE.MathUtils.randFloat(-0.1, 0.9), 1, 0.5);
            colors.push(color.r, color.g, color.b);

            let x = THREE.MathUtils.randFloat(rangeBegin, rangeEnd);
            let y = THREE.MathUtils.randFloat(rangeBegin, rangeEnd);
            let z = THREE.MathUtils.randFloat(rangeBegin, rangeEnd);

            positions.push(origin[0] + x, origin[1] + y, origin[2] + z);
        }

        const newPositions = new Float32Array(positions);
        const newColors = new Float32Array(colors);

        this.geometry.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));
        this.geometry.setAttribute('color', new THREE.BufferAttribute(newColors, 3));

        this.particleSystem.geometry = this.geometry; // Update the geometry
    }
    
    /**
     * cleanup
     */
    reset() {
        //console.log("firework reseted")
        this.app.scene.remove( this.points )  
        this.dest     = [] 
        this.vertices = null
        this.colors   = null 
        this.geometry = null
        this.points   = null
    }

    clean(){
        if(this.particleSystem) this.app.scene.remove(this.particleSystem);
    }

    /**
     * update firework
     * @returns 
     */
    update() {
        // do only if objects exist
        if (this.points && this.geometry) {
            let verticesAtribute = this.geometry.getAttribute('position');
            let vertices = verticesAtribute.array;
            let count = verticesAtribute.count;
    
            if (!this.isExploded) {
                for (let i = 0; i < vertices.length; i += 3) {
                    vertices[i] += (this.dest[i] - vertices[i]) / this.speed;
                    vertices[i + 1] += (this.dest[i + 1] - vertices[i + 1]) / this.speed;
                    vertices[i + 2] += (this.dest[i + 2] - vertices[i + 2]) / this.speed;
                }
                verticesAtribute.needsUpdate = true;
    
                if (Math.ceil(vertices[1]) > this.dest[1] ) {
                    this.isExploded = true;
                    this.explode(vertices, 80, -2, 2);
                    return;
                }

            }
    
            if (this.isExploded) {

                for (let i = 0; i < vertices.length; i += 3) {
                    vertices[i] += THREE.MathUtils.randFloat(-0.01, 0.01);
                    vertices[i + 1] += THREE.MathUtils.randFloat(-0.05, 0.0);
                    vertices[i + 2] += THREE.MathUtils.randFloat(-0.01, 0.01);
                }
                verticesAtribute.needsUpdate = true;
    
                this.material.opacity -= 0.015;
                this.material.needsUpdate = true;
    
                if (this.material.opacity <= 0) {
                    this.reset();
                    this.done = true;
                    return;
                }

                for (let i = 0; i < vertices.length; i += 3) {
                    vertices[i + 1] -= 0.05;
                }
                verticesAtribute.needsUpdate = true;

                this.material.opacity -= 0.015;
                this.material.needsUpdate = true;

                let fullyTransparent = true;
                for (let i = 0; i < vertices.length; i += 3) {
                    if (vertices[i + 1] < -3) {
                        fullyTransparent = false;
                        break;
                    }
                }

                if (fullyTransparent) {
                    this.reset();
                    this.done = true;
                    return;
                }
            }
        }
    }
    
    
}

export { MyFirework }