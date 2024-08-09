import { FormProvider, RHFEditor } from '@/components/ReactHookForm';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormLabel, TextField, Typography, useTheme } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const BasicInfo = () => {
  const theme: any = useTheme();

  const emailValidationsSchema = Yup?.object()?.shape({});
  const emailDefaultValues = {};

  const methodsdealsTasks = useForm({
    resolver: yupResolver(emailValidationsSchema),
    defaultValues: emailDefaultValues,
  });

  const onSubmit = () => {};
  const { handleSubmit } = methodsdealsTasks;

  return (
    <Box>
      <Typography variant="body1" color={theme?.palette?.grey[900]}>
        {' '}
        <strong style={{ color: 'black' }}>4 </strong> (out of 4)
      </Typography>
      <Typography variant="body1" color={theme?.palette?.grey[900]}>
        Number of deals with a value for this propery
      </Typography>
      <FormLabel>
        <Typography variant="body2" fontWeight={'500'} mt={2}>
          Group <span style={{ color: theme?.palette?.error?.main }}>*</span>
        </Typography>
      </FormLabel>
      <TextField variant="outlined" fullWidth sx={{ marginBottom: '20px' }} />
      <FormProvider
        methods={methodsdealsTasks}
        onSubmit={handleSubmit(onSubmit)}
      >
        <RHFEditor label="Description" name="Description" />
      </FormProvider>
    </Box>
  );
};
export default BasicInfo;
