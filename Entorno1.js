import * as THREE from "https://esm.sh/three@0.158.0";
import { FBXLoader } from "https://esm.sh/three@0.158.0/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "https://esm.sh/three@0.158.0/examples/jsm/controls/OrbitControls.js"

const scene = new THREE.Scene();
//scene.background = new THREE.Color(0x0f172a); // fondo

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
);



camera.position.set(500, 300, 300);
camera.lookAt(0, 20, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.screenSpacePanning = true;
controls.maxDistance = 1500;
controls.minDistance = 50;
controls.maxPolarAngle = Math.PI / 2;

//--------------------------------------------------------------------------------------

// LUCES
scene.add(new THREE.AmbientLight(0xffffff, 0.15));

//-----------------------------------------------------------------------------------------------
//Luces 

const coloresLuces = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];

for (let i = 0; i < 8; i++) {
    const luzNavidad = new THREE.PointLight(coloresLuces[i % coloresLuces.length], 50000, 300);
    // Las posicionamos repartidas a lo largo de la pared (pared1 está en z: -500)
    luzNavidad.position.set(-350 + (i * 100), 300, -487);
    scene.add(luzNavidad);

    // Opcional: Una esfera pequeña para ver de dónde viene la luz
    const focoGeo = new THREE.SphereGeometry(5, 16, 16);
    const focoMat = new THREE.MeshBasicMaterial({ color: coloresLuces[i % coloresLuces.length] });
    const foco = new THREE.Mesh(focoGeo, focoMat);
    foco.position.copy(luzNavidad.position);
    scene.add(foco);
}

// FILA DE ABAJO
for (let i = 0; i < 8; i++) {
    const luzNavidad = new THREE.PointLight(coloresLuces[i % coloresLuces.length], 50000, 300);
    luzNavidad.position.set(-350 + (i * 100), 180, -490);
    scene.add(luzNavidad);

    const focoGeo = new THREE.SphereGeometry(5, 16, 16);
    const focoMat = new THREE.MeshBasicMaterial({ color: coloresLuces[i % coloresLuces.length] });
    const foco = new THREE.Mesh(focoGeo, focoMat);
    foco.position.copy(luzNavidad.position);
    scene.add(foco);
}

scene.fog = new THREE.FogExp2(0x000000, 0.0008);

//--------------------------------------------------------------------------------------
//Texturas
// Cargar textura
const loader = new THREE.TextureLoader();
const netflixTexture = loader.load('netflix.jpg');

const StrangerTexture = loader.load('Stranger.jpg');
const tapizTexture = loader.load('tapiz.jpg');
const texture1Texture = loader.load('texture1.jpg');
const texture2Texture = loader.load('texture2.jpg');
//--------------------------------------------------------------------------------------
//GEOMETRIAS


// Piso
const Piso = new THREE.Mesh(
    new THREE.BoxGeometry(870, 5, 1000),
    new THREE.MeshStandardMaterial({
        color: 0x808080,
        metalness: 0.2,
        roughness: 0.3
    })
);

Piso.position.y = -2.5;
Piso.receiveShadow = true;
scene.add(Piso);
//--------------------------------------------------------------------------------------
// pared1
const pared1 = new THREE.Mesh(
    new THREE.BoxGeometry(878, 400, 5),
    new THREE.MeshStandardMaterial({
        color: 0x808080,
        metalness: 0.6,
        roughness: 0.3
    })
);

pared1.position.set(0, 200, -500); // atrás de la escena
pared1.receiveShadow = true;

scene.add(pared1);


//--------------------------------------------------------------------------------------
// stranger

const stranger = new THREE.Mesh(
    new THREE.PlaneGeometry(878, 292, 5),
    new THREE.MeshStandardMaterial({
        map: StrangerTexture,
        roughness: 0.3
    })
);

stranger.position.set(0, 256, -496); // atrás de la escena
stranger.receiveShadow = true;

scene.add(stranger);

StrangerTexture.wrapS = THREE.RepeatWrapping;
StrangerTexture.wrapT = THREE.RepeatWrapping;
StrangerTexture.repeat.set(1, 1);

//--------------------------------------------------------------------------------------
// tapiz

const tapiz = new THREE.Mesh(
    new THREE.PlaneGeometry(878, 110, 5),
    new THREE.MeshStandardMaterial({
        map: tapizTexture,
        color: 0x472828,
        roughness: 0.9
    })
);

tapiz.position.set(0, 50, -496); // atrás de la escena
tapiz.receiveShadow = true;

scene.add(tapiz);

tapizTexture.wrapS = THREE.RepeatWrapping;
tapizTexture.wrapT = THREE.RepeatWrapping;
tapizTexture.repeat.set(5, 1);

//--------------------------------------------------------------------------------------
// pared2
const pared2 = new THREE.Mesh(
    new THREE.BoxGeometry(878, 400, 5),
    new THREE.MeshStandardMaterial({
        color: 0x808080,
        metalness: 0.6,
        roughness: 0.3
    })
);

pared2.position.set(0, 200, 500)// atrás de la escena
pared2.receiveShadow = true;

scene.add(pared2);

pared2.material.emissive = new THREE.Color(0x808080);
pared2.material.emissiveIntensity = 0.2;

//--------------------------------------------------------------------------------------

// Pared3
const Pared3 = new THREE.Mesh(
    new THREE.BoxGeometry(1000, 400, 5),
    new THREE.MeshStandardMaterial({
        color: 0x808080,
        metalness: 0.2,
        roughness: 0.3
    })
);

Pared3.position.set(-438, 200, 0);
Pared3.rotation.y = Math.PI / 2;
Pared3.receiveShadow = true;
scene.add(Pared3)

Pared3.material.emissive = new THREE.Color(0x808080);
Pared3.material.emissiveIntensity = 0.2;
//----------------------------------------------------------------------------------------

// TV

// marco
const tvMarco = new THREE.Mesh(
    new THREE.BoxGeometry(600, 220, 10),
    new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.5,
        roughness: 0.4
    })
);

tvMarco.position.set(0, 220, 470);
scene.add(tvMarco);


// pantalla
const tvPantalla = new THREE.Mesh(
    new THREE.BoxGeometry(560, 200, 3),
    new THREE.MeshStandardMaterial({
        map: netflixTexture,
        emissive: 0xffffff,
        emissive: 0x111111
    })
);

tvPantalla.position.set(0, 220, 462);
scene.add(tvPantalla);

// soporte del TV
const soporteTV = new THREE.Mesh(
    new THREE.BoxGeometry(110, 60, 30),
    new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.8,
        roughness: 0.3
    })
);

soporteTV.position.set(0, 220, 480);
scene.add(soporteTV);

//----------------------------------------------------------------------------------------
//cuadros
const p1Texture = loader.load('p1.jpeg');
const p2Texture = loader.load('p2.jpeg');
const p3Texture = loader.load('p3.jpeg');
const p4Texture = loader.load('p4.jpeg');

const cuadro1 = new THREE.Mesh(
    new THREE.BoxGeometry(90, 100, 20),
    new THREE.MeshStandardMaterial({
        color: 0x2222,
        metalness: 0.8,
        roughness: 0.3
    })
);
cuadro1.position.set(-360, 150, 490);
scene.add(cuadro1);

const pantallac = new THREE.Mesh(
    new THREE.BoxGeometry(80, 90, 20),
    new THREE.MeshStandardMaterial({
        map: p1Texture,
        emissive: 0xffffff,
        emissive: 0x111111
    })
);

pantallac.position.set(-360, 150, 480);
scene.add(pantallac);




const cuadro2 = new THREE.Mesh(
    new THREE.BoxGeometry(90, 100, 20),
    new THREE.MeshStandardMaterial({
        color: 0x2222,
        metalness: 0.8,
        roughness: 0.3
    })
);

cuadro2.position.set(-360, 280, 490);
scene.add(cuadro2);

const pantallac2 = new THREE.Mesh(
    new THREE.BoxGeometry(80, 90, 20),
    new THREE.MeshStandardMaterial({
        map: p3Texture,
        emissive: 0xffffff,
        emissive: 0x111111
    })
);

pantallac2.position.set(-360, 280, 480);
scene.add(pantallac2);

const cuadro3 = new THREE.Mesh(
    new THREE.BoxGeometry(90, 100, 20),
    new THREE.MeshStandardMaterial({
        color: 0x2222,
        metalness: 0.8,
        roughness: 0.3
    })
);

cuadro3.position.set(360, 280, 490);
scene.add(cuadro3);

const pantallac3 = new THREE.Mesh(
    new THREE.BoxGeometry(80, 90, 20),
    new THREE.MeshStandardMaterial({
        map: p4Texture,
        emissive: 0xffffff,
        emissive: 0x111111
    })
);

pantallac3.position.set(360, 280, 480);
scene.add(pantallac3);

const cuadro4 = new THREE.Mesh(
    new THREE.BoxGeometry(90, 100, 20),
    new THREE.MeshStandardMaterial({
        color: 0x2222,
        metalness: 0.8,
        roughness: 0.3
    })
);

cuadro4.position.set(360, 150, 490);
scene.add(cuadro4);

const pantallac4 = new THREE.Mesh(
    new THREE.BoxGeometry(80, 90, 20),
    new THREE.MeshStandardMaterial({
        map: p2Texture,
        emissive: 0xffffff,
        emissive: 0x111111
    })
);

pantallac4.position.set(360, 150, 480);
scene.add(pantallac4);
//----------------------------------------------------------------------------------------
// Mesa

// crear grupo de la mesa
const mesa = new THREE.Group();
scene.add(mesa);

// tablero
const tablero = new THREE.Mesh(
    new THREE.BoxGeometry(120, 8, 80),
    new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.6
    })
);

tablero.position.set(0, 90, 0);
mesa.add(tablero);


// geometría patas
const pataGeometry = new THREE.BoxGeometry(8, 60, 8);
const pataMaterial = new THREE.MeshStandardMaterial({
    color: 0x5a2d0c
});

// pata 1
const pata1 = new THREE.Mesh(pataGeometry, pataMaterial);
pata1.position.set(-50, 42, -30);
pata1.scale.set(1, 1.5, 1);
mesa.add(pata1);

// pata 2
const pata2 = new THREE.Mesh(pataGeometry, pataMaterial);
pata2.position.set(50, 42, -30);
pata2.scale.set(1, 1.5, 1);
mesa.add(pata2);

// pata 3
const pata3 = new THREE.Mesh(pataGeometry, pataMaterial);
pata3.position.set(-50, 42, 30);
pata3.scale.set(1, 1.5, 1);
mesa.add(pata3);

// pata 4
const pata4 = new THREE.Mesh(pataGeometry, pataMaterial);
pata4.position.set(50, 42, 30);
pata4.scale.set(1, 1.5, 1);
mesa.add(pata4);


// mover y rotar toda la mesa
mesa.position.set(-350, 0, 0);
mesa.rotation.y = Math.PI / 2;
mesa.scale.set(4, 1.5, 1.8);


const teclado = new THREE.Mesh(
    new THREE.BoxGeometry(870, 5, 1000),
    new THREE.MeshStandardMaterial({
        color: 0x5a2d0c,
        metalness: 0.2,
        roughness: 0.3
    })
);

teclado.position.set(-350, 120, 0);
teclado.scale.set(0.2, 2, 0.3);
teclado.receiveShadow = true;
scene.add(teclado);

//--------------------------------------------------------------------------------------
// MONITOR 1
const strangerthingsTexture = loader.load('strangerthings.jpg');

// pantalla
const monitorPantalla = new THREE.Mesh(
    new THREE.BoxGeometry(180, 100, 5),
    new THREE.MeshStandardMaterial({
        map: strangerthingsTexture,
        emissive: 0xffffff,
        emissive: 0x111111
    })
);

monitorPantalla.position.set(-365, 220, 0);
monitorPantalla.rotation.y = Math.PI / 2;
scene.add(monitorPantalla);


// marco
const monitorMarco = new THREE.Mesh(
    new THREE.BoxGeometry(190, 110, 6),
    new THREE.MeshStandardMaterial({
        color: 0x111111
    })
);

monitorMarco.position.set(-370, 220, 2);
monitorMarco.rotation.y = Math.PI / 2;
scene.add(monitorMarco);


// soporte
const soporteMonitor = new THREE.Mesh(
    new THREE.BoxGeometry(10, 60, 10),
    new THREE.MeshStandardMaterial({
        color: 0x222222
    })
);

soporteMonitor.position.set(-370, 160, 5);
soporteMonitor.rotation.y = Math.PI / 2;
scene.add(soporteMonitor);


// base
const baseMonitor = new THREE.Mesh(
    new THREE.BoxGeometry(60, 5, 40),
    new THREE.MeshStandardMaterial({
        color: 0x222222
    })
);

baseMonitor.position.set(-370, 143, 5);
baseMonitor.rotation.y = Math.PI / 2;
scene.add(baseMonitor);
//-----------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------
// CPU GAMER
const cpu = new THREE.Group();

// torre
const torre = new THREE.Mesh(
    new THREE.BoxGeometry(100, 150, 80),
    new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.6,
        roughness: 0.3
    })
);
torre.position.y = 122;
cpu.add(torre);

// panel vidrio
const vidrio = new THREE.Mesh(
    new THREE.BoxGeometry(2, 130, 70),
    new THREE.MeshStandardMaterial({
        color: 0x222222,
        emissive: 0x00ffff,
        emissiveIntensity: 0.4
    })
);
vidrio.position.set(50, 122, 0);
cpu.add(vidrio);

// ventilador 1
const fan1 = new THREE.Mesh(
    new THREE.CylinderGeometry(12, 12, 2, 32),
    new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.6
    })
);
fan1.rotation.z = Math.PI / 2;
fan1.position.set(50, 160, 0);
cpu.add(fan1);

// ventilador 2
const fan2 = fan1.clone();
fan2.position.set(50, 120, 0);
cpu.add(fan2);

// ventilador 3
const fan3 = fan1.clone();
fan3.position.set(50, 80, 0);
cpu.add(fan3);

// posición de la CPU sobre la mesa
cpu.position.set(-350, 90, -150);


scene.add(cpu);

// ----------------------------------------------------------------------------------------------
// MONITOR 2
const biciTexture = loader.load('bici.jpg');
// pantalla
const monitorPantalla2 = new THREE.Mesh(
    new THREE.BoxGeometry(180, 100, 5),
    new THREE.MeshStandardMaterial({
        map: biciTexture,
        emissive: 0xffffff,
        emissive: 0x111111
    })
);

monitorPantalla2.position.set(-345, 220, 200);
monitorPantalla2.rotation.y = 30;
scene.add(monitorPantalla2);


// marco
const monitorMarco2 = new THREE.Mesh(
    new THREE.BoxGeometry(190, 110, 6),
    new THREE.MeshStandardMaterial({
        color: 0x111111
    })
);

monitorMarco2.position.set(-350, 220, 200);
monitorMarco2.rotation.y = 30;
scene.add(monitorMarco2);


// soporte
const soporteMonitor2 = new THREE.Mesh(
    new THREE.BoxGeometry(10, 60, 10),
    new THREE.MeshStandardMaterial({
        color: 0x222222
    })
);

soporteMonitor2.position.set(-350, 160, 200);
soporteMonitor2.rotation.y = 30;
scene.add(soporteMonitor2);


// base
const baseMonitor2 = new THREE.Mesh(
    new THREE.BoxGeometry(60, 5, 40),
    new THREE.MeshStandardMaterial({
        color: 0x222222
    })
);

baseMonitor2.position.set(-350, 143, 200);
baseMonitor2.rotation.y = 30;
scene.add(baseMonitor2);

//-------------------------------------------------------------------------------------
/* SOFA
const sofa = new THREE.Group();

// ------------------
// base del sofa
const base = new THREE.Mesh(
    new THREE.BoxGeometry(160, 20, 80),
    new THREE.MeshStandardMaterial({
        roughness: 1
    })
);

base.position.y = 20;
sofa.add(base);

// ------------------
// respaldo
const respaldo = new THREE.Mesh(
    new THREE.BoxGeometry(160, 60, 15),
    new THREE.MeshStandardMaterial({
        map: sofa1Texture,
        roughness: 1
    })
);

respaldo.position.set(0, 55, -32);
respaldo.scale.set(0.91, 1, 1.2);
sofa.add(respaldo);

// ------------------
// brazo izquierdo
const brazo1 = new THREE.Mesh(
    new THREE.BoxGeometry(15, 40, 80),
    new THREE.MeshStandardMaterial({
        color: 0x1f1f1f,
        roughness: 1
    })
);

brazo1.position.set(-80, 40, 0);
brazo1.scale.set(1, 1.7, 1.2);
sofa.add(brazo1);

// ------------------
// brazo derecho
const brazo2 = new THREE.Mesh(
    new THREE.BoxGeometry(15, 40, 80),
    new THREE.MeshStandardMaterial({
        color: 0x1f1f1f,
        roughness: 1
    })
);

brazo2.position.set(80, 40, 0);
brazo2.scale.set(1, 1.7, 1.2);
sofa.add(brazo2);

// ------------------
// cojines
const cojin1 = new THREE.Mesh(
    new THREE.BoxGeometry(48, 15, 70),
    new THREE.MeshStandardMaterial({
        color: 0x6b6b6b,
        roughness: 0.7
    })
);

cojin1.position.set(-50, 38, 0);
sofa.add(cojin1);

const cojin2 = new THREE.Mesh(
    new THREE.BoxGeometry(48, 15, 70),
    new THREE.MeshStandardMaterial({
        color: 0x6b6b6b,
        roughness: 0.7
    })
);

cojin2.position.set(0, 38, 0);
sofa.add(cojin2);

const cojin3 = new THREE.Mesh(
    new THREE.BoxGeometry(48, 15, 70),
    new THREE.MeshStandardMaterial({
        color: 0x6b6b6b,
        roughness: 0.7
    })
);

cojin3.position.set(50, 38, 0);
sofa.add(cojin3);
// ------------------
// posicion del sofa en la escena
sofa.position.set(90, -15, -380);
sofa.scale.set(2.5, 2.5, 2.5);
scene.add(sofa);

*/
//------------------------------------------------------------------------------------------------------------------------------
// Cargar modelo sofa
const loader1 = new FBXLoader();
const textureLoader1 = new THREE.TextureLoader();
const texture1 = textureLoader1.load("texture1.png");
const texture2 = textureLoader1.load("texture2.png");

loader1.load("./sofa.fbx", function (object1) {


    // misma escala del sofá anterior
    object1.scale.set(36, 36, 36);



    // misma posición del sofá anterior
    object1.position.set(-1400, 0, 2320);

    object1.rotation.set(0, -7.9, 0);
    // misma rotación

    object1.traverse(function (child) {
        if (child.isMesh) {

            if (child.name.toLowerCase().includes("cushion")) {
                // cojines
                child.material = new THREE.MeshStandardMaterial({
                    map: texture1,
                    metalness: 0,
                    roughness: 1
                });

            } else {
                // resto del sofá
                child.material = new THREE.MeshStandardMaterial({
                    map: texture2,
                    metalness: 0,
                    roughness: 1
                });
            }

            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(object1);


})
//-----------------------------------------------------------------------------------------------------------
// Demogorgon

// Cargar modelo 1
const loaderDemo = new FBXLoader();
const textureLoader3 = new THREE.TextureLoader();
const texture3 = textureLoader3.load("./texture3.png");
const texture4 = textureLoader3.load("./texture4.png");

loaderDemo.load("./Demo.fbx", function (object1) {
    object1.scale.set(3.2, 3.2, 3.2);
    object1.position.set(-300, 0, -370);
    object1.rotation.set(0, 1, 0);

    object1.traverse(function (child) {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                map: texture3,
                color: 0x888888,
                roughness: 0.9,
                metalness: 0.1,
                emissive: 0x220000,
                emissiveIntensity: 0.4
            });

            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(object1);
});



// Una luz cenital (blanca fría) para resaltar músculos
const luzTerror = new THREE.PointLight(0xeeeeff, 8000, 500);
luzTerror.position.set(-300, 300, -300);
luzTerror.castShadow = true;
scene.add(luzTerror);


//----------------------------------------------------------------------------------------
//alfombra

const alfombra = new THREE.Mesh(
    new THREE.BoxGeometry(870, 5, 1000),
    new THREE.MeshStandardMaterial({
        color: 0x404040,
        metalness: 0.2,
        roughness: 0.3
    })
);

alfombra.position.set(0, 5, 0);
alfombra.scale.set(0.9, 0.9, 0.9);
alfombra.receiveShadow = true;
scene.add(alfombra);
//---------------------------------------------------------------------------------------------------
//mesita de centro

const mesita = new THREE.Mesh(
    new THREE.BoxGeometry(870, 5, 1000),
    new THREE.MeshStandardMaterial({
        color: 0x4F1313,
        metalness: 0.2,
        roughness: 0.3
    })
);

mesita.position.set(100, 19, 0);
mesita.scale.set(0.2, 8, 0.2);
mesita.receiveShadow = true;
scene.add(mesita);


//mesita de centro

const vidriom = new THREE.Mesh(
    new THREE.BoxGeometry(870, 5, 1000),
    new THREE.MeshStandardMaterial({
        color: 0xffffff, // Vidrio más claro (blanco puro)
        transparent: true,
        opacity: 0.2,    // Más transparente para mayor elegancia
        roughness: 0.05,  // Superficie perfecta, como un espejo
        metalness: 0,
        ior: 1.5,        // Índice de refracción real para el vidrio
        transmission: 1.0      // Añade un toque de brillo
    })
);

vidriom.position.set(100, 72, 0);
vidriom.scale.set(0.2, 13, 0.2);
vidriom.receiveShadow = true;
scene.add(vidriom);


//----------------------------------------------------------------------------------------------


// Cargar modelo 1
const loaderdart = new FBXLoader();



loaderdart.load("./Dart.fbx", function (object1) {
    object1.scale.set(0.4, 0.4, 0.2);
    object1.position.set(50, 60, 0);
    object1.rotation.set(0, 0, 0);

    object1.traverse(function (child) {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                map: texture3,
                color: 0x888888,
                roughness: 0.9,
                metalness: 0.1,

            });

            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(object1);
});






//----------------------------------------------------------------------------------------


//silla

// --- CARGA DE TEXTURA (Usando tu loader existente) ---
const texturaCuero = loader.load('cuero.jpg');

texturaCuero.wrapS = THREE.RepeatWrapping;
texturaCuero.wrapT = THREE.RepeatWrapping;
texturaCuero.repeat.set(2, 2); 

// --- MATERIALES ---
const matNegro = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.2, roughness: 0.3 });
const matMetal = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.8, roughness: 0.2 });
const matNeon = new THREE.MeshStandardMaterial({ 
    color: 0x00ffff, 
    emissive: 0x00ffff, 
    emissiveIntensity: 1 
});

// Material Pro con la textura aplicada
const materialCuero = new THREE.MeshStandardMaterial({
    map: texturaCuero,
    color: 0x222222, 
    roughness: 0.8, 
    metalness: 0.1 
});

// --- GRUPO SILLA ---
const grupoSilla = new THREE.Group();
scene.add(grupoSilla);

// 1. BASE (Patas)
for (let i = 0; i < 5; i++) {
    const pata = new THREE.Mesh(new THREE.BoxGeometry(150, 5, 20), matNegro);
    const angle = (i / 5) * Math.PI * 2;
    pata.position.set(-200 + Math.cos(angle) * 40, 8, Math.sin(angle) * 40);
    pata.rotation.y = -angle;
    grupoSilla.add(pata);
}

// 2. SOPORTE Y TUBO
const baseSilla = new THREE.Mesh(new THREE.BoxGeometry(870, 5, 1000), matNegro);
baseSilla.position.set(-200, 8, 0);
baseSilla.scale.set(0.1, 2, 0.1);
grupoSilla.add(baseSilla);

const tubo = new THREE.Mesh(new THREE.BoxGeometry(870, 5, 1000), matMetal);
tubo.position.set(-200, 50, 0);
tubo.scale.set(0.04, 20, 0.04);
grupoSilla.add(tubo);

// 3. ASIENTO (Capas de cuero)
const silla2 = new THREE.Mesh(new THREE.BoxGeometry(870, 5, 1000), materialCuero);
silla2.position.set(-200, 80, 0);
silla2.scale.set(0.06, 2, 0.06);
grupoSilla.add(silla2);

const silla3 = new THREE.Mesh(new THREE.BoxGeometry(870, 5, 1000), materialCuero);
silla3.position.set(-200, 90, 0);
silla3.scale.set(0.09, 2, 0.09);
grupoSilla.add(silla3);

const silla4 = new THREE.Mesh(new THREE.BoxGeometry(870, 5, 1000), materialCuero);
silla4.position.set(-200, 100, 0);
silla4.scale.set(0.12, 2, 0.12);
grupoSilla.add(silla4);

// 4. LÍNEA GAMER Y LUZ
const lineaGamer = new THREE.Mesh(new THREE.BoxGeometry(870, 5, 1000), matNeon);
lineaGamer.position.set(-200, 105, 0);
lineaGamer.scale.set(0.11, 0.5, 0.11);
grupoSilla.add(lineaGamer);

const neonLight = new THREE.PointLight(0x00ffff, 1, 150);
neonLight.position.set(-200, 110, 0);
grupoSilla.add(neonLight);

// 5. RESPALDAR
const respaldar = new THREE.Mesh(new THREE.BoxGeometry(870, 5, 1000), materialCuero);
respaldar.position.set(-200, 150, 80);
respaldar.scale.set(0.12, 2, 0.12);
respaldar.rotation.set(Math.PI / 2, 0, 0);
grupoSilla.add(respaldar);

// 6. BRAZOS Y COJÍN
const armGeometry = new THREE.BoxGeometry(20, 40, 60);
const armL = new THREE.Mesh(armGeometry, materialCuero);
armL.position.set(-260, 115, 0);
grupoSilla.add(armL);

const armR = new THREE.Mesh(armGeometry, materialCuero);
armR.position.set(-140, 115, 0);
grupoSilla.add(armR);

const cojin = new THREE.Mesh(new THREE.BoxGeometry(80, 40, 20), materialCuero);
cojin.position.set(-200, 120, 65);
grupoSilla.add(cojin);



//-----------------------------------------------------------------------------------------
//ANIMACION

controls.target.set(0, 20, 0);
function animate() {

    requestAnimationFrame(animate);


    controls.update();
    renderer.render(scene, camera);
}

animate();