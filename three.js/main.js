import * as THREE from 'three';
import './style.css';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


//Scene
const scene = new THREE.Scene();

//Create a sphere 

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: '#00ff83',
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
} 

//lights
const light = new THREE.PointLight(0xFFFFFF, 70, 100);
light.position.set(0, 10, 10);
scene.add(light);

//camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

//render 
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(2)


//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;


//Resize
window.addEventListener('resize', () => {
  //Update Sizes
  //console.log(window.innerWidth, window.innerHeight)
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update Camera as we get values
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();
