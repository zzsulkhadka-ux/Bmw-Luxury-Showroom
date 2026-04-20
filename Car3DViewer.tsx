import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, MeshReflectorMaterial, ContactShadows, useGLTF, Stage } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, Info, ZoomIn, ZoomOut } from 'lucide-react';

// Using a high-quality public GLTF model as a placeholder for the M-Series
// Note: In a production app, the user would provide their own optimized .glb/.gltf assets
const CAR_MODEL_URL = 'https://vazxmixjsiawhamurptp.supabase.co/storage/v1/object/public/models/lamborghini/model.gltf';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} position={[0, -0.5, 0]} />;
}

export default function Car3DViewer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-bmw-black/95 backdrop-blur-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-bmw-black/50 z-20">
          <div>
            <h2 className="text-2xl font-display font-bold uppercase tracking-tight">M-Series <span className="text-bmw-purple">3D</span> Studio</h2>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em]">Interactive Digital Twin / Real-time Rendering</p>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 3D Scene */}
        <div className="flex-1 relative cursor-grab active:cursor-grabbing">
          <Suspense fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-bmw-purple border-t-transparent rounded-full animate-spin" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-white/40">Initializing Engine...</span>
              </div>
            </div>
          }>
            <Canvas shadows dpr={[1, 2]}>
              <PerspectiveCamera makeDefault position={[5, 2, 8]} fov={35} />
              <color attach="background" args={['#050505']} />
              
              <Stage environment="city" intensity={0.6}>
                <Model url={CAR_MODEL_URL} />
              </Stage>

              {/* Lighting */}
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              
              {/* Floor */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <MeshReflectorMaterial
                  blur={[300, 100]}
                  resolution={2048}
                  mixBlur={1}
                  mixStrength={40}
                  roughness={1}
                  depthScale={1.2}
                  minDepthThreshold={0.4}
                  maxDepthThreshold={1.4}
                  color="#101010"
                  metalness={0.5}
                  mirror={1}
                />
              </mesh>

              <ContactShadows position={[0, -0.49, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
              
              <Environment preset="night" />
              <OrbitControls 
                enablePan={false} 
                minDistance={5} 
                maxDistance={12} 
                maxPolarAngle={Math.PI / 2.1}
                makeDefault
              />
            </Canvas>
          </Suspense>

          {/* Overlay UI */}
          <div className="absolute left-8 bottom-8 flex flex-col gap-4 z-20">
            <div className="p-6 backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl max-w-xs">
              <span className="text-[10px] uppercase tracking-widest text-bmw-purple block mb-2 font-bold">Visual Integrity</span>
              <p className="text-sm text-white/60 leading-relaxed italic">
                Experience every curve and carbon fiber weave in photorealistic detail.
              </p>
            </div>
            
            <div className="flex gap-2">
              {[RotateCcw, ZoomIn, ZoomOut, Info].map((Icon, i) => (
                <button key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-bmw-purple/20 transition-all">
                  <Icon className="w-5 h-5 text-white/70" />
                </button>
              ))}
            </div>
          </div>

          <div className="absolute right-8 bottom-8 z-20 flex flex-col gap-3 items-end">
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/40">Configuration</span>
            {['Frozen Deep Grey', 'Marina Bay Blue', 'Isle of Man Green'].map((color, i) => (
              <button 
                key={color}
                className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:border-bmw-purple transition-all group"
              >
                <div className={`w-3 h-3 rounded-full ${i === 0 ? 'bg-gray-700' : i === 1 ? 'bg-blue-800' : 'bg-green-900'}`} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60 group-hover:text-white">{color}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
