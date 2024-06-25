import { Grid, Box } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { dataArray, defaultValues, validationSchema } from './Filters.data';
import { getSession } from '@/utils';
import { useLazyGetUsersListDropdownQuery } from '@/services/airSales/deals';
import { filteredEmptyValues } from '@/utils/api';

const CampaingFilters = (props: any) => {
  const { isOpenDrawer, setIsOpenFilter, setFilters, filterLoading, filters } =
    props;
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues(filters),
  });

  const { user }: any = getSession();
  const organizationId: any = user?.organization?._id;

  const userListData = useLazyGetUsersListDropdownQuery();
  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    const filterValues = filteredEmptyValues?.(data);
    setFilters(filterValues);
    setIsOpenFilter(false);
  };

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => setIsOpenFilter(false)}
      title={'Filters'}
      okText={'Apply'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      isLoading={filterLoading}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {dataArray(userListData, organizationId)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                <item.component {...item?.componentProps} size={'small'}>
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
};

export default CampaingFilters;
