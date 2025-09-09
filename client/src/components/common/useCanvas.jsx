
import { useRef, useEffect, useState } from 'react'
import {Particle} from './Particle';

const useCanvas = (particleArray) => {
  
  const canvasRef = useRef(null);
  //const [particleArray, setparticleArray] = useState([]);



/* 
  function init () {
    for(let i = 0; i < 10; i++){
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;
      let position = new Particle(x, y);
      setparticleArray([ ...particleArray, position])

    }
  }
   */
  useEffect(() => {
    
    const canvas = canvasRef.current
    const context = canvas.getContext('2d');

    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;

    context.fillStyle = 'green';
    context.font = '30px Verdana';
    context.fillText('A', 150, 120);
    //context.strokeStyle = 'pink';
    //context.strokeRect(0, 0, 200, 200);
    //const data = context.getImageData(0, 0, 200, 200)
    //let frameCount = 0
    let animationFrameId;

    console.log('the particle:', particleArray)
    const animate = () => {
      //frameCount++

      //init();
      context.clearRect(0, 0, canvas.width, canvas.height);

      particleArray.forEach(option => {
        option.draw(context)
        option.update()
      });
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()
    
    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [particleArray])
  
  return canvasRef
}

export default useCanvas
