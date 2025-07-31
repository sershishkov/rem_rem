'use client';

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

import {
  item__get_one,
  item__edit,
  item__add,
} from '@/lib/actions/refdata.actions';

import {
  I_ContractTempate,
  I_ContractTempateChapter,
} from '@/interfaces/refdata';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const currentURL = '/manager/templates/contracts';
const initState = {
  templateContractName: '',
  templateContractDescription: '',
  contractPreambule: '',
};

export default function TemplContractAddEdit({
  id,
  mode,
  title,
}: Readonly<{ id?: string; mode: string; title: string }>) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const route = useRouter();

  const [formData, setFormData] = useState(initState);
  const [localContractBody, setLocalContractBody] = useState<
    I_ContractTempateChapter[]
  >([]);

  const {
    templateContractName,
    templateContractDescription,
    contractPreambule,
  } = formData;

  useEffect(() => {
    const inputFocus = document.getElementById(
      'templateContractName'
    ) as HTMLInputElement;
    inputFocus?.focus();
  }, []);

  useLayoutEffect(() => {
    if (id) {
      const myGetOne = async () => {
        const item: I_ContractTempate = await item__get_one(
          { _id: id },
          currentURL
        );
        if (item) {
          setFormData({
            templateContractName: item.templateContractName || '',
            templateContractDescription: item.templateContractDescription || '',
            contractPreambule: item.contractPreambule || '',
          });
          setLocalContractBody(item.contractBody || []);
        }
      };
      myGetOne();
    }
  }, [id]);

  const addChapter = () => {
    const newChapter = {
      chapter_id: uuidv4(),
      chapterTitle: '',
      chapterPoints: [],
    };

    setLocalContractBody([...localContractBody, newChapter]);
  };

  const addPoint = (chapterID: string) => {
    const newPoint = {
      point_id: uuidv4(),
      pointTitle: '',
      pointSubpoints: [],
    };

    const updatedChapters = localContractBody.map((chapter) => {
      if (chapter.chapter_id === chapterID) {
        chapter.chapterPoints = [...chapter.chapterPoints, newPoint];
      }
      return chapter;
    });

    setLocalContractBody([...updatedChapters]);
  };

  const addSubPoint = (chapterID: string, pointID: string) => {
    const newSubPoint = {
      sub_point_id: uuidv4(),
      sub_pointTitle: '',
    };

    const updatedChapters = localContractBody.map((chapter) => {
      if (chapter.chapter_id === chapterID) {
        const updatedPoints = chapter.chapterPoints.map((point) => {
          if (point.point_id === pointID) {
            return {
              ...point,
              pointSubpoints: [...(point.pointSubpoints ?? []), newSubPoint],
            };
          }
          return point;
        });
        return {
          ...chapter,
          chapterPoints: updatedPoints,
        };
      }
      return chapter;
    });

    setLocalContractBody([...updatedChapters]);
  };

  const removeChapter = (chapterID: string) => {
    const updatedChapters = localContractBody.filter(
      (chapter) => chapter.chapter_id !== chapterID
    );
    setLocalContractBody(updatedChapters);
  };

  const removePoint = (chapterID: string, pointID: string) => {
    const updatedChapters = localContractBody.map((chapter) => {
      if (chapter.chapter_id === chapterID) {
        const updatedPoints = chapter.chapterPoints.filter(
          (point) => point.point_id !== pointID
        );
        return {
          ...chapter,
          chapterPoints: updatedPoints,
        };
      }
      return chapter;
    });

    setLocalContractBody(updatedChapters);
  };

  const removeSubPoint = (
    chapterID: string,
    pointID: string,
    subPointID: string
  ) => {
    const updatedChapters = localContractBody.map((chapter) => {
      if (chapter.chapter_id === chapterID) {
        const updatedPoints = chapter.chapterPoints.map((point) => {
          if (point.point_id === pointID) {
            const updatedSubpoints = (point.pointSubpoints ?? []).filter(
              (subPoint) => subPoint.sub_point_id !== subPointID
            );
            return {
              ...point,
              pointSubpoints: updatedSubpoints,
            };
          }
          return point;
        });
        return {
          ...chapter,
          chapterPoints: updatedPoints,
        };
      }
      return chapter;
    });

    setLocalContractBody(updatedChapters);
  };

  const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: targetName, value: targetValue } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const handleChangeChapter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id: targetID, value: targetValue } = e.target;
    const updatedChapters = localContractBody.map((chapter) => {
      if (chapter.chapter_id === targetID) {
        chapter.chapterTitle = targetValue;
      }
      return chapter;
    });

    setLocalContractBody(updatedChapters);
  };

  const handleChangePoint = (
    chapterID: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id: targetID, value: targetValue } = e.target;
    const updatedChapters = localContractBody.map((chapter) => {
      if (chapter.chapter_id === chapterID) {
        const updatedPoints = chapter.chapterPoints.map((point) => {
          if (point.point_id === targetID) {
            point.pointTitle = targetValue;
          }
          return point;
        });
        return {
          ...chapter,
          chapterPoints: updatedPoints,
        };
      }
      return chapter;
    });

    setLocalContractBody(updatedChapters);
  };

  const handleChangeSubPoint = (
    chapterID: string,
    pointID: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id: targetID, value: targetValue } = e.target;
    const updatedChapters = localContractBody.map((chapter) => {
      if (chapter.chapter_id === chapterID) {
        const updatedPoints = chapter.chapterPoints.map((point) => {
          if (point.point_id === pointID) {
            const updatedSubpoints = (point.pointSubpoints ?? []).map(
              (subPoint) => {
                if (subPoint.sub_point_id === targetID) {
                  subPoint.sub_pointTitle = targetValue;
                }
                return subPoint;
              }
            );
            return {
              ...point,
              pointSubpoints: updatedSubpoints,
            };
          }
          return point;
        });
        return {
          ...chapter,
          chapterPoints: updatedPoints,
        };
      }
      return chapter;
    });

    setLocalContractBody(updatedChapters);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const created__Data = {
      templateContractName,
      templateContractDescription,
      contractPreambule,
      contractBody: localContractBody,
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

  return (
    <Grid
      component='form'
      onSubmit={onSubmit}
      container
      direction='column'
      sx={{
        // border: '1px solid yellow',
        padding: matches ? '0 2rem' : '0 0.5rem',
        // maxWidth: '500px',
        margin: '0 auto',
        width: '95%',
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
          name='templateContractName'
          label='Название шаблона контракта'
          type='text'
          id='templateContractName'
          value={templateContractName ?? ''}
          onChange={handleChangeFormData}
        />
      </Grid>

      <Grid>
        <TextField
          margin='normal'
          required
          fullWidth
          name='templateContractDescription'
          label='Описание шаблона контракта'
          type='text'
          id='templateContractDescription'
          value={templateContractDescription ?? ''}
          onChange={handleChangeFormData}
        />
      </Grid>
      <Grid>
        <TextField
          margin='normal'
          required
          fullWidth
          multiline
          rows={4}
          name='contractPreambule'
          label='Преамбула контракта'
          type='text'
          id='contractPreambule'
          value={contractPreambule ?? ''}
          onChange={handleChangeFormData}
        />
      </Grid>

      <Grid>
        {localContractBody.length > 0 &&
          localContractBody.map((chapter) => (
            <Grid
              key={chapter.chapter_id}
              sx={{
                border: '1px solid #ccc',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <TextField
                id={chapter.chapter_id}
                name={chapter.chapter_id}
                label='Название главы'
                value={chapter.chapterTitle}
                onChange={handleChangeChapter}
                fullWidth
                sx={{ input: { textAlign: 'center' } }}
              />
              {chapter.chapterPoints.length > 0 &&
                chapter.chapterPoints.map((point) => (
                  <Grid key={point.point_id} sx={{ marginTop: '1rem' }}>
                    <Grid container spacing={2}>
                      <Grid flex={1}>
                        <TextField
                          multiline
                          rows={4}
                          id={point.point_id}
                          label='Название пункта'
                          value={point.pointTitle}
                          onChange={(e) =>
                            handleChangePoint(chapter.chapter_id, e)
                          }
                          fullWidth
                        />
                      </Grid>
                      <Grid container direction={'column'} spacing={2}>
                        <Button
                          variant='outlined'
                          color='error'
                          onClick={() =>
                            removePoint(chapter.chapter_id, point.point_id)
                          }
                        >
                          Удалить пункт
                        </Button>
                      </Grid>
                    </Grid>

                    {(point.pointSubpoints ?? []).length > 0 &&
                      (point.pointSubpoints ?? []).map((subPoint) => (
                        <Grid
                          key={subPoint.sub_point_id}
                          sx={{ marginTop: '0.5rem' }}
                        >
                          <Grid container spacing={2}>
                            <Grid flex={1} pl={5}>
                              <TextField
                                id={subPoint.sub_point_id}
                                label='Название подпункта'
                                value={subPoint.sub_pointTitle}
                                onChange={(e) =>
                                  handleChangeSubPoint(
                                    chapter.chapter_id,
                                    point.point_id,
                                    e
                                  )
                                }
                                fullWidth
                                multiline
                                rows={4}
                              />
                            </Grid>
                            <Grid container direction={'column'} spacing={2}>
                              <Button
                                variant='outlined'
                                color='error'
                                onClick={() =>
                                  removeSubPoint(
                                    chapter.chapter_id,
                                    point.point_id,
                                    subPoint.sub_point_id
                                  )
                                }
                              >
                                Удалить подпункт
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    <Grid
                      mt={2}
                      container
                      spacing={2}
                      alignItems='center'
                      justifyContent='center'
                    >
                      <Button
                        variant='outlined'
                        onClick={() =>
                          addSubPoint(chapter.chapter_id, point.point_id)
                        }
                      >
                        Добавить подпункт
                      </Button>
                    </Grid>
                  </Grid>
                ))}
              <Grid
                mt={2}
                container
                spacing={2}
                alignItems='center'
                justifyContent='space-between'
              >
                <Button
                  variant='outlined'
                  onClick={() => addPoint(chapter.chapter_id)}
                >
                  Добавить пункт
                </Button>

                <Button
                  variant='outlined'
                  color='error'
                  onClick={() => removeChapter(chapter.chapter_id)}
                >
                  Удалить главу
                </Button>
              </Grid>
            </Grid>
          ))}
      </Grid>
      <Button variant='outlined' onClick={addChapter} sx={{ mt: 2, mb: 2 }}>
        Добавить главу
      </Button>

      <Grid>
        <Button
          type='submit'
          fullWidth
          disabled={templateContractName.length === 0}
          variant='contained'
          sx={{ mt: 3, mb: 5 }}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
}
