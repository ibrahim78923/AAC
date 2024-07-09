import { Button, Grid, Stack, Typography } from '@mui/material';
import Folders from './Folders';
import { PlusIcon } from '@/assets/icons';
import CommonModal from '@/components/CommonModal';
import useEmailFolder from './useEmailFolder.';
import { FormProvider } from '@/components/ReactHookForm';
import { createFolderFormFields } from './EmailFolder.data';
import { AIR_MARKETER_EMAIL_MARKETING_EMAIL_FOLDERS_PERMISSIONS } from '@/constants/permission-keys';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';

const EmailFolder = () => {
  const {
    openModalCreateFolder,
    handleOpenModalCreateFolder,
    handleCloseModalCreateFolder,
    methodsCreateFolder,
    handleCreateFolderSubmit,
    allFolder,
    allSelectedFoldersIds,
    setAllSelectedFoldersIds,
    searchValue,
    setSearchValue,
    isLoading,
    isLoadingPost,
  } = useEmailFolder();
  return (
    <>
      <Stack direction={{ sm: 'row' }} justifyContent="space-between" px={1.5}>
        <Typography variant="h4">All Emails</Typography>
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_EMAIL_MARKETING_EMAIL_FOLDERS_PERMISSIONS.CREATE_NEW_FOLDER,
          ]}
        >
          <Button
            variant="contained"
            className="small"
            startIcon={<PlusIcon />}
            onClick={handleOpenModalCreateFolder}
          >
            Create New Folder
          </Button>
        </PermissionsGuard>
      </Stack>

      <Folders
        allFolder={allFolder}
        allSelectedFoldersIds={allSelectedFoldersIds}
        setAllSelectedFoldersIds={setAllSelectedFoldersIds}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isLoading={isLoading}
      />

      <CommonModal
        open={openModalCreateFolder}
        handleClose={handleCloseModalCreateFolder}
        handleCancel={handleCloseModalCreateFolder}
        handleSubmit={handleCreateFolderSubmit}
        title={'Create a new folder'}
        okText="Save"
        cancelText="Cancel"
        footer={true}
        isLoading={isLoadingPost}
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
