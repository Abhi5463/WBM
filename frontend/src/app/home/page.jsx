'use client';
import React from 'react';
import Lottie from 'lottie-react';
import incomingTruck from '@/animations/incomingTruck.json'; 
import outgoingTruck from '@/animations/outgoingTruck.json';
import { Box, Paper } from '@mui/material';
import theme from '@/theme';

const Page = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        bgcolor: theme.palette.background.default,
        height: "100vh",
        display: "flex",
        overflow: "scroll",
        flexDirection: "column",
        padding: 2
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, marginTop: 2, height: "100%", display: "flex", justifyContent: "center", alignItems:"center"  }}>
        <Paper sx={{ padding: 2, width: "50%", height: '100%' }}>
        <Lottie animationData={incomingTruck} loop={true} style={{height: "100%", width: "100%"}}/>
        </Paper>
        <Paper sx={{ padding: 2, width: "50%", height: '100%', display: "flex", justifyContent: "center", alignItems:"center" }}>
          <Lottie animationData={outgoingTruck} loop={true} style={{height: "50%", width: "50%"}}/>
        </Paper>
      </Box>
    </Box>
  );
}

export default Page;
