// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Camera position
camera.position.set(0, 5, 15);

// Orbit Controls for navigation
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2, 0);
controls.update();

// Load Doraemon's home model
const loader = new THREE.GLTFLoader();
loader.load('models/doraemon-home.gltf', function(gltf) {
    const doraemonHome = gltf.scene;
    scene.add(doraemonHome);

    // Animate the model or add interactivity here
    animate();
}, undefined, function(error) {
    console.error(error);
});

// Character for third-person view (e.g., Nobita)
let character;
loader.load('models/nobita.gltf', function(gltf) {
    character = gltf.scene;
    character.position.set(0, 0, 5);
    scene.add(character);

    // Optional: Add walking animation here
});

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Simple character movement (WASD keys)
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'w':
                character.position.z -= 0.1;
                break;
            case 's':
                character.position.z += 0.1;
                break;
            case 'a':
                character.position.x -= 0.1;
                break;
            case 'd':
                character.position.x += 0.1;
                break;
        }
        camera.position.set(character.position.x, character.position.y + 5, character.position.z + 10);
        controls.target.set(character.position.x, character.position.y, character.position.z);
        controls.update();
    });

    renderer.render(scene, camera);
}
