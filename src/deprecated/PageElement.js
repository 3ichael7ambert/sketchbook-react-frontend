import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

const PageElement = ({ type, position }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = new fabric[type]({
      // Customize element properties
      left: position.x,
      top: position.y,
    });

    // Add event listeners for element interactions

    elementRef.current = element;
  }, [type, position]);

  return <div ref={elementRef} />;
};

export default PageElement;