import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { SpotLight } from "@babylonjs/core/Lights/spotLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import { NormalMaterial } from "@babylonjs/materials/normal";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
import "@babylonjs/core/Meshes/meshBuilder";


// Get the canvas element from the DOM.
const canvas = document.getElementById("renderCanvas");

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// Create our first scene.
var scene = new Scene(engine);

// This creates and positions a free camera (non-mesh)
var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

// This targets the camera to scene origin
camera.setTarget(Vector3.Zero());

// This attaches the camera to the canvas
camera.attachControl(canvas, true);

// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
//var light = new DirectionalLight("light1", new Vector3(1, 0, 0), scene);
var light = new SpotLight("spotLight", new Vector3(0, 30, -10), new Vector3(0, -1, 0), Math.PI / 3, 2, scene);
// Default intensity is 1. Let's dim the light a small amount
light.intensity = 0.7;
//var shadowGenerator = new ShadowGenerator(512, light,1);
// Create a grid material
var material = new NormalMaterial("normal", scene);

// Our built-in 'sphere' shape. Params: name, subdivs, size, scene
var sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

// Move the sphere upward 1/2 its height
sphere.position.y = 2;

// Affect a material
sphere.material = material;
//shadowGenerator.getShadowMap().renderList.push(sphere);
// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

// Affect a material
ground.material = material;
ground.receiveShadows = true;

//light.includedOnlyMeshes.push(sphere);
//light.includedOnlyMeshes.push(ground);
// Render every frame
engine.runRenderLoop(() => {
    scene.render();
});