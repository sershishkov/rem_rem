'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  item__get_one,
  item__edit,
  item__add,
} from '@/lib/actions/refdata.actions';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const currentURL = '/manager/refdata/productgroup';

function ProductGrAddEdit({
  id,
  mode,
  title,
}: Readonly<{ id?: string; mode: string; title: string }>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const route = useRouter();

  const [productGroupName, setProductGroupName] = useState<string>('');

  useEffect(() => {
    const inputFocus = document.getElementById('productGroupName');
    inputFocus?.focus();
  }, []);

  useEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const myData = await item__get_one({ _id: id }, currentURL);
        setProductGroupName(myData.productGroupName);
      };
      myGetOne();
    }
  }, [id]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductGroupName(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      productGroupName,
    };

    if (mode === 'add') {
      await item__add(created__Data, currentURL, route);
    } else if (mode === 'edit') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      created__Data._id = id;
      await item__edit(created__Data, currentURL, route);
    }
  };
  if (!isClient) {
    return null;
  }

  return (
    <Grid
      component='form'
      onSubmit={onSubmit}
      container
      direction='column'
      sx={{
        // border: '1px solid yellow',
        padding: matches ? '0 2rem' : '0 0.5rem',
        maxWidth: '500px',
        margin: 'auto',
        width: '100%',
      }}
    >
      <Grid>
        <Typography variant={matches ? 'h4' : 'h6'} align='center'>
          {title}
        </Typography>
      </Grid>
      <Grid>
        <TextField
          margin='normal'
          required
          fullWidth
          name='productGroupName'
          label='Группа товаров'
          type='text'
          id='productGroupName'
          value={productGroupName ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid>
        <Button
          type='submit'
          fullWidth
          disabled={productGroupName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default ProductGrAddEdit;
