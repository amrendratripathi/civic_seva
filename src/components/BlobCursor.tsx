import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const BlobCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Update spring values for smooth following
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const handleMouseEnter = (e: Event) => {
      setIsHovering(true);
      const element = e.target as HTMLElement;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate magnetic attraction
      const magneticX = centerX - position.x;
      const magneticY = centerY - position.y;
      
      setMagneticPosition({ x: magneticX * 0.3, y: magneticY * 0.3 });
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setMagneticPosition({ x: 0, y: 0 });
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .complaint-card, .card-hover, .glow-effect, .glow-orange, .glow-amber');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [position, x, y]);

  if (!isVisible) return null;

  return (
    <>
      {/* Hide default cursor */}
      <style>
        {`
          * {
            cursor: none !important;
          }
        `}
      </style>
      
      {/* Blob cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x - 12,
          top: position.y - 12,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <motion.div
          className="w-6 h-6 rounded-full bg-primary"
          animate={{
            scale: isHovering ? 0.8 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        />
        
        {/* Outer ring with inverted effect */}
        <motion.div
          className="absolute inset-0 w-6 h-6 rounded-full border-2 border-white/50 mix-blend-difference"
          animate={{
            scale: isHovering ? 1.2 : 1,
            opacity: isHovering ? 0.8 : 0.5,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        />
      </motion.div>
    </>
  );
};

export default BlobCursor;
