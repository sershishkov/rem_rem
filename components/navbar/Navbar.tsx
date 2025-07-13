'use client';
import React, { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import NavigationList from './NavigationList';

export default function Navbar() {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpenDrawer(open);
    };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent rendering on the server
  }
  if (typeof window === 'undefined') {
    return null; // Prevent rendering on the server
  }

  return (
    <Box id='navbar'>
      <AppBar position='fixed'>
        <Toolbar sx={{ width: '100%' }}>
          <IconButton
            onClick={toggleDrawer(true)}
            edge='start'
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={'left'}
            open={openDrawer}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <NavigationList toggleDrawer={toggleDrawer} />
          </SwipeableDrawer>

          <Link href='/'>Калькуляция </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
