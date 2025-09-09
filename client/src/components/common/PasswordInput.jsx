import React, { useState } from 'react'
import { IconButton, Grid, InputAdornment, Input } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const PasswordInput = ({ type = "password", placeholder, name, onChange, value, sx, children }) => {


  const [showPassword, setShowPassWord] = useState(false);

  const handleShowPassword = () => {
    setShowPassWord(!showPassword)
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Input type={showPassword ? "text" : type} sx={sx} placeholder={placeholder} name={name} onChange={onChange} value={value} endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={handleShowPassword}> {(showPassword) ? <VisibilityOffIcon /> : <VisibilityIcon />} </IconButton>
            </InputAdornment>}
            >
          {children}
        </Input>
      </Grid>
    </Grid>
  )
}

export default PasswordInput