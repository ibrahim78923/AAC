import { Grid, Box } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { dataArray, defaultValues, validationSchema } from './CreateForm.data';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';
const CreateForm = () => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async () => {
    enqueueSnackbar('Dashboard Created Successfully', {
      variant: 'success',
    });
  };
  return (
    <Box mt={1}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          {dataArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              <item.component {...item.componentProps} size={'small'}>
                {item?.componentProps?.select &&
                  item?.options?.map((option: any) => (
                    <option value={option?.value} key={uuidv4()}>
                      {option?.label}
                    </option>
                  ))}
              </item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </Box>
  );
};
export default CreateForm;
