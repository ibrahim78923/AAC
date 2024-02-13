import { Button, Grid, Typography } from '@mui/material';
import Folders from './Folders';
import { PlusIcon } from '@/assets/icons';
import CommonModal from '@/components/CommonModal';
import useEmailFolder from './useEmailFolder.';
import { FormProvider } from '@/components/ReactHookForm';
import { createFolderFormFields } from './EmailFolder.data';

const EmailFolder = () => {
  const {
    openModalCreateFolder,
    handleOpenModalCreateFolder,
    handleCloseModalCreateFolder,
    methodsCreateFolder,
    handleCreateFolderSubmit,
  } = useEmailFolder();
  return (
    <>
      <Grid container sx={{ px: 1 }}>
        <Grid item lg={6}>
          <Typography variant="h4">All Emails</Typography>
        </Grid>
        <Grid item lg={6} sx={{ textAlign: 'end' }}>
          <Button
            variant="contained"
            className="small"
            startIcon={<PlusIcon />}
            onClick={handleOpenModalCreateFolder}
          >
            Create New Folder
          </Button>
        </Grid>
      </Grid>
      <Folders />

      <CommonModal
        open={openModalCreateFolder}
        handleClose={handleCloseModalCreateFolder}
        handleCancel={handleCloseModalCreateFolder}
        handleSubmit={handleCreateFolderSubmit}
        title={'Create a new folder'}
        okText="Save"
        cancelText="Cancel"
        footer={true}
        // isLoading={isLoading}
      >
        <>
          <FormProvider methods={methodsCreateFolder}>
            <Grid container spacing={4}>
              {createFolderFormFields?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </>
      </CommonModal>
    </>
  );
};
export default EmailFolder;
