import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import TanstackTable from '@/components/Table/TanstackTable';
import AttachmentsEditorDrawer from './AttachmentsEditorDrawer';
import useAttachments from './useAttachments';
import { columns } from './Attachments.data';
import { styles } from '../Associations.style';
import { PlusIcon } from '@/assets/icons';

const Attachments = ({ contactId }: any) => {
  const {
    theme,
    setSearchValue,
    dataGetAttachment,
    loadingGetAttachment,
    drawerTitle,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    methodsAttachments,
    handleAddAttachmentSubmit,
    loadingAddAttachment,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
    handleDeleteAttachment,
    loadingDelete,
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
        {loadingGetAttachment && (
          <Grid item xs={12} sx={styles?.countBox}>
            <Skeleton animation="wave" width="100%" height={60} />
          </Grid>
        )}
        {!loadingGetAttachment && (
          <>
            <Grid item md={4} sx={styles?.countBox}>
              <Typography sx={styles?.associationCount(theme)} variant="body3">
                {dataGetAttachment?.data?.attachments?.length < 10
                  ? `0${dataGetAttachment?.data?.attachments?.length}`
                  : dataGetAttachment?.data?.attachments?.length}
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
                  <PlusIcon /> Add Attachments
                </Button>
              </Box>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <TanstackTable
            columns={tableColumns}
            data={dataGetAttachment?.data?.attachments}
            isLoading={loadingGetAttachment}
          />
        </Grid>
      </Grid>

      <AttachmentsEditorDrawer
        title={drawerTitle}
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
        methods={methodsAttachments}
        handleSubmit={handleAddAttachmentSubmit}
        loading={loadingAddAttachment}
      />

      <AlertModals
        message={"You're about to remove a record. Are you Sure?"}
        type={'delete'}
        open={isOpenAlert}
        handleClose={handleCloseAlert}
        handleSubmitBtn={handleDeleteAttachment}
        loading={loadingDelete}
      />
    </Box>
  );
};

export default Attachments;
