import Image from 'next/image';

import { Box, Button, Checkbox, Grid, Typography } from '@mui/material';

import useNameWithStyledWords from '@/hooks/useNameStyledWords';

import NotesActionDropdown from './NotesActionDropDown';

import useNotes from './useNotes';

import { isNullOrEmpty } from '@/utils';

import { styles } from '../ViewDetails.style';

import { MessageIcon, PlusSharedIcon } from '@/assets/icons';

import AddNote from './AddNote';
import { IMG_URL } from '@/config';
import dayjs from 'dayjs';
import ViewNote from './ViewNote';
import EditNote from './EditNote';
import { AlertModals } from '@/components/AlertModals';

const Notes = ({ contactId }: any) => {
  const {
    anchorEl,
    isMenuOpen,
    handleOpenMenu,
    handleCloseMenu,
    methodsAddNote,
    handleAddNoteSubmit,
    openDrawerAddNote,
    handleOpenDrawerAddNote,
    handleCloseDrawerAddNote,
    loadingAddNote,
    dataGetNotes,
    selectedCheckboxes,
    handleCheckboxChange,
    openDrawerViewNote,
    handleOpenDrawerViewNote,
    handleCloseDrawerViewNote,
    methodsViewNote,
    openDrawerEditNote,
    handleOpenDrawerEditNote,
    handleCloseDrawerEditNote,
    methodsEditNote,
    loadingEditNote,
    handleEditNoteSubmit,
    isDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteSubmit,
    loadingDelete,
  } = useNotes();

  const { theme } = useNameWithStyledWords();

  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={styles?.headingSpacingBetween}>
            <Typography variant="h4"> Notes</Typography>
            {!isNullOrEmpty(dataGetNotes?.data?.contactnotes) && (
              <Box
                sx={{
                  gap: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                }}
              >
                <NotesActionDropdown
                  anchorEl={anchorEl}
                  isMenuOpen={isMenuOpen}
                  handleOpenMenu={handleOpenMenu}
                  handleCloseMenu={handleCloseMenu}
                  selectedCheckboxes={selectedCheckboxes}
                  openViewDrawer={handleOpenDrawerViewNote}
                  openEditDrawer={handleOpenDrawerEditNote}
                  openDeleteAlert={handleOpenModalDelete}
                />
                <Button
                  variant="contained"
                  className="small"
                  onClick={handleOpenDrawerAddNote}
                >
                  <PlusSharedIcon /> Add Notes
                </Button>
              </Box>
            )}
          </Box>
          {isNullOrEmpty(dataGetNotes?.data?.contactnotes) && (
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

        {!isNullOrEmpty(dataGetNotes?.data?.contactnotes) && (
          <Grid item xs={12} sx={styles?.horizontalTabsInnnerBox}>
            {dataGetNotes?.data?.contactnotes?.map((note: any) => (
              <Grid
                container
                key={note?._id}
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
                    onChange={(event) => handleCheckboxChange(event, note)}
                    checked={selectedCheckboxes?.some(
                      (selectedItem: any) => selectedItem?._id === note?._id,
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
                  <Image
                    src={`${IMG_URL}${note?.attachment?.url}`}
                    alt="Avatar"
                    width={66}
                    height={66}
                  />
                </Grid>
                <Grid item xs={12} lg={10} sm={9} sx={{ gap: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: 'primary.main',
                      fontWeight: '500',
                    }}
                  >
                    {note?.title}{' '}
                    <Box
                      component={'span'}
                      sx={{ color: (theme: any) => theme?.palette?.grey[800] }}
                    >
                      Created by
                    </Box>{' '}
                    {note?.updatedBy}
                  </Typography>

                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.custom?.main }}
                  >
                    {dayjs(note?.createdAt).format('D MMMM, YYYY - h:mm A')}
                  </Typography>
                  <Typography variant="body2">
                    <Box
                      dangerouslySetInnerHTML={{ __html: note?.description }}
                    />
                  </Typography>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>

      <AddNote
        isDrawerOpen={openDrawerAddNote}
        onClose={handleCloseDrawerAddNote}
        methods={methodsAddNote}
        onSubmit={handleAddNoteSubmit(contactId)}
        isLoading={loadingAddNote}
      />

      <ViewNote
        isDrawerOpen={openDrawerViewNote}
        onClose={handleCloseDrawerViewNote}
        methods={methodsViewNote}
        isLoading={loadingAddNote}
      />

      <EditNote
        isDrawerOpen={openDrawerEditNote}
        onClose={handleCloseDrawerEditNote}
        methods={methodsEditNote}
        isLoading={loadingEditNote}
        onSubmit={handleEditNoteSubmit(contactId)}
      />

      <AlertModals
        message={
          "You're about to delete a record. Deleted records can't be restored after 90 days."
        }
        type={'delete'}
        open={isDeleteModal}
        handleClose={handleCloseModalDelete}
        handleSubmitBtn={handleDeleteSubmit}
        isLoading={loadingDelete}
      />
    </Box>
  );
};

export default Notes;
