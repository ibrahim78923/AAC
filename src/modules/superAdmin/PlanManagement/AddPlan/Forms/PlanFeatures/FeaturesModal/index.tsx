import * as React from 'react';

import { Grid, Box, Button, Typography, Modal } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import { enqueueSnackbar } from 'notistack';
import {
  dataArrayFeatures,
  defaultValuesFeatures,
  validationSchemaFeatures,
} from './FeaturesModal.data';
import { styles } from './FeaturesModal.style';

import { yupResolver } from '@hookform/resolvers/yup';

import CloseIcon from '@/assets/icons/shared/close-icon';

import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setFeatureDetails } from '@/redux/slices/planManagement/planManagementSlice';
import { v4 as uuidv4 } from 'uuid';

const FeaturesModal = ({
  openFeaturesModal,
  handleCloseFeaturesModal,
  featureName,
}: any) => {
  const dispatch = useDispatch();

  const methods: any = useForm({
    resolver: yupResolver(validationSchemaFeatures),

    defaultValues: defaultValuesFeatures,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    dispatch(setFeatureDetails(values));
    handleCloseFeaturesModal();
    enqueueSnackbar('Details Added Successfully', {
      variant: 'success',
    });
  };

  return (
    <div>
      <Modal
        open={openFeaturesModal}
        onClose={handleCloseFeaturesModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles?.parentBox}>
          <Box sx={styles?.modalBox}>
            <Box sx={styles?.innerBoxOne}>
              <Box sx={{ cursor: 'pointer' }}>
                <CloseIcon />
              </Box>
            </Box>
            <Box sx={{ margin: '20px 0' }}>
              <Typography id="modal-modal-title" variant="h3" component="h2">
                {featureName}
              </Typography>
              <Typography
                id="modal-modal-description"
                variant="body2"
                sx={{ mt: 2, fontWeight: 500 }}
              >
                {featureName}
              </Typography>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={4}>
                  {dataArrayFeatures?.map((item: any) => (
                    <Grid item xs={12} md={item?.md} key={uuidv4()}>
                      <item.component {...item?.componentProps} size={'small'}>
                        {item?.componentProps?.select &&
                          item?.options?.map((option: any) => (
                            <option key={option?.value} value={option?.value}>
                              {option?.label}
                            </option>
                          ))}
                      </item.component>
                    </Grid>
                  ))}
                </Grid>
                <Box sx={styles?.buttonBox} mt={2}>
                  <Button variant="outlined">No</Button>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
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
export default FeaturesModal;
