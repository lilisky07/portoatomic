import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Branding from '../molecules/Header';
import '../Styles/HeaderImage.css';
import Spline from '@splinetool/react-spline';

const Header = () => {
  const splineRef = useRef();
  const animationFrameRef = useRef(null);
  const rotationSpeedRef = useRef(0.02);

  // Function untuk menghandle load spline
  const onLoad = (splineApp) => {
    console.log("Spline loaded:", splineApp);
    splineRef.current = splineApp;
  };

  useEffect(() => {
    let rotationValue = 0;

    const animate = () => {
      if (splineRef.current) {
        rotationValue += rotationSpeedRef.current;
        
        // Mengakses dan memutar seluruh scene
        const scene = splineRef.current.scene;
        if (scene) {
          scene.rotation.y = rotationValue;
          
          // Memaksa update scene
          if (scene.updateMatrixWorld) {
            scene.updateMatrixWorld(true);
          }
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Mulai animasi
    animate();

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); 

  // Event handlers untuk interaksi mouse
  const handleMouseDown = (e) => {
    // Pause rotasi saat user mulai drag
    const prevSpeed = rotationSpeedRef.current;
    rotationSpeedRef.current = 0;
    
    const handleMouseUp = () => {
      // Resume rotasi dengan kecepatan sebelumnya
      rotationSpeedRef.current = prevSpeed;
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mouseup', handleMouseUp);
    
    const splineElement = document.querySelector('.spline-model');
    if (splineElement) {
      splineElement.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = (e) => {
    const splineElement = document.querySelector('.spline-model');
    if (splineElement) {
      splineElement.style.cursor = 'grab';
    }
  };

  // CSS untuk container Spline
  const splineContainerStyle = {
    width: '100%',
    height: '400px',
    background: 'none',
    marginTop: '110px',
    cursor: 'grab',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <header className="bg-white py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Section: Branding */}
          <div className="col-md-6">
            <Branding />
          </div>

          {/* Right Section: 3D Model */}
          <div className="col-md-6" style={{ paddingLeft: '140px' }}>
            <div 
              style={splineContainerStyle}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <Spline 
                scene="https://prod.spline.design/kN0pOZXf2ZtGgYow/scene.splinecode"
                className="spline-model"
                onLoad={onLoad}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;