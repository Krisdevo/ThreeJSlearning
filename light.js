
			import * as THREE from 'three';

			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
			import { FontLoader } from 'three/addons/loaders/FontLoader.js';
            import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

			let camera, scene, renderer;

			init();

			function init( ) {

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 0, - 400, 600 );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );

				const loader = new FontLoader();
				loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

					const color = 0x006699;

					const matDark = new THREE.LineBasicMaterial( {
						color: color,
						side: THREE.DoubleSide
					} );

					const matLite = new THREE.MeshBasicMaterial( {
						color: color,
						transparent: true,
						opacity: 0.4,
						side: THREE.DoubleSide
					} );

					const message = '   Three.js\nSimple text.';

					const shapes = font.generateShapes( message, 100 );

					const geometry = new THREE.ShapeGeometry( shapes );

					geometry.computeBoundingBox();

					const xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );

					geometry.translate( xMid, 0, 0 );

					// make shape ( N.B. edge view not visible )

					const text = new THREE.Mesh( geometry, matLite );
					text.position.z = - 150;
					scene.add( text );

					// make line shape ( N.B. edge view remains visible )

					const holeShapes = [];

					for ( let i = 0; i < shapes.length; i ++ ) {

						const shape = shapes[ i ];

						if ( shape.holes && shape.holes.length > 0 ) {

							for ( let j = 0; j < shape.holes.length; j ++ ) {

								const hole = shape.holes[ j ];
								holeShapes.push( hole );

							}

						}

					}

					shapes.push( ...holeShapes );

					const lineText = new THREE.Object3D();

					for ( let i = 0; i < shapes.length; i ++ ) {

						const shape = shapes[ i ];

						const points = shape.getPoints();
						const geometry = new THREE.BufferGeometry().setFromPoints( points );

						geometry.translate( xMid, 0, 0 );

						const lineMesh = new THREE.Line( geometry, matDark );
						lineText.add( lineMesh );

					}

					scene.add( lineText );

					render();

				} ); 

                const fontloader = new FontLoader();
                
                fontloader.load( 'Super Mario 256_Regular.json', function ( font ) {
                
                    const geometry = new TextGeometry( 'Louis', {
                        font: font,
                        size: 2,
                        depth: 0.5,
                        curveSegments: 12,
                        height: 0.15,
                    
                    } );
                
                    geometry.center()
                //material mesh
                const material = new THREE.MeshNormalMaterial();
                const mesh = new THREE.Mesh(geometry,material);
                mesh.position.set(0 ,1.5 ,0)
                scene.add(mesh);
                //render
                camera.position.set(0 , 0 ,5);
                camera.lookAt(0 ,0 ,0);
                renderer.render(scene, camera);
                } );

                const geometry = new THREE.BoxGeometry( 1, 1, 1 );
                const material = new THREE.MeshBasicMaterial( { color: "#ffac25"}  );
                const cube = new THREE.Mesh( geometry, material );
                scene.add( cube );
                cube.position.set(0,-1,0);
                
                camera.position.z = 5;

                

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.target.set( 0, 0, 0 );
				controls.update();

				controls.addEventListener( 'change', render );

				window.addEventListener( 'resize', onWindowResize );

			} 

                // function animate() {
                //     cube.rotation.x += 0.01;
                //     cube.rotation.y += 0.01;
                //     renderer.render( scene, camera )
                
                
                // }
         


			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}

            function rotate(){
            cube.rotation.x += 0.01;
            }
             renderer.setAnimationLoop( rotate );
	
    