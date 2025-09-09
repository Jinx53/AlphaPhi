import React from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { useTheme, useMediaQuery } from '@mui/material';

const BasicCard = ({content}) => {

  const cardStyle = {
    padding: '2em 2em 2em 2em',
    width: '65%',
    marginTop: '5%',
  }
  const cardStylePhone = {
    padding: '2em 2em 2em 2em',
    width: '100%',
    marginTop: '5%',
  }

  const theme = useTheme();
  
  const phoneStyle = useMediaQuery(theme.breakpoints.down('laptop'));

  return (
    
      <Card sx={phoneStyle ? cardStylePhone: cardStyle}>
        <CardContent>
          {content}
        </CardContent>
    </Card>
  )
}

export default BasicCard