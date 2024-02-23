import { ViewDetailSharedIcon } from '@/assets/icons';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import { useAnnouncementHeader } from './useAnnouncementHeader';
import AddAnnouncement from '../AddAnnouncement';

export const AnnouncementHeader = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    methods,
    handleSubmit,
    submit,
    handleClose,
    theme,
    handleIconButton
  } = useAnnouncementHeader();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
        px={2}
        mb={1}
      >
        <Typography variant="h5" mb={2}>
          Announcements
        </Typography>
        <IconButton onClick={handleIconButton} sx={{ mb: 1 }}>
          <ViewDetailSharedIcon />
        </IconButton>
      </Box>
      <Divider
        sx={{ border: `0.063rem solid ${theme?.palette?.grey?.[700]}` }}
      />{' '}
      <AddAnnouncement
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        title={'New Announcements'}
        okText={'Announce'}
        submit={()=> handleSubmit(submit)()}
        methods={methods}
        handleClose={handleClose}
      />
    </>
  );
};
