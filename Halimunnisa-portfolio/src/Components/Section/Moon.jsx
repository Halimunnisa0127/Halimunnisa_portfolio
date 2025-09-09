import React from "react";

const Moon = () => {
  return (
    <div className="moon-container">
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes spin-bg {
            0% { background-position: 200% center; }
            100% { background-position: 0% center; }
          }
          
          @keyframes pulseGlow {
            0%, 200% { 
              opacity: 0.4; 
              transform: scale(0.95); 
            }
            50% { 
              opacity: 0.8; 
              transform: scale(1.05); 
            }
          }
          
          @keyframes sideGlow {
            0%, 100% { 
              opacity: 0.3;
              transform: scale(0.9); 
            }
            50% { 
              opacity: 0.6;
              transform: scale(1.1); 
            }
          }
          
          .moon-container {
            position: relative;
            width: 176px;
            height: 176px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 40px auto;
          }
          
          .glow {
            position: absolute;
            inset: 0;
            width: 120%;
            height: 120%;
            border-radius: 50%;
            animation: pulseGlow 8s ease-in-out infinite;
            background: radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 50%, transparent 70%);
            z-index: 10;
            left: -10%;
            top: -10%;
          }
      
          .moon {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-image: url('https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_poles_1k.jpg');
            background-size: 200% auto;
            background-repeat: repeat-x;
            animation: spin-bg 20s linear infinite, float 6s ease-in-out infinite;
            filter: brightness(1.1) contrast(1.1);
            z-index: 20;
            position: relative;
          }
          
          .shading {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 50%, transparent 40%, rgba(0,0,0,0.6) 100%);
            z-index: 30;
          }
        `}
      </style>
      
      {/* Central Glow */}
      <div className="glow"></div>
      
      {/* Moon */}
      <div className="moon"></div>
      
      {/* Overlay for shading */}
      <div className="shading"></div>
    </div>
  );
};

export default Moon;