import { Grid, Box } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { dataArray } from './Filters.data';
import { useLazyGetUsersQuery } from '@/services/airMarketer/emailMarketing';

export default function Filters({
  handleSubmit,
  onSubmit,
  methods,
  isOpenDrawer,
  onClose,
}: any) {
  const apiQueryUsers = useLazyGetUsersQuery();

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
          <Grid container spacing={4}>
            {dataArray(apiQueryUsers)?.map((item: any) => (
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
}
