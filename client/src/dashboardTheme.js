import { createTheme } from '@mui/material/styles';

export const dashboardTheme = createTheme({
    components: {
        // Name of the component
        MuiCardContent: {
          styleOverrides:{
            root: {
              //backgroundColor: 'antiquewhite!important',
              borderRadius: '1%',
            }
          },
        },
        MuiTabs:{
          styleOverrides:{
            scroller: {
              position: 'relative',
              display: 'inline-block',
              flex: '1 1 auto',
              whiteSpace: 'nowrap',
              overflowX: 'auto!important',
              width: '100%'
            },
          }
        },
        MuiInput: {
          styleOverrides: {
            // Name of the slot
            underline: {
             width: '100%!important',
            },
          },
        },

        MuiButton: {
          styleOverrides: {
            // Name of the slot
            root: {
              color: "inherit",
              transition: 'all 0.4s',
            },
            contained: {
              // Some CSS
              marginTop: '1%',
              color: "inherit",
              backgroundColor: '#0f82ec',
              padding: '0.8em 2em',
              fontWeight: '700',
              textDecoration: 'none',
              '&:hover': {
                backgroundColor: 'lime',
                color: 'black!important'
              }
            },
          },
        },
    },
    palette: {
        primary: {
          main: '#091579'
        },
        secondry: {
          main: '#091579'
        },
        university: {
          main: 'lime'
        }

    },
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
          mobile: 0,
          tablet: 640,
          laptop: 1024,
          desktop: 1200,
        },
      },
  });