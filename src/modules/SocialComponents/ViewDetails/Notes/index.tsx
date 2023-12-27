import Image from 'next/image';

import { Box, Button, Checkbox, Grid, Typography } from '@mui/material';

import NotesEditorDrawer from './NotesEditorDrawer';
import NotesActionDropdown from './NotesActionDropDown';

import useNotes from './useNotes';
import useNameWithStyledWords from '@/hooks/useNameStyledWords';

import { isNullOrEmpty } from '@/utils';

import { MessageIcon, PlusIcon } from '@/assets/icons';

import { styles } from '../ViewDetails.style';

import { v4 as uuidv4 } from 'uuid';
import { NotesAvatarImage } from '@/assets/images';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const Notes = ({ companyId }: any) => {
  const {
    openDrawer,
    setOpenDrawer,
    selectedCheckboxes,
    setSelectedCheckboxes,
    handleCheckboxChange,
    NotesData,
  } = useNotes(companyId);
  const { theme } = useNameWithStyledWords();

  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={styles?.headingSpacingBetween}>
            <Typography variant="h4"> Notes</Typography>
            {!isNullOrEmpty(NotesData?.data?.notes) && (
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
                  setSelectedCheckboxes={setSelectedCheckboxes}
                />
                <Button
                  variant="contained"
                  className="small"
                  onClick={() => setOpenDrawer('Add')}
                >
                  <PlusIcon /> Add Notes
                </Button>
              </Box>
            )}
          </Box>
          {isNullOrEmpty(NotesData?.data?.notes) && (
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
              <Button
                variant="contained"
                className="small"
                onClick={() => setOpenDrawer('Add')}
              >
                <PlusIcon /> Add Notes
              </Button>
            </Box>
          )}
        </Grid>

        {!isNullOrEmpty(NotesData?.data?.notes) && (
          <Grid item xs={12} sx={styles?.horizontalTabsInnnerBox}>
            {NotesData?.data?.notes?.map((item: any) => (
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
                    onChange={(event) => handleCheckboxChange(event, item?._id)}
                    checked={selectedCheckboxes?.some(
                      (selectedItem) => selectedItem?.id === item?._id,
                    )}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={2}
                  lg={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src={NotesAvatarImage}
                    width={70}
                    height={70}
                    alt="Avatar"
                  />
                </Grid>
                <Grid item xs={12} lg={9} sm={9} sx={{ gap: 1 }}>
                  <Typography
                    sx={{
                      color: theme?.palette?.primary?.main,
                      fontSize: '18px',
                    }}
                  >
                    Note
                    <span
                      style={{ color: 'black', textTransform: 'lowercase' }}
                    >
                      {' '}
                      Created by
                    </span>{' '}
                    {item?.user?.name}
                  </Typography>
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.custom?.main }}
                  >
                    {dayjs(item?.createdAt).format(DATE_FORMAT.UI)} -{' '}
                    {item?.createdAt?.split('T')[1]?.substring(0, 5)}
                  </Typography>
                  <Typography variant="body2">{item?.description}</Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>

      <NotesEditorDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        companyId={companyId}
      />
    </Box>
  );
};

export default Notes;
