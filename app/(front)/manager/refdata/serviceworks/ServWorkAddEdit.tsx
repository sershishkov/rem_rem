'use client';

import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
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

const currentURL = '/manager/refdata/serviceworks';
const initState = {
  serviceWorkName: '',
  description: '',
  unit: '',
  serviceWorkGroup: [],
  priceWorkerRecommend: '',
  priceClientRecommend: '',
  products: [],
  inventars: [],
  tools: [],
  equipment: [],
  workerProtection: [],
};

function ServWorkAddEdit({
  id,
  mode,
  title,
}: Readonly<{ id?: string; mode: string; title: string }>) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const route = useRouter();

  const [formData, setFormData] = useState(initState);
  const [arr__Units, setArr__Units] = useState([]);
  const [arr__ServiceworkGroups, setArr__ServiceworkGroups] = useState([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [arr__Products, setArr__Products] = useState<any[]>([]);

  const arr_Materials = useMemo(
    () =>
      arr__Products?.filter(
        (item) => item.productType?.productTypeName === 'стройматериалы'
      ),
    [arr__Products]
  );
  const arr_Inventars = useMemo(
    () =>
      arr__Products?.filter(
        (item) => item.productType?.productTypeName === 'инвентарь'
      ),
    [arr__Products]
  );
  const arr_Tools = useMemo(
    () =>
      arr__Products?.filter(
        (item) => item.productType?.productTypeName === 'инструмент'
      ),
    [arr__Products]
  );
  const arr_Equipments = useMemo(
    () =>
      arr__Products?.filter(
        (item) => item.productType?.productTypeName === 'оборудование'
      ),
    [arr__Products]
  );
  const arr_WorkerProtections = useMemo(
    () =>
      arr__Products?.filter(
        (item) => item.productType?.productTypeName === 'средство защиты'
      ),
    [arr__Products]
  );

  const {
    serviceWorkName,
    description,
    unit,
    serviceWorkGroup,
    priceWorkerRecommend,
    priceClientRecommend,
    products,
    inventars,
    tools,
    equipment,
    workerProtection,
  } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById('productName');
    inputFocus?.focus();
  }, []);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item = await item__get_one({ _id: id }, currentURL);

        if (item) {
          const arrToSet_serviceWorkGroup = item.serviceWorkGroup!.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: any) => {
              return item._id;
            }
          );

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const arrToSet_products = item.products!.map((item: any) => {
            return item._id;
          });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const arrToSet_inventars = item.inventars!.map((item: any) => {
            return item._id;
          });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const arrToSet_tools = item.tools!.map((item: any) => {
            return item._id;
          });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const arrToSet_equipment = item.equipment!.map((item: any) => {
            return item._id;
          });

          const arrToSet_workerProtection = item.workerProtection!.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (item: any) => {
              return item._id;
            }
          );

          setFormData({
            serviceWorkName: item.serviceWorkName!,
            description: item.description!,

            unit: item.unit._id!,

            serviceWorkGroup: arrToSet_serviceWorkGroup,

            products: arrToSet_products ?? [],

            inventars: arrToSet_inventars ?? [],

            tools: arrToSet_tools ?? [],

            equipment: arrToSet_equipment ?? [],

            workerProtection: arrToSet_workerProtection ?? [],

            priceWorkerRecommend: item.priceWorkerRecommend!.toString(),
            priceClientRecommend: item.priceClientRecommend!.toString(),
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
      const serviceworkgroup = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/servicework-group'
      );
      const products = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/products'
      );

      setArr__Units(units.items);
      setArr__ServiceworkGroups(serviceworkgroup.items);
      setArr__Products(products.items);
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
      serviceWorkName,
      description,
      unit,
      serviceWorkGroup,

      priceWorkerRecommend: priceWorkerRecommend
        ? Number(priceWorkerRecommend)
        : 1,
      priceClientRecommend: priceClientRecommend
        ? Number(priceClientRecommend)
        : 0,
      products,
      inventars,
      tools,
      equipment,
      workerProtection,
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
          name='serviceWorkName'
          label='Наминеование работы'
          type='text'
          id='serviceWorkName'
          value={serviceWorkName ?? ''}
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
            selectName={`serviceWorkGroup`}
            selectLabel={`Группы работ`}
            fieldToShow={`serviceWorkGroupName`}
            handleChangeMultipleSelects={handleChangeSelects}
            selectedOptions={
              serviceWorkGroup.length !== 0 ? serviceWorkGroup : []
            }
            arrToSelect={arr__ServiceworkGroups}
          />

          <IconButton
            onClick={() =>
              onClickAddItem('/manager/refdata/servicework-group/add')
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
          name='priceWorkerRecommend'
          label='Цена за работу исполнителю'
          type='number'
          id='priceWorkerRecommend'
          value={priceWorkerRecommend ?? ''}
          onChange={onChange}
          // inputProps={{
          //   step: '.001',
          // }}
        />
      </Grid>

      <Grid>
        <TextField
          margin='normal'
          // required

          fullWidth
          name='priceClientRecommend'
          label='Цена за работу клиенту'
          type='number'
          id='priceClientRecommend'
          value={priceClientRecommend ?? ''}
          onChange={onChange}
          // inputProps={{
          //   step: '.001',
          // }}
        />
      </Grid>

      <Grid sx={{ mb: 2 }}>
        <Stack
          direction='row'
          spacing={2}
          // direction={{ xs: 'column', sm: 'row' }}
        >
          <MySelectMultipleAutoCompl
            selectName={`products`}
            selectLabel={`Материалы`}
            fieldToShow={'productName'}
            handleChangeMultipleSelects={handleChangeSelects}
            selectedOptions={products.length !== 0 ? products : []}
            arrToSelect={arr_Materials ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/products/add')}
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
            selectName={`inventars`}
            selectLabel={`Инвентарь`}
            fieldToShow={'productName'}
            handleChangeMultipleSelects={handleChangeSelects}
            selectedOptions={inventars.length !== 0 ? inventars : []}
            arrToSelect={arr_Inventars ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/products/add')}
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
            selectName={`tools`}
            selectLabel={`Инструмент`}
            fieldToShow={'productName'}
            handleChangeMultipleSelects={handleChangeSelects}
            selectedOptions={tools.length !== 0 ? tools : []}
            arrToSelect={arr_Tools ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/products/add')}
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
            selectName={`equipment`}
            selectLabel={`Оборудование`}
            fieldToShow={'productName'}
            handleChangeMultipleSelects={handleChangeSelects}
            selectedOptions={equipment.length !== 0 ? equipment : []}
            arrToSelect={arr_Equipments ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/products/add')}
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
            selectName={`workerProtection`}
            selectLabel={`Средства Защиты`}
            fieldToShow={'productName'}
            handleChangeMultipleSelects={handleChangeSelects}
            selectedOptions={
              workerProtection.length !== 0 ? workerProtection : []
            }
            arrToSelect={arr_WorkerProtections ?? []}
          />

          <IconButton
            onClick={() => onClickAddItem('/manager/refdata/products/add')}
          >
            <AddIcon color='success' sx={{ fontSize: 30 }} />
          </IconButton>
        </Stack>
      </Grid>

      <Grid>
        <Button
          type='submit'
          fullWidth
          disabled={
            !serviceWorkName ||
            !unit ||
            !serviceWorkGroup ||
            !priceWorkerRecommend
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

export default ServWorkAddEdit;
