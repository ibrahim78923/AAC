import { Box, Button, Grid, Typography } from '@mui/material';

import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import TanstackTable from '@/components/Table/TanstackTable';

import AttachmentsEditorDrawer from './AttachmentsEditorDrawer';

import useAttachments from './useAttachments';

import { columns } from './Attachments.data';
import { attachmentData } from '@/mock/modules/airSales/Deals/ViewDetails';

import { styles } from '../Associations.style';

import { PlusSharedIcon } from '@/assets/icons';

const Attachments = ({ contactId }: any) => {
  const {
    theme,
    searchValue,
    setSearchValue,
    drawerTitle,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    methodsAttachments,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
  } = useAttachments(contactId);
  const tableColumns = columns(handleOpenDrawer, handleOpenAlert);

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 0px 0px 0px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={4} sx={styles?.countBox}>
          <Typography sx={styles?.associationCount(theme)} variant="body3">
            02
          </Typography>

          <Typography variant="subtitle2">Attachments</Typography>
        </Grid>
        <Grid item md={8}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Search
              searchBy={searchValue}
              setSearchBy={setSearchValue}
              label="Search By Name"
              size="small"
            />
            <Button
              variant="contained"
              className="small"
              sx={{ minWidth: '0px', gap: 0.5 }}
              onClick={() => handleOpenDrawer('Add', {})}
            >
              <PlusSharedIcon /> Add Attachments
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable columns={tableColumns} data={attachmentData} />
        </Grid>
      </Grid>
      <AttachmentsEditorDrawer
        title={drawerTitle}
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
        methods={methodsAttachments}
      />
      <AlertModals
        message={"You're about to remove a record. Are you Sure?"}
        type={'delete'}
        open={isOpenAlert}
        handleClose={handleCloseAlert}
        handleSubmit={() => {}}
      />
    </Box>
  );
};

export default Attachments;
