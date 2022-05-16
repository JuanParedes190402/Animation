import * as THREE from '../src/three.module.js';
import { PointerLockControls } from '../src/PointerLockControls.js'

let camera, scene, renderer, pControl


scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff)
scene.fog = new THREE.Fog(0xffffff, 0, 500)

scene.add(new THREE.GridHelper(10000, 1000))
let mesh = new THREE.Mesh(
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.MeshLambertMaterial({ color: 0x0000ff })
)
mesh.position.z = -50
scene.add(mesh)

scene.add(new THREE.HemisphereLight(0xffffff))

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.y = 10

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement);

pControl = new PointerLockControls(camera, renderer.domElement)

document.getElementById('btnPlay').onclick = () => {
    pControl.lock()
}


animate()

function animate() {

    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}