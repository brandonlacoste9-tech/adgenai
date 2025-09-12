import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  moveSpeed: number;
}

export const StarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      const stars: Star[] = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          moveSpeed: Math.random() * 0.1 + 0.05,
        });
      }
      
      starsRef.current = stars;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      starsRef.current.forEach((star, index) => {
        // Update star properties
        star.opacity += Math.sin(Date.now() * star.twinkleSpeed + index) * 0.01;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        
        // Slow drift movement
        star.x += Math.sin(Date.now() * star.moveSpeed * 0.001 + index) * 0.1;
        star.y += Math.cos(Date.now() * star.moveSpeed * 0.001 + index) * 0.1;
        
        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        // Add occasional larger glow for bigger stars
        if (star.size > 1.5 && Math.random() > 0.98) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 197, 253, ${star.opacity * 0.3})`;
          ctx.fill();
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createStars();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 25%, #2d1b4e 50%, #1a1a3e 75%, #0f0f23 100%)',
      }}
    />
  );
};