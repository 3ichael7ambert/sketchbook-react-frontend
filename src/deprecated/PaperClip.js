import React from 'react';

const PaperClip = () => {
  return (
    <img src="./imgs/paperclip.png" alt="PaperClip" />
  );
};

export default PaperClip;


// import React, { useRef } from 'react';
// import { useLoader } from '@react-three/fiber';
// import { TextureLoader } from 'three';

// const PaperClip = () => {
//   const texture = useLoader(TextureLoader().load( '/imgs/paperclip.png'));
  
//   const meshRef = useRef();

//   return (
//     <mesh ref={meshRef}>
//       <planeBufferGeometry args={[1, 1]} />
//       <meshBasicMaterial map={texture} />
//     </mesh>
//   );
// };

// export default PaperClip;
