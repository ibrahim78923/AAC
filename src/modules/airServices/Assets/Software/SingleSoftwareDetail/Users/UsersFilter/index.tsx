import Button from '@mui/material/Button';
import { FilterIcon } from '@/assets/icons';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useUsersFilter } from './useUsersFilter';
import { UsersFilterI } from './UsersFilter.interface';

export const UsersFilter: React.FC<UsersFilterI> = (props) => {
  const {
    userFieldsData,
    methods,
    handleSubmit,
    submitFilter,
    openFilterDrawer,
    closeFilterDrawer,
    isFilterOpen,
    resetFormAndCloseDrawer,
  } = useUsersFilter(props);

  return (
    <Box>
      <Button
        variant="outlined"
        id="demo-positioned-button"
        onClick={openFilterDrawer}
        startIcon={<FilterIcon />}
        color="secondary"
        className="small"
      >
        Filter
      </Button>

      <CommonDrawer
        isDrawerOpen={isFilterOpen}
        onClose={closeFilterDrawer}
        title={'Filters'}
        okText={'Apply'}
        cancelText={'Reset'}
        footer={true}
        isOk={true}
        submitHandler={handleSubmit(submitFilter)}
        cancelBtnHandler={handleSubmit(resetFormAndCloseDrawer)}
      >
        <Box mt={1}>
          <FormProvider methods={methods} onSubmit={handleSubmit(submitFilter)}>
            <Grid container spacing={1}>
              {userFieldsData?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
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
