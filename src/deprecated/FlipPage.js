import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './FlipPage.css';

const FlipPage = ({ children }) => {
  const [flipped, setFlipped] = useState(false);

  const { transform, opacity } = useSpring({
    opacity: flipped ? 0 : 1,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const handleClick = () => {
    // Toggle the flipped state on button click
    setFlipped(!flipped);
  };

  return (
    <div className="FlipPage" onClick={handleClick}>
      <animated.div
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateY(0deg)`),
        }}
      >
        {/* Front page content */}
        {children[0]}
      </animated.div>
      <animated.div
        style={{
          opacity: opacity.to(o => 1 - o),
          transform: transform.interpolate(t => `${t} rotateY(180deg)`),
        }}
      >
        {/* Back page content */}
        {children[1]}
      </animated.div>
    </div>
  );
};

export default FlipPage;
