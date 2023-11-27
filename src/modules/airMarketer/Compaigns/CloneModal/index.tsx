import * as React from 'react';

import { Grid, Box, Button, Typography, Modal, useTheme } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import { enqueueSnackbar } from 'notistack';
import {
  dataArrayFeatures,
  defaultValuesFeatures,
  validationSchemaFeatures,
} from './CloneModal.data';
import { styles } from './CloneModal.style';

import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@/assets/icons/shared/close-icon';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const CloneModal = ({ openCloneModal, handleCloseFeaturesModal }: any) => {
  const theme = useTheme();
  const methods: any = useForm({
    resolver: yupResolver(validationSchemaFeatures),
    defaultValues: defaultValuesFeatures,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {
    handleCloseFeaturesModal();
    enqueueSnackbar('Clone Successfully', {
      variant: 'success',
    });
  };

  return (
    <div>
      <Modal
        open={openCloneModal}
        onClose={handleCloseFeaturesModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles?.parentBox}>
          <Box sx={styles?.modalBox(theme?.palette)}>
            <Box sx={styles?.innerBoxOne}>
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={handleCloseFeaturesModal}
              >
                <CloseIcon />
              </Box>
            </Box>
            <Box sx={{ margin: '20px 0' }}>
              <Typography id="modal-modal-title" variant="h3" component="h2">
                Clone a saved view
              </Typography>

              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                  {dataArrayFeatures?.map((item: any) => (
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
                  <Button variant="outlined">Cancle</Button>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Box>
              </FormProvider>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default CloneModal;
