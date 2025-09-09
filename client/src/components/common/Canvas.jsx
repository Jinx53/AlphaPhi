import React from 'react'
import useCanvas from './useCanvas'

const Canvas = props => {  
  
  const { particleArray, ...rest } = props
  const canvasRef = useCanvas(particleArray)
  //const canvasRef = useCanvas()
  
  return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas