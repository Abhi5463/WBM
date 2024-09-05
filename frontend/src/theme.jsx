'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#FFBF00', // Example primary color
      contrastText: '#ffffff', // Text color for primary color
    },
    secondary: {
      main: '#900C3F', // Example secondary color
      contrastText: '#ffffff', // Text color for secondary color
    },
    error: {
      main: '#f44336', // Example error color
    },
    warning: {
      main: '#ff9800', // Example warning color
    },
    info: {
      main: '#2196f3', // Example info color
    },
    success: {
      main: '#4caf50', // Example success color
    },
    background: {
      default: '#f5f5f5', // Example background color
    },
    text: {
      primary: '#000000', // Example primary text color
      secondary: '#808080', // Example secondary text color
    },
    faded: {
    primary: '#f9b8d1',
    secondary: '#ededed',
    }
  },
});

export default theme;
