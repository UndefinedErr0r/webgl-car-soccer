var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);

var createScene = function () {

	// This creates a basic Babylon Scene object (non-mesh)
	var scene = new BABYLON.Scene(engine);

	// This creates and positions a free camera (non-mesh)
	var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 15, -20), scene);

	// This targets the camera to scene origin
	camera.setTarget(BABYLON.Vector3.Zero());

	// This attaches the camera to the canvas
	//camera.attachControl(canvas, true);

	// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
	var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

	// Default intensity is 1. Let's dim the light a small amount
	light.intensity = 0.7;

	// Our built-in 'sphere' shape. Params: name, subdivs, size, scene
	
	
	
	var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
	var physicsPlugin = new BABYLON.CannonJSPlugin();
	scene.enablePhysics(gravityVector, physicsPlugin);

	
	
	var box = BABYLON.MeshBuilder.CreateBox("box", {height: 3, width: 3, depth: 3}, scene);
	box.position.y = 1;
	
	
	var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
	// Move the sphere upward 1/2 its height
	var footballMaterial = new BABYLON.StandardMaterial("footballMaterial", scene);
	footballMaterial.diffuseTexture = new BABYLON.Texture("assets/fb.jpg",scene);
	sphere.material = footballMaterial;
	sphere.position.y = 20;

	


	
	
	var grassMaterial = new BABYLON.StandardMaterial(name + "bawl", scene);
    var grassTexture = new BABYLON.GrassProceduralTexture(name + "textbawl", 256, scene);
    grassMaterial.ambientTexture = grassTexture;

    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width:20, height: 20}, scene);

    ground.material = grassMaterial;
	

	skybox(scene);

		
	sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.3 }, scene);
	box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 1, restitution: 0.1 }, scene);
	ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);


	
	var assetsManager = new BABYLON.AssetsManager(scene);
	var meshTask = assetsManager.addMeshTask("skull task", "", "model/", "1967-shelby-ford-mustang.babylon");
	
	assetsManager.load();
	
	
	
	
	scene.registerBeforeRender(function() {
		
		
		
		
	});
	
	
	var onKeyDown = function(evt) {
        // To the left
        if (evt.keyCode == 37) {
			console.log("Sdsds");
			//box.applyImpulse(new BABYLON.Vector3(1, 0, 1), box.getAbsolutePosition());
			
			var posX = Math.sin(box.rotationQuaternion.y);		
			var posZ = Math.cos(box.rotationQuaternion.y);	
			box.position.x += posX;		
			box.position.z += posZ;
			
			
        } else if (evt.keyCode == 39) {
			//box.rotation.y += 0.1;
			box.rotate(BABYLON.Axis.Y, 1.102, BABYLON.Space.LOCAL);
			
			//box.translate(BABYLON.Axis.Y, 1.0, BABYLON.Space.WORLD);
			
			
			console.log("rrr " + box.rotationQuaternion.toEulerAngles() );
			
			//box.applyImpulse(new BABYLON.Vector3(0, 1, 0), box.getAbsolutePosition());
        }
    };

    // On key up, reset the movement
    var onKeyUp = function(evt) {
    };

    // Register events with the right Babylon function
    BABYLON.Tools.RegisterTopRootEvents([{
        name: "keydown",
        handler: onKeyDown
    }, {
        name: "keyup",
        handler: onKeyUp
    }]);
	
	
	return scene;

};

var scene = createScene()

engine.runRenderLoop(function () {
	scene.render();
});

// Resize
window.addEventListener("resize", function () {
	engine.resize();
});



