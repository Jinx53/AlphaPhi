import React from 'react';
import '../../styles/Shared.css';
const ArrowButton = ({ title, onClick, children, style, className }) => {
  return (
    <button
    title={title}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children} <span  className="ml-10" >&#8594;</span>
    </button>
  )
}

export default ArrowButton;