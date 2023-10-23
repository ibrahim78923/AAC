import React from 'react';

import Image from 'next/image';

import { Box, Button, Checkbox, Grid, Typography } from '@mui/material';

import NotesEditorDrawer from './NotesEditorDrawer';
import NotesActionDropdown from './NotesActionDropDown';

import useNotes from './useNotes';
import useNameWithStyledWords from '@/hooks/useNameStyledWords';

import { isNullOrEmpty } from '@/utils';

import { NotesDataArray } from '@/mock/modules/airSales/Deals/ViewDetails';

import { MessageIcon, PlusSharedIcon } from '@/assets/icons';

import { styles } from '../ViewDetails.style';

import { v4 as uuidv4 } from 'uuid';

const Notes = () => {
  const {
    openDrawer,
    setOpenDrawer,
    selectedCheckboxes,
    handleCheckboxChange,
  } = useNotes();
  const { NameWithStyledWords, theme } = useNameWithStyledWords();

  return (
    <Box sx={styles.horizontalTabsBox}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={styles.headingSpacingBetween}>
            <Typography variant="h4"> Notes</Typography>
            {!isNullOrEmpty(NotesDataArray) && (
              <Box
                sx={{
                  gap: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                }}
              >
                <NotesActionDropdown
                  setOpenDrawer={setOpenDrawer}
                  selectedCheckboxes={selectedCheckboxes}
                />
                <Button
                  variant="contained"
                  className="small"
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
                height: '35vh',
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

        {!isNullOrEmpty(NotesDataArray) && (
          <Grid item xs={12} sx={styles.horizontalTabsInnnerBox}>
            {NotesDataArray.map((item) => (
              <Grid
                container
                key={uuidv4()}
                sx={{
                  py: 3,
                  px: 1.5,
                  mb: 1,
                  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
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
                  <Checkbox
                    color="primary"
                    name={'name'}
                    onChange={(event) => handleCheckboxChange(event, item.id)}
                    checked={selectedCheckboxes.some(
                      (selectedItem) => selectedItem.id === item.id,
                    )}
                  />
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
        )}
      </Grid>

      <NotesEditorDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Box>
  );
};

export default Notes;
