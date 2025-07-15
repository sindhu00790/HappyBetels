// 3D Betel Leaf Model Viewer
function initBetelLeaf3D() {
    const container = document.getElementById('betel-leaf-3d');
    if (!container) return;

    
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Load 3D model
    const loader = new THREE.GLTFLoader();
    let model;
    
    loader.load(
        'assets/models/betel-leaf.glb',
        function(gltf) {
            model = gltf.scene;
            model.scale.set(1.5, 1.5, 1.5);
            model.position.y = -0.5;
            scene.add(model);
            
            // Animation mixer
            const mixer = new THREE.AnimationMixer(model);
            const clips = gltf.animations;
            
            if (clips && clips.length > 0) {
                const clip = clips[0];
                const action = mixer.clipAction(clip);
                action.play();
            }
            
            // Animation loop
            const clock = new THREE.Clock();
            
            function animate() {
                requestAnimationFrame(animate);
                
                if (mixer) {
                    mixer.update(clock.getDelta());
                }
                
                if (model) {
                    model.rotation.y += 0.005;
                }
                
                renderer.render(scene, camera);
            }
            
            animate();
        },
        undefined,
        function(error) {
            console.error('Error loading 3D model:', error);
        }
    );
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Floating Leaf Particles Background
function initLeafParticles() {
    const container = document.getElementById('leaf-particles');
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;
    
    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
        if (i % 3 === 0) {
            scaleArray[i / 3] = Math.random() * 0.5 + 0.2;
        }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Load leaf texture
    const textureLoader = new THREE.TextureLoader();
    const leafTexture = textureLoader.load('https://www.transparentpng.com/thumb/leaf/real-green-leaf-transparent-background-21.png');
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        map: leafTexture,
        transparent: true,
        alphaTest: 0.001,
        blending: THREE.AdditiveBlending,
        color: 0x2E8B57
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.y += 0.001;
        
        // Update particle positions for floating effect
        const positions = particlesGeometry.attributes.position.array;
        for (let i = 0; i < particlesCount; i++) {
            positions[i * 3 + 1] += 0.005;
            if (positions[i * 3 + 1] > 5) {
                positions[i * 3 + 1] = -5;
            }
        }
        particlesGeometry.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize 3D elements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initBetelLeaf3D();
    initLeafParticles();
});