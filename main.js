import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

// Création d'un espace de travail 3D

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//  const controls = new OrbitControls( camera, renderer.domElement );
// const loader = new GLTFLoader();

const renderer = new THREE.WebGLRenderer( {antialias :true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


let hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
scene.add(hemiLight);
scene.add(new THREE.AxesHelper(500));



//Création d'un cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: "#006FFF" } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.position.set(0,-1,0);

camera.position.z = 5;

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









// // Céation d'une flêche
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
// camera.position.set( 0, 0, 100 );
// camera.lookAt( 0, 0, 0 );

// const scene = new THREE.Scene();
// const material2 = new THREE.LineBasicMaterial( { color: 0x0000ff } );

// const points = [];
// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );

// const geometry2 = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line( geometry2, material2 );

// scene.add( line );
// renderer.render( scene, camera );

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera )


}
renderer.setAnimationLoop( animate );



			function onWindowResize() {

				const canvasWidth = window.innerWidth;
				const canvasHeight = window.innerHeight;

				renderer.setSize( canvasWidth, canvasHeight );

				camera.aspect = canvasWidth / canvasHeight;
				camera.updateProjectionMatrix();

				render();

			}