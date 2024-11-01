import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import TanstackTable from '@/components/Table/TanstackTable';
import AttachmentsEditorDrawer from './AttachmentsEditorDrawer';
import useAttachments from './useAttachments';
import { columns } from './Attachments.data';
import { PlusIcon } from '@/assets/icons';
import { styles } from '../Associations.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SALES_DEALS_PERMISSIONS } from '@/constants/permission-keys';
import { AttachmentsProps } from '../Associations-interface';

const Attachments = ({ dealId }: AttachmentsProps) => {
  const {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    loadingDelete,
    deleteAttachmentHandler,
    attachmentsData,
    isLoading,
  } = useAttachments(dealId);

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
          {isLoading ? (
            <Skeleton variant="text" height={40} width={120} />
          ) : (
            <>
              <Typography sx={styles?.associationCount(theme)} variant="body3">
                {attachmentsData?.length < 10
                  ? `0${attachmentsData?.length}`
                  : attachmentsData?.length}
              </Typography>
              <Typography variant="h5">Attachments</Typography>
            </>
          )}
        </Grid>
        <Grid item md={8} xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Search
              setSearchBy={setSearchName}
              label="Search By Name"
              size="medium"
            />
            <PermissionsGuard
              permissions={[
                AIR_SALES_DEALS_PERMISSIONS?.DEAL_ADD_ASSOCIATE_ATTACHMENT,
              ]}
            >
              <Button
                variant="contained"
                className="medium"
                sx={{ minWidth: '0px', gap: 0.5 }}
                onClick={() =>
                  setOpenDrawer({ isToggle: true, type: 'Add', recData: {} })
                }
                startIcon={<PlusIcon />}
              >
                Add Attachments
              </Button>
            </PermissionsGuard>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({
              setOpenDrawer,
              setIsOpenAlert,
            })}
            data={attachmentsData}
          />
        </Grid>
      </Grid>
      {openDrawer?.isToggle && (
        <AttachmentsEditorDrawer
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          dealId={dealId}
        />
      )}
      {isOpenAlert && (
        <AlertModals
          message={"You're about to remove a record. Are you sure?"}
          type={'delete'}
          open={isOpenAlert}
          handleClose={handleCloseAlert}
          handleSubmitBtn={deleteAttachmentHandler}
          loading={loadingDelete}
        />
      )}
    </Box>
  );
};

export default Attachments;
