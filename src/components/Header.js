import React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';

const Header = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar style={{ justifyContent: 'center' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>
            Fitness Trainer Appointment Scheduler
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Placeholder to ensure content starts below the app bar */}
    </>
  );
};

export default Header;
