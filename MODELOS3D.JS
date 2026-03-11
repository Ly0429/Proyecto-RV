import * as THREE from "https://esm.sh/three@0.158.0";
import { FBXLoader } from "https://esm.sh/three@0.158.0/examples/jsm/loaders/FBXLoader.js";
import { OrbitControls } from "https://esm.sh/three@0.158.0/examples/jsm/controls/OrbitControls.js"

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a); // fondo

const camera = new THREE.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(100, 20, 25);
camera.lookAt(0, 20, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

//--------------------------------------------------------------------------------------

// Luces
scene.add(new THREE.AmbientLight(0xffffff, 0.15));

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(30, 50, 20);
directionalLight.castShadow = true;
directionalLight.intensity = 1;
scene.add(directionalLight);


const lightLoki = new THREE.SpotLight(0xff0033, 20, 300, Math.PI / 5, 0.3, 1);
lightLoki.position.set(0, -20, 0); 
lightLoki.target.position.set(0, 20, 0); 
lightLoki.castShadow = true;
scene.add(lightLoki);
scene.add(lightLoki.target);


const lightWanda = new THREE.SpotLight(0x00ff66, 20, 300, Math.PI / 5, 0.3, 1);
lightWanda.position.set(0, 5, 0); 
lightWanda.target.position.set(0, 35, 30);
lightWanda.castShadow = true;

scene.add(lightWanda);
scene.add(lightWanda.target);

const lightThor = new THREE.SpotLight(0x00aaff, 6, 200, Math.PI / 6, 0.5, 2);
lightThor.position.set(0, 5, -35); 
lightThor.target.position.set(0, 40, -35);
lightThor.castShadow = true;

scene.add(lightThor);
scene.add(lightThor.target);


//--------------------------------------------------------------------------------------
// Piso
const floor = new THREE.Mesh(
    new THREE.BoxGeometry(80, 100, 5),
    new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.8,
        roughness: 0.3
    })
);

floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;
floor.receiveShadow = true;
scene.add(floor)

floor.material.emissive = new THREE.Color(0x001122);
floor.material.emissiveIntensity = 0.2;


// DONA 1
const explosionTorus = new THREE.Mesh(
    new THREE.TorusGeometry(30, 8, 64, 300),
    new THREE.MeshPhysicalMaterial({
        color: 0xff6600,
        emissive: 0x00ffff,
        emissiveIntensity: 3,
        metalness: 0,
        roughness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0
    })
);

explosionTorus.position.set(-40, 40, 0); // detrás de los modelos
explosionTorus.rotation.y = Math.PI / 3;

scene.add(explosionTorus);
// Guardar vértices originales
const torusPosition = explosionTorus.geometry.attributes.position;
const originalPositions = torusPosition.array.slice();


//Dona 2
const explosionTorus2 = new THREE.Mesh(
    new THREE.TorusGeometry(30, 8, 64, 300),
    new THREE.MeshStandardMaterial({
        color: 0x00ff66,
        emissive: 0x00aaff,
        emissiveIntensity: 7,
        wireframe: true
    })
);


explosionTorus2.position.set(-40, 40, 0);
explosionTorus2.rotation.y = Math.PI / 2;

scene.add(explosionTorus2);

const torus2Position = explosionTorus2.geometry.attributes.position;
const originalPositions2 = torus2Position.array.slice();

//--------------------------------------------------------------------------------------

// Cargar modelo 1
const loader1 = new FBXLoader();
const textureLoader1 = new THREE.TextureLoader();
const texture1 = textureLoader1.load("./texturas/metalverde.jpg");

loader1.load("./loki.fbx", function (object1) {

    object1.scale.set(0.7, 0.7, 0.7);
    object1.position.set(0, 0, 0);
    object1.rotation.y = Math.PI / 2;

    object1.traverse(function (child) {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                map: texture1,
                metalness: 1,
                roughness: 0.5
            });

            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(object1);
});


//cargar modelo 2
const loader2 = new FBXLoader();
const textureLoader2 = new THREE.TextureLoader();
const texture2 = textureLoader2.load("./texturas/metal.jpg");

loader2.load("./wanda.fbx", function (object2) {

    object2.scale.set(0.090, 0.090, 0.090);
    object2.position.set(0, 28, 30);
    object2.rotation.y = -Math.PI / 2;

    object2.traverse(function (child) {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                map: texture2,
                metalness: 1,
                roughness: 0.5
            });

            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(object2);
});


//cargar modelo 3

const loader3 = new FBXLoader();
const textureLoader3 = new THREE.TextureLoader();
const texture3 = textureLoader3.load("./texturas/martillo.jpg");

loader3.load("./thor.fbx", function (object3) {

    object3.scale.set(4, 4, 4);
    object3.position.set(0, 25, -35);
    object3.rotation.y = THREE.MathUtils.degToRad(30);
    object3.rotation.z = THREE.MathUtils.degToRad(-40);


    object3.traverse(function (child) {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                map: texture3,
                metalness: 0.8,
                roughness: 0.3
            });

            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(object3);
});


//--------------------------------------------------------------------------------------

function animate() {

    requestAnimationFrame(animate);

    //Dona 1
    const position = explosionTorus.geometry.attributes.position;

    for (let i = 0; i < position.count; i++) {

        const ix = i * 3;

        const ox = originalPositions[ix];
        const oy = originalPositions[ix + 1];
        const oz = originalPositions[ix + 2];

        // Deformación tipo energía
        const wave = Math.sin(Date.now() * 0.003 + ox * 0.2) * 2;

        position.setXYZ(
            i,
            ox + wave,
            oy + wave,
            oz + wave
        );
    }

    position.needsUpdate = true;
    explosionTorus.rotation.z += 0.01;

    const pos2 = explosionTorus2.geometry.attributes.position;

    for (let i = 0; i < pos2.count; i++) {

        const ix = i * 3;

        const ox = originalPositions2[ix];
        const oy = originalPositions2[ix + 1];
        const oz = originalPositions2[ix + 2];

        const wave = Math.cos(Date.now() * 0.004 + ox * 0.2) * 2;

        pos2.setXYZ(i, ox + wave, oy + wave, oz + wave);
    }

    pos2.needsUpdate = true;
    explosionTorus2.rotation.z -= 0.01;


    controls.target.set(0, 20, 0);
    controls.update();
    renderer.render(scene, camera);
}

animate();