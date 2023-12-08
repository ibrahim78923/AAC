import { Box, Button, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { styles } from '../CreateForm.style';
import {
  dynamicallyFormArray,
  dynamicallyFormDefaultValues,
  dynamicallyFormValidationSchema,
} from '../CreateForm.data';

const InnerTab = ({ showView }: any) => {
  const dynamicallyFormForm = useForm({
    resolver: yupResolver(dynamicallyFormValidationSchema),
    defaultValues: dynamicallyFormDefaultValues,
  });

  const onSubmit = async () => {};

  const { handleSubmit } = dynamicallyFormForm;

  return (
    <Box sx={styles.subDiv(showView)}>
      <Box sx={styles.innerBox}>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Hi there!{' '}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', marginBottom: '45px' }}
        >
          Please fill in the attributes below to continue.
        </Typography>
        <FormProvider
          methods={dynamicallyFormForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={4}>
            {dynamicallyFormArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component
                  {...item?.componentProps}
                  size={'small'}
                ></item.component>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            sx={{ position: 'absolute', bottom: '30px', width: 'fit-content' }}
            type="submit"
          >
            submit
          </Button>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default InnerTab;
