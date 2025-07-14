'use client';
import React, { useState, useEffect } from 'react';

import { get__all, delete__one } from '@/lib/actions/refdata.actions';

import Link from '@mui/material/Link';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';

import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MySpinner from '@/components/common/MySpinner';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function TableSimple({
  headerFields,
  tableFields,
  currentURL,
  tableHeader,
}: {
  readonly headerFields: string[];
  readonly tableFields: string[];
  readonly currentURL: string;
  readonly tableHeader: string;
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [searchText, setSearchText] = useState('');
  const [resultFetch, setResultFetch] = useState({
    items: [],
    total: '',
    totalPages: '',
  });

  const deleteHanler = async (_id: string) => {
    await delete__one(_id, currentURL);
    setResultFetch(
      await get__all({ page: '0', limit: '0', filter: '' }, currentURL)
    );

    setSearchText('');
  };

  const onChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    const filtered_items = await get__all(
      { page: '0', limit: '0', filter: e.target.value },
      currentURL
    );

    setTimeout(() => {
      setResultFetch(filtered_items);
    }, 2000);
  };

  useEffect(() => {
    const myGetAll = async () => {
      const myItems = await get__all(
        { page: '0', limit: '0', filter: '' },
        currentURL
      );
      setResultFetch(myItems);
    };
    myGetAll();
  }, [currentURL]);

  useEffect(() => {
    setSearchText('');
    const searchInput = document.getElementById('searchText');
    searchInput?.focus();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMyItem = (row: any, item: string) => {
    let innerProp;
    if (item.includes('.')) {
      const arrFields = item.split('.');

      if (row[arrFields[0]] !== null) {
        if (arrFields.length === 2) {
          innerProp = row[arrFields[0]][arrFields[1]];
        } else if (arrFields.length === 3) {
          innerProp = row[arrFields[0]][arrFields[1]][arrFields[2]];
        } else if (arrFields.length === 4) {
          innerProp =
            row[arrFields[0]][arrFields[1]][arrFields[2]][arrFields[3]];
        }
      } else {
        innerProp = 'NULL';
      }
      return `${innerProp}`;
    } else {
      return `${row[item]}`;
    }
  };

  return (
    <Grid
      container
      alignItems='center'
      direction='column'
      sx={{
        // border: '1px solid yellow',
        padding: matches ? '0 5rem' : undefined,
        width: '100%',
      }}
    >
      <Grid
        container
        alignItems='center'
        justifyContent='space-between'
        direction={matches ? 'row' : 'column'}
        sx={{
          // border: '1px solid blue',
          width: '100%',
          marginTop: matches ? undefined : '3rem',
        }}
      >
        <Grid size={matches ? 9 : 12}>
          <TextField
            margin='normal'
            focused
            fullWidth
            id='searchText'
            name='searchText'
            label='searchText'
            type='search'
            value={searchText}
            onChange={onChangeSearch}
          />
        </Grid>
        <Grid size={matches ? 3 : 12}>
          <Typography align='center'>{`Найдено:${resultFetch.items?.length}`}</Typography>
        </Grid>
      </Grid>

      {!resultFetch?.items || resultFetch?.items.length === 0 ? (
        <MySpinner />
      ) : (
        <Grid sx={{ width: '100%' }}>
          <TableContainer
            component={Paper}
            sx={{ height: '750px', width: '100%' }}
          >
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
                  <TableCell
                    colSpan={2}
                  >{` Всего ${resultFetch.total}`}</TableCell>
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
                {resultFetch.items.length > 0 &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  resultFetch.items.map((row: any) => (
                    <TableRow key={row._id}>
                      {tableFields.length > 0 &&
                        tableFields.map((item) => (
                          <TableCell
                            align='center'
                            key={item}
                            sx={{
                              color:
                                row.hasOwnProperty('isActive') &&
                                row.isActive === false
                                  ? 'red'
                                  : undefined,
                            }}
                          >
                            {getMyItem(row, item)}
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
              <TableFooter></TableFooter>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
}

export default TableSimple;
