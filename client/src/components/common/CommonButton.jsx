import React from 'react'
import Button from '@mui/material/Button';

const CommonButton = ({onClick, children, color, disabled, size, sx, variant}) => {
  return (
        <Button
        onClick={onClick}
        variant={variant}
        color={color}
        disabled={disabled}
        size={size}
        sx={sx}
        >
            {children}
        </Button>
  )
}

export default CommonButton