import { Grid, Box, Typography } from '@mui/material';
import { dataArray, defaultValues, validationSchema } from './Filter.data';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';

export default function Filter({
  isOpenDrawer,
  setIsOpenDrawer,
  employeeFilter,
  setEmployeeFilter,
  initialValueProps = defaultValues,
}: any) {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValueProps,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    setEmployeeFilter({
      ...employeeFilter,
      product: values?.product,
      company: values?.company,
      status: values?.status,
    });
    setIsOpenDrawer(false);
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => setIsOpenDrawer(false)}
      title={'Assign Plan'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dataArray()?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <Typography variant="body2" fontWeight={500}>
                  {item?.title}
                </Typography>
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
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
