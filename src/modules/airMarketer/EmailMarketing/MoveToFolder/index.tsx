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
import { v4 as uuidv4 } from 'uuid';
import CommonModal from '@/components/CommonModal';
import { ArrowAlertPopupIcon } from '@/assets/icons';

const MoveToFolder = ({
  openMoveToFolderModal,
  handleCloseMoveToFolderModal,
}: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchemaMoveToFolder),
    defaultValues: defaultValuesMoveToFolder,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    handleCloseMoveToFolderModal();
    enqueueSnackbar('Move To Folder Added Successfully', {
      variant: 'success',
    });
  };

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
              {dataArrayMoveToFolder?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
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
              <Button variant="contained" type="submit" onClick={handleSubmit}>
                Save
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </CommonModal>
    </div>
  );
};
export default MoveToFolder;
