import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { filterContractsFormDataArray } from './FilterContractsForm.data';
import { useFilterContractsForm } from './useFilterContractsForm';

const FilterContractsForm = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const { methods, handleSubmit, onSubmit } = useFilterContractsForm(props);

  return (
    <CommonDrawer
      footer
      isDrawerOpen={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      title="Filters"
      okText="Apply"
      isOk
      submitHandler={handleSubmit(onSubmit)}
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {filterContractsFormDataArray?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default FilterContractsForm;
