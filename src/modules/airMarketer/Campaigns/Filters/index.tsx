import { Grid, Box } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';

import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import { dataArray, validationSchema } from './Filters.data';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { getSession } from '@/utils';
import { ROLES } from '@/constants/strings';
import { useGetUsersListQuery } from '@/services/airSales/deals';

const CampaingFilters = (props: any) => {
  const { isOpenDrawer, setIsOpenFilter, handeApplyFilter, filterLoading } =
    props;
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { user }: any = getSession();
  const organizationId: any = user?.organization?._id;

  const { data: UserListData } = useGetUsersListQuery({
    role: ROLES?.ORG_EMPLOYEE,
    organization: organizationId,
  });

  const { handleSubmit } = methods;

  const onSubmit = (values: any) => {
    try {
      const obj = {
        ...values,
        startDate: values?.startDate
          ? dayjs(values?.startDate)?.format(DATE_FORMAT?.API)
          : undefined,
        endDate: values?.endDate
          ? dayjs(values?.endDate)?.format(DATE_FORMAT?.API)
          : undefined,
      };
      delete obj?.date;
      handeApplyFilter(obj);
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
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
            {dataArray(UserListData)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
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
