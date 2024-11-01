// main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
// Voeg een Ambient Light toe
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Pas intensiteit aan naar wens
scene.add(ambientLight);

    
// GLTF Loader
const loader = new GLTFLoader();
loader.load(
  '/gltf-rotate/building.glb', // Verander dit naar het pad van je GLTF-bestand
  (gltf) => {
    const model = gltf.scene;
    model.scale.set(0.5, 0.5, 0.5); // Schaal het model met 50%
    model.position.set(0, 0, 0); // Pas aan naar wens
    scene.add(model);

        // Sliders instellen
        const yawSlider = document.getElementById('yaw');
        const pitchSlider = document.getElementById('pitch');
        const rollSlider = document.getElementById('roll');
    
        // Event listeners voor sliders
        const updateRotation = () => {
          if (model) { // Zorg ervoor dat het model is geladen
            const yaw = parseFloat(yawSlider.value);
            const pitch = parseFloat(pitchSlider.value);
            const roll = parseFloat(rollSlider.value);
    
            // Pas de rotatie van het model aan
            model.rotation.y = yaw; // Yaw
            model.rotation.x = pitch; // Pitch
            model.rotation.z = roll; // Roll
          }
        };
    
        yawSlider.addEventListener('input', updateRotation);
        pitchSlider.addEventListener('input', updateRotation);
        rollSlider.addEventListener('input', updateRotation);
    
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  (error) => {
    console.error('An error happened', error);
  }
);

// Camera position
camera.position.z = 5;

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Animate
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube for reference
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


