import * as THREE from 'three';

			import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
			import { FontLoader } from 'three/addons/loaders/FontLoader.js';
            import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

			let camera, scene, renderer;

			init();

            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
            const material = new THREE.MeshBasicMaterial( { color: "#fcc203" } );
            const cube = new THREE.Mesh( geometry, material );
            scene.add( cube );
            cube.position.set(0,-1,0);
            camera.position.z = 5;

            rotate()

			function init( ) {

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.set( 0, - 400, 600 );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );

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
				

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.target.set( 0, 0, 0 );
				controls.update();

				controls.addEventListener( 'change', render );

				window.addEventListener( 'resize', onWindowResize );

			} // end init

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}

            function rotate (){
                 cube.rotation.y += 0.1;
                 renderer.render(scene, camera);
                 renderer.setAnimationLoop(rotate);
            };