import * as React from 'react';
import { Grid, Box, Button, useTheme } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import {
  dataArrayFeatures,
  defaultValuesFeatures,
  validationSchemaFeatures,
} from './FeaturesModal.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
import { usePlanFeatures } from '../usePlanFeatures';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FeaturesModal({
  openFeaturesModal,
  handleCloseFeaturesModal,
  featureName,
}: any) {
  const theme = useTheme();
  const { setFeatureDetail } = usePlanFeatures();
  const methods: any = useForm({
    resolver: yupResolver(validationSchemaFeatures),

    defaultValues: defaultValuesFeatures,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    setFeatureDetail(values);
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
        <Box sx={style}>
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
                  <item.component {...item.componentProps} size={'small'}>
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
            <Grid item sm={8} style={{ textAlign: 'end' }}>
              <Button
                className="small"
                variant="outlined"
                onClick={handleCloseFeaturesModal}
                sx={{
                  border: `1px solid ${theme?.palette?.custom?.dark}`,
                  color: theme?.palette?.custom?.main,
                  width: '112px',
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="small"
                type="submit"
                sx={{ marginLeft: '10px' }}
              >
                Save
              </Button>
            </Grid>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}
