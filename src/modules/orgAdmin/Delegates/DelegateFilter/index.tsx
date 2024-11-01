import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { delegateFilterArray } from './DelegateFilter.data';
import useDelegateFilter from './useDelegateFilter';

const DelegateFilter = (props: any) => {
  const { isFilterDrawer, setIsFilterDrawer, filterValue, setFilterValue } =
    props;
  const { methods, handleSubmit, onSubmit } = useDelegateFilter(
    filterValue,
    setFilterValue,
    setIsFilterDrawer,
  );

  return (
    <CommonDrawer
      isDrawerOpen={isFilterDrawer}
      onClose={() => {
        setIsFilterDrawer(false);
      }}
      title="Filters"
      okText="Apply"
      isOk={true}
      footer={true}
      submitHandler={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {delegateFilterArray?.map((item: any) => (
            <Grid item xs={12} md={item?.md} key={item?.name}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default DelegateFilter;
