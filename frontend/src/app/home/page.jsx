'use client';
import React from 'react';
import Lottie from 'lottie-react';
import incomingTruck from '@/animations/incomingTruck.json'; 
import outgoingTruck from '@/animations/outgoingTruck.json';
import { Box, Button, Paper } from '@mui/material';
import { useRouter } from "next/navigation";
import theme from '@/theme';

const Page = () => {
  const router = useRouter();

  const handleBtnClick = ({direction}) => {
    router.push(`/${direction}`);
  };

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
        <Paper sx={{ padding: 2, width: "50%", height: '100%', display: "flex", flexDirection: "column", justifyContent: "space-between", bgcolor: theme.palette.faded.primary}}>
        <Lottie animationData={incomingTruck} loop={true} style={{height: "50%", width: "100%"}}/>
        <Button variant="outlined" fullWidth onClick={() => handleBtnClick({direction: "inwards"})}>Manage Inwards Data</Button>
        </Paper>

        <Paper sx={{ padding: 2, width: "50%", height: '100%', display: "flex", justifyContent: "center", alignItems:"center", display: "flex", flexDirection: "column", justifyContent: "space-between", bgcolor: theme.palette.faded.primary}}>
          <Lottie animationData={outgoingTruck} loop={true} style={{height: "50%", width: "100%"}}/>
          <Button variant="contained" fullWidth onClick={() => handleBtnClick({direction: "outwards"})}>Manage Outwards Data</Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default Page;
