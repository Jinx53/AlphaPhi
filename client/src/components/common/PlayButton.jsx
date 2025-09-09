import React from 'react';
import '../../styles/Shared.css';
const PlayButton = ({ title, onClick, children, style, className }) => {
  return (
    <button
    title={title}
      onClick={onClick}
      className={className}
      style={style}
    >
    <span className="mr-10" >&#9654;</span> {children} 
    </button>
  )
}

export default PlayButton;