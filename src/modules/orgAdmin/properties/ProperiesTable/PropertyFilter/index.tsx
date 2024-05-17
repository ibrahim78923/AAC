import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { propertiesFilterData } from './PropertyFilter.data';
import usePropertyFilter from './usePropertyFilter';

const PropertyFilter = (props: any) => {
  const { isFilterDrawerOpen, setIsFilterDrawerOpen } = props;
  const { methods, handleSubmit, onSubmit } = usePropertyFilter(
    setIsFilterDrawerOpen,
  );

  return (
    <CommonDrawer
      title="Filter"
      isDrawerOpen={isFilterDrawerOpen}
      onClose={() => setIsFilterDrawerOpen(false)}
      isOk={true}
      okText="Apply"
      footer={true}
      submitHandler={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {propertiesFilterData?.map((item: any) => (
            <Grid item xs={12} md={item.md} key={item.componentProps.name}>
              <item.component size="small" {...item?.componentProps} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default PropertyFilter;
