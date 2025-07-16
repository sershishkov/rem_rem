'use client';
import React, { useState, useEffect } from 'react';

import { get__all, delete__one } from '@/lib/actions/refdata.actions';

import Link from '@mui/material/Link';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MySelectAutoCompl from '@/components/common/MySelectAutoCompl';
import MySelectMultipleAutoCompl from '@/components/common/MySelectMultipleAutoCompl';
import MySpinner from '@/components/common/MySpinner';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const initState = {
  unit: '',
  productType: '',
  productGroup: [],
};

const headerFields = [
  'Наименование',
  'ед.изм',
  'Цена вход',
  'Тип товара',
  'Группы товаров',
];

const tableFields = [
  'productName',
  'unit',
  'priceBuyRecommend',
  'productType',
  'productGroup',
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arrToShow = (enteredArr: any) => {
  const localArr = JSON.parse(JSON.stringify(enteredArr));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformedArr = localArr.map((currentItem: any) => {
    let arrToString = '';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    currentItem.productGroup.forEach((element: any) => {
      arrToString += `${element.productGroupName}, `;
    });

    return {
      _id: currentItem._id,
      productName: currentItem.productName,
      unit: currentItem.unit.unitName,
      priceBuyRecommend: currentItem.priceBuyRecommend,
      productType: currentItem.productType.productTypeName,
      productGroup: arrToString,
    };
  });
  return transformedArr;
};

export default function ProductListShow({
  currentURL,
  tableHeader,
}: {
  readonly currentURL: string;
  readonly tableHeader: string;
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [formData, setFormData] = useState(initState);
  const [countTotalItems, setCountTotalItems] = useState(0);
  const [arr__Units, setArr__Units] = useState([]);
  const [arr__ProductGroups, setArr__ProductGroups] = useState([]);
  const [arr__ProductTypes, setArr__ProductTypes] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [totalResults, setTotalResults] = useState([]);
  const [resultFetch, setResultFetch] = useState([]);

  const { unit, productType, productGroup } = formData;

  useEffect(() => {
    const myGetAll = async () => {
      const getTotalItems = await get__all(
        { page: '0', limit: '0', filter: '' },
        currentURL
      );
      const units = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/unit'
      );
      const productgroups = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/productgroup'
      );
      const producttypes = await get__all(
        { page: '0', limit: '0', filter: '' },
        '/manager/refdata/producttype'
      );

      setArr__Units(units.items);
      setArr__ProductGroups(productgroups.items);
      setArr__ProductTypes(producttypes.items);

      setCountTotalItems(getTotalItems.total);
      setTotalResults(arrToShow(getTotalItems.items));
      setResultFetch(arrToShow(getTotalItems.items));
    };
    myGetAll();
  }, [currentURL]);

  useEffect(() => {
    setSearchText('');
    const searchInput = document.getElementById('searchText');
    searchInput?.focus();
  }, []);

  const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
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

  const handleSearch = async () => {
    const filtered_items = await get__all(
      {
        page: '0',
        limit: '0',
        filter: searchText,

        unit: unit,
        productType: productType,
        productGroup: productGroup,
      },
      currentURL
    );

    setResultFetch(arrToShow(filtered_items?.items));
  };
  const handleRestart = () => {
    setResultFetch(totalResults);
    setFormData(initState);
    setSearchText('');
  };

  const deleteHanler = async (_id: string) => {
    await delete__one(_id, currentURL);
    const all_items = await get__all(
      { page: '0', limit: '0', filter: '' },
      currentURL
    );
    setResultFetch(arrToShow(all_items.items));
    setFormData(initState);
    setSearchText('');
  };

  return (
    <Grid
      container
      alignItems='center'
      direction='column'
      sx={{
        // border: '1px solid red',
        padding: matches ? '0 5rem' : '3rem 0.5rem',
        width: '100%',
        margin: 'auto',
      }}
    >
      <Grid
        container
        alignItems='center'
        justifyContent='space-between'
        direction={matches ? 'row' : 'column'}
        spacing={1}
        sx={{ width: '100%' }}
      >
        <Grid sx={{ flex: 1, width: matches ? undefined : '100%' }}>
          <TextField
            margin='normal'
            focused
            fullWidth
            id='searchText'
            name='searchText'
            label='Строка поиска'
            type='search'
            value={searchText ?? ''}
            onChange={onChangeSearch}
          />
        </Grid>
        <Grid sx={{ width: matches ? 120 : '100%' }}>
          <MySelectAutoCompl
            selectName={`unit`}
            selectLabel={`Ед.изм`}
            fieldToShow={`unitName`}
            handleChangeSelects={handleChangeSelects}
            selectedOption={unit ?? ''}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            arrToSelect={arr__Units}
          />
        </Grid>
        <Grid sx={{ width: matches ? 200 : '100%' }}>
          <MySelectAutoCompl
            selectName={`productType`}
            selectLabel={`Тип товара`}
            fieldToShow={`productTypeName`}
            handleChangeSelects={handleChangeSelects}
            selectedOption={productType ?? ''}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            arrToSelect={arr__ProductTypes}
          />
        </Grid>

        <Grid sx={{ width: matches ? 200 : '100%' }}>
          <MySelectMultipleAutoCompl
            selectName={`productGroup`}
            selectLabel={`Группы товаров`}
            fieldToShow={`productGroupName`}
            handleChangeMultipleSelects={handleChangeSelects}
            selectedOptions={productGroup ?? []}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            arrToSelect={arr__ProductGroups}
          />
        </Grid>
        <Grid
          container
          alignItems='center'
          spacing={1}
          direction={`row`}
          sx={{ width: '100%' }}
          justifyContent={`space-between`}
        >
          <Grid>
            <Typography align='center'>{`Найдено:${resultFetch?.length}`}</Typography>
          </Grid>
          <Grid>
            <IconButton onClick={handleSearch}>
              <SearchIcon color='success' />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton onClick={handleRestart}>
              <RestartAltIcon color='error' />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>

      {!resultFetch || resultFetch?.length === 0 ? (
        <MySpinner />
      ) : (
        <Grid sx={{ width: '100%' }}>
          <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
            <Table
              stickyHeader
              sx={{
                width: '100%',
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={
                      headerFields.length ? headerFields.length : undefined
                    }
                    sx={{ textAlign: 'center' }}
                  >
                    {`${tableHeader} `}
                  </TableCell>
                  <TableCell colSpan={2}>{` Всего ${
                    countTotalItems ?? 0
                  }`}</TableCell>
                </TableRow>
                <TableRow>
                  {headerFields.length > 0 &&
                    headerFields.map((item) => (
                      <TableCell align='center' key={item}>
                        {item}
                      </TableCell>
                    ))}

                  <TableCell style={{ width: 25 }} align='center'>
                    edit
                  </TableCell>
                  <TableCell style={{ width: 25 }} align='center'>
                    delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultFetch.length > 0 &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  resultFetch.map((row: any) => (
                    <TableRow key={row._id}>
                      {tableFields.length > 0 &&
                        tableFields.map((item) => (
                          <TableCell align='center' key={item}>
                            {row[item]}
                          </TableCell>
                        ))}

                      <TableCell align='center'>
                        <IconButton
                          component={Link}
                          href={`${currentURL}/${row._id}`}
                        >
                          <EditIcon color='primary' />
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => deleteHanler(row._id)}>
                          <DeleteForeverIcon color='error' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
}
