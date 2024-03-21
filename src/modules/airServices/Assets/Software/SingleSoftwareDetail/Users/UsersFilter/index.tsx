import * as React from 'react';
import Button from '@mui/material/Button';
import { FilterIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useUsersFilter } from './useUsersFilter';

export const UsersFilter = (props: any) => {
  const {
    userFieldsData,
    methods,
    handleSubmit,
    submitFilter,
    openFilterDrawer,
    closeFilterDrawer,
    isFilterOpen,
  } = useUsersFilter(props);

  return (
    <Box>
      <Button
        variant="outlined"
        id="demo-positioned-button"
        onClick={openFilterDrawer}
        startIcon={<FilterIcon />}
        color="secondary"
      >
        Filter
      </Button>

      <CommonDrawer
        isDrawerOpen={isFilterOpen}
        onClose={closeFilterDrawer}
        title={'Filters'}
        okText={'Apply'}
        footer={true}
        isOk={true}
        submitHandler={handleSubmit(submitFilter)}
      >
        <Box mt={1}>
          <FormProvider methods={methods} onSubmit={handleSubmit(submitFilter)}>
            <Grid container spacing={1}>
              {userFieldsData?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </Box>
  );
};
