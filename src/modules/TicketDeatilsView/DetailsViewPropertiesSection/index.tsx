import { FormProvider } from '@/components/ReactHookForm';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { uuid } from 'uuidv4';
import { dataArray } from './DetailsViewPropeSect.data';

function DetailsVeiwPropSect() {
  const methods: any = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        status: Yup.string().required('Field is Required'),
      }),
    ),
    defaultValues: { status: '' },
  });

  const {
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    // console.log(data);
  };

  return (
    <>
      <Grid
        container
        justifyContent={'center'}
        display={'flex'}
        alignItems={'center'}
        flexDirection={'row'}
      >
        <Grid item xs={12} sx={{ mb: '2rem' }}>
          <Typography variant="h5">Properties</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              {dataArray?.map((item: any) => (
                <Grid item xs={4} md={item?.md} key={uuid()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : item?.heading}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Grid>
      </Grid>
    </>
  );
}

export default DetailsVeiwPropSect;
