// app.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1).normalize();
scene.add(light);

camera.position.z = 5;

// app.js
const loader = new THREE.GLTFLoader();

loader.load(
    'assets/doraemon.glb', // Path to your GLTF model
    (gltf) => {
        scene.add(gltf.scene);
    },
    undefined,
    (error) => {
        console.error(error);
    }
);

// app.js
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
// app.js
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
// app.js
loader.load('assets/doraemon.glb', (gltf) => {
    const doraemon = gltf.scene;
    scene.add(doraemon);

    function updateCamera() {
        camera.position.x = doraemon.position.x + 5;
        camera.position.y = doraemon.position.y + 5;
        camera.lookAt(doraemon.position);
    }

    function animate() {
        requestAnimationFrame(animate);
        updateCamera();
        renderer.render(scene, camera);
    }

    animate();
});

