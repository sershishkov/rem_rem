'use client';
import { usePathname } from 'next/navigation';
import { worker_role } from '@/constants/constants';

import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer() {
  const pathname = usePathname();
  const pathStarts = pathname.split('/')[1];
  const isShowFooter = !worker_role.includes(pathStarts);

  return (
    <Grid
      container
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      id='footer'
      sx={{ display: isShowFooter ? 'block' : 'none' }}
    >
      <Grid>
        <Typography variant='h6' align='center'>
          Ремонт любой сложности для ОСББ
        </Typography>
      </Grid>
      <Grid component={Link} href='tel:+380502279650'>
        <Typography variant='h6' align='center'>
          +380502279650
        </Typography>
      </Grid>
      <Grid component={Link} href='tel:+380502279650'>
        <Typography variant='h6' align='center'>
          +380972279650
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Footer;
