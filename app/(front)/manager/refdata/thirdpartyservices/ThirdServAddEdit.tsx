'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  item__get_one,
  item__edit,
  get__all,
  item__add,
} from '@/lib/actions/refdata.actions';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';
import MySelectMultipleAutoCompl from '@/components/common/MySelectMultipleAutoCompl';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const currentURL = '/manager/refdata/thirdpartyservices';
const initState = {
  thirdPartyServiceName: '',
  description: '',
  unit: '',
  thirdPartyServiceGroup: [],
  priceBuyRecommend: '',
};

function ThirdServAddEdit({
  id,
  mode,
  title,
}: Readonly<{ id?: string; mode: string; title: string }>) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const route = useRouter();

  const [formData, setFormData] = useState(initState);
  const [arr__Units, setArr__Units] = useState([]);
  const [arr__ThirdPartyServiceGroups, setArr__ThirdPartyServiceGroups] =
    useState([]);

  const {
    thirdPartyServiceName,
    description,
    unit,
    thirdPartyServiceGroup,
    priceBuyRecommend,
  } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('thirdPartyServiceName');
    inputFocus?.focus();
  }, []);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);

        if (item) {
          const arrToSet_thirdPartyServiceGroup =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            item.thirdPartyServiceGroup!.map((item: any) => {
              return item._id;
            });

          setFormData({
            thirdPartyServiceName: item.thirdPartyServiceName!,
            unit: item.unit._id!,
            description: item.description,

            thirdPartyServiceGroup: arrToSet_thirdPartyServiceGroup,
            priceBuyRecommend: item.priceBuyRecommend!.toString(),
          });
        }
      };
      myGetOne();
    }
  }, [id]);

  useEffect(() => {
    const myGetAll = async () => {
      const units = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/unit'
      );
      const thirdpartyservicegroup = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/thirdpartyservice-group'
      );

      setArr__Units(units.items);
      setArr__ThirdPartyServiceGroups(thirdpartyservicegroup.items);
    };
    myGetAll();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      thirdPartyServiceName,
      description,
      unit,
      thirdPartyServiceGroup,
      priceBuyRecommend: priceBuyRecommend ? Number(priceBuyRecommend) : 1,
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
  const handleChangeSelects = (
    targetName: string,
    targetValue: string | string[]
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const onClickAddItem = (link: string) => {
    route.push(`${link}`);
  };

  return (
    <Grid
      component='form'
      onSubmit={onSubmit}
      container
      direction='column'
      autoComplete='off'
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
          name='thirdPartyServiceName'
          label='Сторонний сервис'
          type='text'
          id='thirdPartyServiceName'
          value={thirdPartyServiceName ?? ''}
          onChange={onChange}
        />
      </Grid>
      <Grid>
        <TextField
          margin='normal'
          multiline
          maxRows={4}
          fullWidth
          name='description'
          label='Описание'
          type='text'
          id='description'
          value={description ?? ''}
          onChange={onChange}
        />
      </Grid>

      <Grid sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectAutoCompl
            selectName={`unit`}
            selectLabel={`Ед.изм`}
            fieldToShow={`unitName`}
            handleChangeSelects={handleChangeSelects}
            selectedOption={unit ?? ''}
            arrToSelect={arr__Units}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/unit/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectMultipleAutoCompl
            selectName={`thirdPartyServiceGroup`}
            selectLabel={`Группы сторонних работ`}
            fieldToShow={`thirdPartyServiceGroupName`}
            handleChangeMultipleSelects={handleChangeSelects}
            selectedOptions={
              thirdPartyServiceGroup.length !== 0 ? thirdPartyServiceGroup : []
            }
            arrToSelect={arr__ThirdPartyServiceGroups}
          />

          <IconButton
            onClick={() =>
              onClickAddItem('/manager/refdata/thirdpartyservice-group/add')
            }
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid>
        <TextField
          margin='normal'
          // required

          fullWidth
          name='priceBuyRecommend'
          label='Входящая цена'
          type='number'
          id='priceBuyRecommend'
          value={priceBuyRecommend ?? ''}
          onChange={onChange}
          // inputProps={{
          //   step: '.001',
          // }}
        />
      </Grid>

      <Grid>
        <Button
          type='submit'
          fullWidth
          disabled={
            !thirdPartyServiceName ||
            !unit ||
            thirdPartyServiceGroup.length === 0 ||
            !priceBuyRecommend
          }
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}

export default ThirdServAddEdit;
