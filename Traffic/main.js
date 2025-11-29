import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.20/+esm';
import { TrafficSim } from './traffic-sim.js'

const gui = new GUI();
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// document.body.appendChild(renderer.domElement);
// const scene = new THREE.Scene();
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
// const WORLD_SIZE = new THREE.Vector2(1.0, 1.0);   // normalized coords
// // ---------------- Resize -----------------
// function onResize() {
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }
// window.addEventListener('resize', onResize);
// onResize();

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = canvas.height = 1000;
const ctx = canvas.getContext('2d');

const trafficSim = new TrafficSim(30);

function drawRotatedRect(x, y, width, height, angleRad) {
    ctx.save();                          // save current transform

    ctx.translate(x, y);                 // move to rectangle center
    ctx.rotate(angleRad);                // rotate canvas

    ctx.fillRect(-width / 2, -height / 2, width, height);
    // draw centered rectangle

    ctx.restore();                       // restore transform
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

// const tex = new THREE.CanvasTexture(canvas);
// const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
// scene.add(sprite);

// const plane = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.2), material);
// //plane.scale = new THREE.Vector3(.2, .2, .2);
// scene.add(plane);

// ---------------- GUI -----------------
const guiParams = {
    x: 0
}
function createGUI() {

    gui.add(trafficSim, 'acceleration', 0.1, 10.0, 0.1).name('Acceleration');
    gui.add(trafficSim, 'stopping', 0.1, 10.0, 0.1).name('Stopping');
    // gui.add(trafficSim, 'nCars', 2, 30, 1).onChange((val) => trafficSim.initCars(val));
}
createGUI();


let time = 0.0;

function drawScene() {
    ctx.resetTransform();
    ctx.fillStyle = "rgb(100,100,140)"
    ctx.fillRect(0, 0, 1000, 1000)

    const trackRadius = 300;
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.lineWidth = 80;
    ctx.translate(500, 400)
    ctx.arc(0, 0, trackRadius, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 0; i < trafficSim.nCars; i++) {
        const car = trafficSim.cars[i];
        const angle = car.pos * Math.PI * 2;
        ctx.fillStyle = `hsl(${car.distToNextCar * 700}, 100%, 50%)`;
        drawRotatedRect(Math.cos(angle) * trackRadius, -Math.sin(angle) * trackRadius, 7, 14, -angle);
    }
}

// ---------------- Animation -----------------
function animate() {
    const dt = 0.01;
    time += dt;
    //trafficSim.update(dt)
    drawScene();
    // renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
