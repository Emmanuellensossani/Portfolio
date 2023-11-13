//import de la librairie three JS
import * as THREE from "https://cdn.skypack.dev//three@0.129.0/build/three.module.js";

//permetrte a la camera de bouger dns la scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";;

//permettre l'importation de fichier .gltf
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Creation de la scene Three.js
const scene = new THREE.Scene();
// Camera avec position et angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//position souris
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight /2;

//garde l'objet 3D dans une variable global pour pouvoir y acceder
let object;

//permettre à la caméra de bouger autoir de la scene
let controls;

let objToRender = 'lune';

//chargement du fichier gltf
const loader = new GLTFLoader();

//chargement du fichier
loader.load(
    `maintenance/models/${objToRender}/scene.gltf`, 
    function (gltf) {
        //si le fichier a été chargée, l'ajouter sur la scène
        object = gltf.scene;
        scene.add(object);
    },
    function (xhr) {
        //tant qu'il est en chargement, afficher la progression
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);

//Instancier un nouveau rendu
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

//ajouter le rendu au DOM
document.getElementById("container3D").appendChild(renderer.domElement);


//definir la distance entre la caméra et le modèle
camera.position.z = objToRender === "dino" ? 25 : 4;

//ajout de lumiere 
const topLight = new THREE.DirectionalLight(0xffffff, 1); //couleur et intansité
topLight.position.set(500, 500, 500); //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "dino" ? 5 : 8);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "dino") {
    controls = new OrbitControls(camera, renderer.domElement);
  }

//Rendu de la scene
function animate() {
    requestAnimationFrame(animate);
    //ici nous pouvons ajouter énormement de paramètre comme les mouvement automatiques
    //Faire bouger l'oeil
    if (object && objToRender === "lune") {
        object.rotation.y = -3 + mouseX / window.innerWidth * 3;
        object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    }
    renderer.render(scene, camera);
}

//ajout d'évenement à la fenetre, redimensionnement de la fentre et de la camera
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth*0.8, window.innerHeight*0.8);
})

document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY
}

//Commencement du rendu 3D
animate();

