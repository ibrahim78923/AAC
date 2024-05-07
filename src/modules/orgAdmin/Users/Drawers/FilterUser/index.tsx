import { Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { usersFilterArray, usersFilterDefaultValues } from './FilterUser.data';
import { useForm } from 'react-hook-form';
import { filteredEmptyValues } from '@/utils/api';

const FilterUser = ({
  isOpenDrawer,
  setIsOpenFilterDrawer,
  employeeFilter,
  setEmployeeFilter,
}: any) => {
  const methods: any = useForm({
    defaultValues: usersFilterDefaultValues(employeeFilter),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const filterValues = filteredEmptyValues?.(data);
    setEmployeeFilter(filterValues);
    setIsOpenFilterDrawer(false);
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => setIsOpenFilterDrawer(false)}
      title="Filters"
      okText="Apply"
      isOk={true}
      submitHandler={handleSubmit(onSubmit)}
      footer
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {usersFilterArray()?.map((item: any) => {
            return (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                <Typography variant="body2" fontWeight={500}>
                  {item?.title}
                </Typography>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            );
          })}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default FilterUser;
