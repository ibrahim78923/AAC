import { Grid, Box, Typography } from '@mui/material';
import { dataArray, usersFilterDefaultValues } from './Filter.data';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';
import { filteredEmptyValues } from '@/utils/api';
import { FilterProps } from '@/modules/superAdmin/UserManagement/UsersDetailsList/UsesDetailList-interface';

export default function Filter({
  isOpenDrawer,
  setIsOpenDrawer,
  employeeFilter,
  setEmployeeFilter,
}: FilterProps) {
  const methods: any = useForm({
    defaultValues: usersFilterDefaultValues(employeeFilter),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const filterValues = filteredEmptyValues?.(data);
    setEmployeeFilter(filterValues);
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
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
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
