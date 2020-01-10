import * as BABYLON from '@babylonjs/core';
import '@babylonjs/loaders';

import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math";
import { FreeCamera } from "@babylonjs/core/Cameras/freeCamera";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { SpotLight } from "@babylonjs/core/Lights/spotLight";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import { NormalMaterial } from "@babylonjs/materials/normal";
import { AssetsManager } from "@babylonjs/materials/normal";

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

// Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
var ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);

// Affect a material
ground.material = material;
ground.receiveShadows = true;
var assetsManager = new BABYLON.AssetsManager(scene);

var meshTask = assetsManager.addMeshTask("OBJ Loading task", "", "./assets/", "geo.obj");

// You can handle success and error on a per-task basis (onSuccess, onError)
meshTask.onSuccess = function (task) {
    task.loadedMeshes[0].position = new BABYLON.Vector3(0, 0, 0);
}

// But you can also do it on the assets manager itself (onTaskSuccess, onTaskError)
//assetsManager.onTaskError = function (task) {
//    console.log("error while loading " + task.name);
//}

assetsManager.onFinish = function (tasks) {
    engine.runRenderLoop(function () {
        scene.render();
    });
};


// Can now change loading background color:
engine.loadingUIBackgroundColor = "Purple";

// Just call load to initiate the loading sequence
assetsManager.load();
