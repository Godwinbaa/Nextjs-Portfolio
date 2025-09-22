import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MagneticFilings() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const gridSize = 10;
  const totalLines = gridSize * gridSize;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  const calculateAngle = (lineX, lineY) => {
    const deltaX = mousePosition.x - lineX;
    const deltaY = mousePosition.y - lineY;
    return Math.atan2(deltaY, deltaX);
  };

  const calculateDistance = (lineX, lineY) => {
    const deltaX = mousePosition.x - lineX;
    const deltaY = mousePosition.y - lineY;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full min-h-[600px] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden cursor-none"
      style={{
        background: 'radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 100%)'
      }}
    >
      {/* Cursor indicator */}
      {isHovering && (
        <motion.div
          className="absolute w-3 h-3 bg-slate-800 rounded-full pointer-events-none z-10"
          style={{
            left: mousePosition.x - 6,
            top: mousePosition.y - 6,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Grid of magnetic lines */}
      <div className="absolute inset-0 p-12">
        <div 
          className="grid gap-4 h-full"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`
          }}
        >
          {Array.from({ length: totalLines }, (_, index) => {
            const row = Math.floor(index / gridSize);
            const col = index % gridSize;
            
            // Calculate the center position of each grid cell
            const containerWidth = containerRef.current?.offsetWidth - 96 || 400; // minus padding
            const containerHeight = containerRef.current?.offsetHeight - 96 || 400;
            
            const cellWidth = containerWidth / gridSize;
            const cellHeight = containerHeight / gridSize;
            
            const lineX = 48 + col * cellWidth + cellWidth / 2; // 48 = padding
            const lineY = 48 + row * cellHeight + cellHeight / 2;
            
            const angle = isHovering ? calculateAngle(lineX, lineY) : 0;
            const distance = calculateDistance(lineX, lineY);
            const maxDistance = 200;
            const influence = Math.max(0, 1 - distance / maxDistance);
            
            return (
              <motion.div
                key={index}
                className="relative flex items-center justify-center"
                style={{ width: '100%', height: '100%' }}
              >
                <motion.div
                  className="absolute bg-slate-700 rounded-full"
                  style={{
                    width: '24px',
                    height: '2px',
                    transformOrigin: 'center center'
                  }}
                  animate={{
                    rotate: isHovering ? `${angle}rad` : '0rad',
                    scale: isHovering ? 1 + influence * 0.5 : 1
                  }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 300,
                    mass: 0.1
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Instructional text */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-600 text-sm font-medium tracking-wide"
        initial={{ opacity: 1 }}
        animate={{ opacity: isHovering ? 0.3 : 1 }}
        transition={{ duration: 0.3 }}
      >
        Move your cursor to see the magnetic effect
      </motion.div>
    </div>
  );
}
