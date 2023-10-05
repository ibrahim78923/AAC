import { FormProvider } from '@/components/ReactHookForm';
import { Grid, Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { uuid } from 'uuidv4';
import { TimeData } from './DetailViewTimePicker.data';
function DetailViewTimePick() {
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
      <Box sx={{ width: '140px', height: '28px' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            {TimeData?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuid()}>
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
      </Box>
    </>
  );
}

export default DetailViewTimePick;
