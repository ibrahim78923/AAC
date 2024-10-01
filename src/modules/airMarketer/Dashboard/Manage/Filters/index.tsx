import { Grid, Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { dataArray, defaultValues } from './Filters.data';
import { useForm } from 'react-hook-form';
import { filteredEmptyValues } from '@/utils/api';

export default function Filters({
  isOpenDrawer,
  onClose,
  filterValues,
  setFilterValues,
}: any) {
  const methods: any = useForm({
    defaultValues: defaultValues(filterValues),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    const filteredValues = filteredEmptyValues?.(values);
    setFilterValues(filteredValues);
    onClose(false);
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => onClose(false)}
      title={'Filters'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {dataArray()?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
}
