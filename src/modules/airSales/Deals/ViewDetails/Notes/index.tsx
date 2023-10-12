import React from 'react';

import Image from 'next/image';

import { Box, Button, Checkbox, Grid, Typography } from '@mui/material';

import NotesEditorDrawer from './NotesEditorDrawer';
import NotesActionDropdown from './NotesActionDropDown';

import { NotesDataArray } from '@/mock/modules/Deals';

import { isNullOrEmpty } from '@/utils';
import useNotes from './useNotes';
import useNameWithStyledWords from '@/hooks/useNameStyledWords';

import { MessageIcon, PlusSharedIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

const Notes = () => {
  const { openDrawer, setOpenDrawer } = useNotes();
  const { NameWithStyledWords, theme } = useNameWithStyledWords();

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 15px 25px 15px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4"> Notes</Typography>
            {!isNullOrEmpty(NotesDataArray) && (
              <Box sx={{ gap: 1, display: 'flex' }}>
                <NotesActionDropdown setOpenDrawer={setOpenDrawer} />
                <Button
                  variant="contained"
                  sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
                  onClick={() => setOpenDrawer('Add')}
                >
                  <PlusSharedIcon /> Add Notes
                </Button>
              </Box>
            )}
          </Box>
          {isNullOrEmpty(NotesDataArray) && (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <MessageIcon />
              <Typography variant="body3">
                There are no notes available{' '}
              </Typography>
              <Button variant="contained" sx={{ height: '35px' }}>
                <PlusSharedIcon /> Add Notes
              </Button>
            </Box>
          )}
        </Grid>

        <Grid item xs={12}>
          {!isNullOrEmpty(NotesDataArray) &&
            NotesDataArray.map((item) => (
              <Grid
                container
                key={uuidv4()}
                sx={{
                  py: 3,
                  px: 1.5,
                  boxShadow: 'box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
                  borderRadius: '8px',
                  border: '1px solid #f2f2f2',
                }}
              >
                <Grid
                  item
                  xs={2}
                  lg={0.5}
                  sm={1}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox color="primary" name={'name'} />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={2}
                  lg={1}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image src={item.image} alt="Avatar" />
                </Grid>
                <Grid item xs={12} lg={10} sm={9} sx={{ gap: 1 }}>
                  <NameWithStyledWords
                    name={item.title}
                    customKey="ActivityHead"
                  />
                  <Typography
                    variant="body3"
                    sx={{ color: theme.palette.custom.main }}
                  >
                    {item.date}
                  </Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>

      <NotesEditorDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Box>
  );
};

export default Notes;
