import * as React from 'react';

import { Grid, Box, Button } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { enqueueSnackbar } from 'notistack';
import {
  dataArrayMoveToFolder,
  defaultValuesMoveToFolder,
  validationSchemaMoveToFolder,
} from './MoveToFolder.data';
import { styles } from './MoveToFolder.style';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import CommonModal from '@/components/CommonModal';
import { ArrowAlertPopupIcon } from '@/assets/icons';
import { useLazyGetEmailFoldersQuery } from '@/services/airMarketer/emailMarketing';
import { useUpdateEmailTemplatesMutation } from '@/services/airMarketer/emailTemplates';
import { LoadingButton } from '@mui/lab';

const MoveToFolder = ({
  handleReset,
  selectedRecords,
  openMoveToFolderModal,
  handleCloseMoveToFolderModal,
}: any) => {
  const [updateEmailTemplate, { isLoading: loadingUpdateEmailTemplate }] =
    useUpdateEmailTemplatesMutation();

  const methods: any = useForm({
    resolver: yupResolver(validationSchemaMoveToFolder),
    defaultValues: defaultValuesMoveToFolder,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    try {
      await updateEmailTemplate({
        id: selectedRecords?._id,
        body: {
          folderId: values?.chooseFolder?._id,
        },
      })?.unwrap();
      handleReset();
      handleCloseMoveToFolderModal();
      enqueueSnackbar('Move To Folder Added Successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('Something went wrong !', { variant: 'error' });
    }
  };

  const apiQueryFolders = useLazyGetEmailFoldersQuery();

  return (
    <div>
      <CommonModal
        open={openMoveToFolderModal}
        handleClose={handleCloseMoveToFolderModal}
        handleCancel={handleCloseMoveToFolderModal}
        handleSubmit={handleCloseMoveToFolderModal}
        title="Move to folder"
        headerIcon={<ArrowAlertPopupIcon />}
      >
        <Box sx={{ margin: '20px 0' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              {/* eslint-disable */}
              {dataArrayMoveToFolder(apiQueryFolders)?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={item?.componentProps?.name}
                >
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any, index: any) => (
                        <option key={index} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
            <Box sx={styles?.buttonBox} mt={2}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleCloseMoveToFolderModal}
              >
                Cancel
              </Button>
              <LoadingButton
                variant="contained"
                type="submit"
                onClick={handleSubmit}
                loading={loadingUpdateEmailTemplate}
              >
                Save
              </LoadingButton>
            </Box>
          </FormProvider>
        </Box>
      </CommonModal>
    </div>
  );
};
export default MoveToFolder;
