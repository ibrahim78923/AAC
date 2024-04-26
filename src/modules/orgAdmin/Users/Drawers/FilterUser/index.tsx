import { Grid, Typography } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import CommonDrawer from '@/components/CommonDrawer';

import { usersFilterArray } from './FilterUser.data';

import { useForm } from 'react-hook-form';

import { v4 as uuidv4 } from 'uuid';

const FilterUser = ({
  isOpenDrawer,
  setIsOpenFilterDrawer,
  employeeFilter,
  setEmployeeFilter,
}: any) => {
  const methods: any = useForm();
  const { handleSubmit } = methods;

  const onSubmit = async (values: any) => {
    setEmployeeFilter({
      ...employeeFilter,
      product: values?.product,
      company: values?.company,
      status: values?.status,
    });
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
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <Typography variant="body2" fontWeight={500}>
                  {item?.title}
                </Typography>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            );
          })}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default FilterUser;
