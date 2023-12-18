import * as React from 'react';

import { Grid, Box, Button } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import { enqueueSnackbar } from 'notistack';
import {
  dataArrayRename,
  defaultValuesFeatures,
  validationSchemaFeatures,
} from './RenameModal.data';
import { styles } from './RenameModal.style';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import CommonModal from '@/components/CommonModal';

const RenameModal = ({ isAllViewActionsModal, handleCloseModal }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchemaFeatures),
    defaultValues: defaultValuesFeatures,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    handleCloseModal;
    enqueueSnackbar('Rename Successfully', {
      variant: 'success',
    });
  };

  return (
    <div>
      <CommonModal
        open={isAllViewActionsModal}
        handleClose={handleCloseModal}
        handleCancel={handleCloseModal}
        handleSubmit={handleCloseModal}
        title="Rename"
      >
        <Box sx={{ margin: '20px 0' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              {dataArrayRename?.map((item: any) => (
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
export default RenameModal;
