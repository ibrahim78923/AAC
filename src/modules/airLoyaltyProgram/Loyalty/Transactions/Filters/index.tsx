import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { filtersArray } from './Filters.data';
import CommonDrawer from '@/components/CommonDrawer';
import { useFilters } from './useFilters';

function Filters({
  isFilterDrawerOpen,
  setIsFilterDrawerOpen,
  title,
  okText,
}: any) {
  const { methods, handleSubmit, submit } = useFilters(setIsFilterDrawerOpen);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isFilterDrawerOpen}
        onClose={() => {
          setIsFilterDrawerOpen(false);
        }}
        title={title}
        submitHandler={() => {
          handleSubmit(submit)();
        }}
        footer={true}
        isOk={true}
        okText={okText}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {filtersArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
}

export default Filters;
