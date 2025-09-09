import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

const imageStyle = {
  /* height: 370,  */
  overflow: 'hidden',
}

export default function TitlebarBelowMasonryImageList({itemData}) {
  return (
    <Box  sx={imageStyle}>
      <ImageList  variant="masonry" cols={itemData.length < 4 ? 2 : 3} gap={10}>
        {itemData.map((item, i) => (
          <ImageListItem key={i}>
            <img
              src={item.photo ? `${item.photo}?w=248&fit=crop&auto=format`: null}
              alt={item.footer}
              loading="lazy"
            />
            <ImageListItemBar position="below" title={item.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

