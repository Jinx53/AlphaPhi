import React from 'react';
import '../../styles/Shared.css';
const LinkButton = ({ onClick, children, style, className }) => {
  return (
    <a
      onClick={onClick}
      className={className}
      style={style}
    >
      <span  className="mr-10" >&#8594;</span> {children}
    </a>
  )
}

export default LinkButton;