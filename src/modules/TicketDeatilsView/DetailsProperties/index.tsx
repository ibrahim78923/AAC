import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { uuid } from 'uuidv4';
function DetailsProperties() {
  const dataArray = [
    {
      componentProps: {
        name: 'status',
        label: 'Status',
        fullWidth: true,
        select: true,
      },
      options: [
        {
          value: 'A',
          label: 'A',
        },
      ],
      component: RHFSelect,
      md: 4,
    },
    {
      componentProps: {
        name: 'Priority *',
        label: 'Priority *',
        fullWidth: true,
        select: true,
      },
      options: [
        {
          value: 'A',
          label: 'A',
        },
      ],
      component: RHFSelect,
      md: 4,
    },
    {
      componentProps: {
        name: 'Urgency',
        label: 'Urgency',
        fullWidth: true,
        select: true,
      },
      options: [
        {
          value: 'A',
          label: 'A',
        },
      ],
      component: RHFSelect,
      md: 4,
    },
    {
      componentProps: {
        name: 'Source',
        label: 'Source',
        fullWidth: true,
        select: true,
      },
      options: [
        {
          value: 'A',
          label: 'A',
        },
      ],
      component: RHFSelect,
      md: 4,
    },
    {
      componentProps: {
        name: 'Type',
        label: 'Type',
        fullWidth: true,
        select: true,
      },
      options: [
        {
          value: 'A',
          label: 'A',
        },
      ],
      component: RHFSelect,
      md: 4,
    },
    {
      componentProps: {
        name: 'Impact ',
        label: 'Impact ',
        fullWidth: true,
        select: true,
      },
      options: [
        {
          value: 'A',
          label: 'A',
        },
      ],
      component: RHFSelect,
      md: 4,
    },
    {
      componentProps: {
        name: 'Source',
        label: 'Source',
        fullWidth: true,
        select: true,
      },
      options: [
        {
          value: 'A',
          label: 'A',
        },
      ],
      component: RHFSelect,
      md: 4,
    },
    {
      componentProps: {
        name: 'Type',
        label: 'Type',
        fullWidth: true,
        select: true,
      },
      options: [
        {
          value: 'A',
          label: 'A',
        },
      ],
      component: RHFSelect,
      md: 4,
    },
    {
      componentProps: {
        name: 'Impact ',
        label: 'Impact ',
        fullWidth: true,
        select: true,
      },
      options: [
        {
          value: 'A',
          label: 'A',
        },
      ],
      component: RHFSelect,
      md: 4,
    },
  ];

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
        <Grid item xs={12}>
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

export default DetailsProperties;
