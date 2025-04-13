import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if(dotRef.current){
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const animate = () => {
      // Smooth follow animation for trailing ring
      trailX += (mouseX - trailX) * 0.5;
      trailY += (mouseY - trailY) * 0.5;

      if(trailRef.current){
        trailRef.current.style.left = `${trailX}px`;
        trailRef.current.style.top = `${trailY}px`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style>{`
        * {
        // cursor: none !important;
        // Prevent Text Selection
        // user-select: none;
        // -webkit-user-select: none;
        // -moz-user-select: none;
        // -ms-user-select: none;
        }
        ::selection {
            background: #00bcd4;
            color: #000;
        }

        ::-moz-selection {
            background: #00bcd4;
            color: white;
        }


        .cursor-dot {
          position: fixed;
          top: 0;
          left: 0;
          width: 5px;
          height: 5px;
          background-color: #00bcd4;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 20px #00bcd4;
        }

        .cursor-trail {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border: 2px solid #00bcd4;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.15s ease-out;
          animation: water-ripple 2s infinite ease-in-out;
        }

        @keyframes water-ripple {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.2;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
        }
      `}</style>

      <div className="cursor-dot" ref={dotRef}></div>
      {/* <div className="cursor-trail" ref={trailRef}></div> */}
    </>
  );
};

export default CustomCursor;
