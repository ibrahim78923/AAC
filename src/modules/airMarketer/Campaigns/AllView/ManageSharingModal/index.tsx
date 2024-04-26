import * as React from 'react';

import { Grid, Box, Button, Typography, useTheme } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import { enqueueSnackbar } from 'notistack';
import {
  dataArrayManageSharing,
  defaultValuesManageSharing,
  validationSchemaManageSharing,
} from './ManageSharingModal.data';
import { styles } from './ManageSharingModal.style';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import CommonModal from '@/components/CommonModal';
// import useManageSharingModal from './useManageSharingModal';

const ManageSharingModal = ({
  isAllViewActionsModal,
  handleCloseModal,
  setIsAllViewActionsModal,
}: any) => {
  // const { accessValue, handleChangeAccessValue } = useManageSharingModal();
  const methods: any = useForm({
    resolver: yupResolver(validationSchemaManageSharing),
    defaultValues: defaultValuesManageSharing,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    handleCloseModal;
    enqueueSnackbar('Manage Sharing Successfully', {
      variant: 'success',
    });
  };
  const theme = useTheme();
  const closeManageSharingModal = (key: any) => {
    setIsAllViewActionsModal({
      ...isAllViewActionsModal,
      [key]: false,
    });
  };
  return (
    <div>
      <CommonModal
        open={isAllViewActionsModal}
        handleClose={() => closeManageSharingModal('isManage')}
        handleCancel={() => closeManageSharingModal('isManage')}
        handleSubmit={() => closeManageSharingModal('isManage')}
        title="Create a new saved view"
      >
        <Box sx={{ margin: '20px 0' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={1}>
              {dataArrayManageSharing()?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  {item?.componentProps?.heading && (
                    <Typography variant="h5">
                      {item?.componentProps?.heading}
                      <Typography
                        component="span"
                        sx={{ color: theme?.palette?.error?.main }}
                      >
                        *
                      </Typography>
                    </Typography>
                  )}
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
              <Button variant="outlined">Cancel</Button>
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
export default ManageSharingModal;
