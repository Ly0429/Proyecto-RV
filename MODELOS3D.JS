import * as THREE from "https://esm.sh/three@0.158.0";
import { OrbitControls } from "https://esm.sh/three@0.158.0/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
5000
);

camera.position.set(500,300,300);
camera.lookAt(0,20,0);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.maxDistance = 1500;
controls.minDistance = 50;
controls.maxPolarAngle = Math.PI/2;

scene.add(new THREE.AmbientLight(0xffffff,0.4));

const luz = new THREE.DirectionalLight(0xffffff,1);
luz.position.set(200,400,200);
scene.add(luz);



// PISO
const piso = new THREE.Mesh(
new THREE.BoxGeometry(870,5,1000),
new THREE.MeshStandardMaterial({color:0x808080})
);

piso.position.y = -2.5;
scene.add(piso);



// PARED ATRAS
const pared = new THREE.Mesh(
new THREE.BoxGeometry(878,400,5),
new THREE.MeshStandardMaterial({color:0x808080})
);

pared.position.set(0,200,-500);
scene.add(pared);



// MESA
const mesa = new THREE.Group();

const tablero = new THREE.Mesh(
new THREE.BoxGeometry(120,8,80),
new THREE.MeshStandardMaterial({color:0x8B4513})
);

tablero.position.set(0,60,0);
mesa.add(tablero);

const pataGeo = new THREE.BoxGeometry(8,60,8);
const pataMat = new THREE.MeshStandardMaterial({color:0x5a2d0c});

const pata1 = new THREE.Mesh(pataGeo,pataMat);
pata1.position.set(-50,30,-30);
mesa.add(pata1);

const pata2 = new THREE.Mesh(pataGeo,pataMat);
pata2.position.set(50,30,-30);
mesa.add(pata2);

const pata3 = new THREE.Mesh(pataGeo,pataMat);
pata3.position.set(-50,30,30);
mesa.add(pata3);

const pata4 = new THREE.Mesh(pataGeo,pataMat);
pata4.position.set(50,30,30);
mesa.add(pata4);

mesa.position.set(-350,0,0);
mesa.rotation.y = Math.PI/2;
mesa.scale.set(4,1.5,1.8);

scene.add(mesa);



// MONITOR 1
const monitor1 = new THREE.Group();

const pantalla1 = new THREE.Mesh(
new THREE.BoxGeometry(180,100,5),
new THREE.MeshStandardMaterial({color:0x000000})
);
pantalla1.position.y = 170;
monitor1.add(pantalla1);

const base1 = new THREE.Mesh(
new THREE.BoxGeometry(60,5,40),
new THREE.MeshStandardMaterial({color:0x222222})
);
base1.position.y = 100;
monitor1.add(base1);

const soporte1 = new THREE.Mesh(
new THREE.BoxGeometry(10,60,10),
new THREE.MeshStandardMaterial({color:0x222222})
);
soporte1.position.y = 130;
monitor1.add(soporte1);

monitor1.position.set(-370,0,0);
monitor1.rotation.y = Math.PI/2;
scene.add(monitor1);



// MONITOR 2
const monitor2 = monitor1.clone();
monitor2.position.set(-370,0,200);
scene.add(monitor2);



// CPU
const cpu = new THREE.Group();

// torre
const torre = new THREE.Mesh(
new THREE.BoxGeometry(100,150,80),
new THREE.MeshStandardMaterial({
color:0x111111,
metalness:0.6,
roughness:0.3
})
);

torre.position.y = 80;
cpu.add(torre);


// vidrio
const vidrio = new THREE.Mesh(
new THREE.BoxGeometry(2,130,70),
new THREE.MeshStandardMaterial({
color:0x00ffff,
transparent:true,
opacity:0.25,
emissive:0x00ffff,
emissiveIntensity:0.2
})
);

vidrio.position.set(50,80,0);
cpu.add(vidrio);


// ventiladores
const fanGeometry = new THREE.CylinderGeometry(12,12,2,32);
const fanMaterial = new THREE.MeshStandardMaterial({
color:0x00ffff,
emissive:0x00ffff,
emissiveIntensity:0.8
});

const fan1 = new THREE.Mesh(fanGeometry,fanMaterial);
fan1.rotation.z = Math.PI/2;
fan1.position.set(50,120,10);
cpu.add(fan1);

const fan2 = fan1.clone();
fan2.position.set(50,75,10);
cpu.add(fan2);

const fan3 = fan1.clone();
fan3.position.set(50,30,10);
cpu.add(fan3);


// luz interna
const luzCPU = new THREE.PointLight(0x00ffff,1.5,200);
luzCPU.position.set(0,80,0);
cpu.add(luzCPU);


// boton
const boton = new THREE.Mesh(
new THREE.CylinderGeometry(3,3,2,20),
new THREE.MeshStandardMaterial({
color:0x00ffff,
emissive:0x00ffff
})
);

boton.rotation.x = Math.PI/2;
boton.position.set(0,160,30);
cpu.add(boton);


// USB
const usb1 = new THREE.Mesh(
new THREE.BoxGeometry(10,4,2),
new THREE.MeshStandardMaterial({color:0x000000})
);
usb1.position.set(40,130,35);
cpu.add(usb1);

const usb2 = usb1.clone();
usb2.position.set(40,120,35);
cpu.add(usb2);


cpu.position.set(-350,90,-150);
scene.add(cpu);



// SOFA
const sofa = new THREE.Mesh(
new THREE.BoxGeometry(200,80,90),
new THREE.MeshStandardMaterial({color:0x444444})
);

sofa.position.set(90,40,-400);
scene.add(sofa);



// ANIMACION
function animate(){

requestAnimationFrame(animate);

fan1.rotation.x += 0.2;
fan2.rotation.x += 0.2;
fan3.rotation.x += 0.2;

controls.update();
renderer.render(scene,camera);

}

animate();