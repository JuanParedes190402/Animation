import * as THREE from '../src/three.module.js';
import { PointerLockControls } from '../src/PointerLockControls.js'

let camera, scene, renderer, pControl
//variables para establecer la direccion del movimiento
let xdir = 0, zdir = 0
let tiempoI, tiempoF, vel, delta

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



//Mover con el teclado
document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 37:
            xdir = -1 //izquierda
            break;
        case 38:
            zdir = 1 //arriba
            break;
        case 39:
            xdir = 1 //derecha
            break;
        case 40:
            zdir = -1 //abajo
            break;
        case 65:
            xdir = -1 //izquierda
            break;
        case 87:
            zdir = 1 //arriba
            break;
        case 68:
            xdir = 1 //derecha
            break;
        case 83:
            zdir = -1 //abajo
            break;
    }
})
//cuando se deje de presionar la tecla se detiene la animación
document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 37:
            xdir = 0
            break;
        case 38:
            zdir = 0
            break;
        case 39:
            xdir = 0
            break;
        case 40:
            zdir = 0
            break;
        case 65:
            xdir = 0
            break;
        case 87:
            zdir = 0
            break;
        case 68:
            xdir = 0
            break;
        case 83:
            zdir = 0
            break;
    }
})

tiempoI = Date.now() //Tiempo inicial
vel = 50 //Magnitud de la velocidad, cantidad de pixels por segundo

animate()

function animate() {

    requestAnimationFrame(animate);
    //Se activa con el control
    if(pControl.isLocked === true){
        tiempoF = Date.now();

        delta = (tiempoF - tiempoI)/1000;

        let xDis = xdir * vel * delta;
        let zDis = zdir * vel * delta;

        pControl.moveRight(xDis);
        pControl.moveForward(zDis);

        //Se reinicia el tiempo
        tiempoI = tiempoF;
    }
    renderer.render(scene, camera);
}