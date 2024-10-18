import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';
import { CreateDealProps } from '../CreateDeal/CreateDeal-interface';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { styles } from './ViewAllDeals.style';
import { viewDealsData } from './ViewAllDeals.data';
import useViewAllDeals from './useViewAllDeals';

const ViewAllDeals = ({ open, onClose, dealHeaderParams }: CreateDealProps) => {
  const { dealViewsData, setSearch } = dealHeaderParams;

  const newDealViewsData = [
    { _id: 1, name: 'All Deals', isActive: true, isDefault: true },
    ...(Array?.isArray(dealViewsData) ? dealViewsData : []),
  ];

  const { handleSubmit, onSubmit, methods, updateViewLoading, theme } =
    useViewAllDeals(newDealViewsData);

  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      okText="Apply"
      title="All Views"
      submitHandler={handleSubmit(onSubmit)}
      isLoading={updateViewLoading}
    >
      <Search
        label="Search Here"
        setSearchBy={setSearch}
        fullWidth
        autoComplete="off"
      />
      <FormProvider methods={methods}>
        <Box sx={{ ...styles?.viewRecStyle(theme), mt: 1 }}>
          <Grid container spacing={1}>
            {viewDealsData(newDealViewsData)?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                <item.component {...item.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </FormProvider>
    </CommonDrawer>
  );
};

export default ViewAllDeals;
