import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { filterContractsFormDataArray } from './FilterContractsForm.data';
import { v4 as uuidv4 } from 'uuid';
import { useFilterContractsForm } from './useFilterContractsForm';

const FilterContractsForm = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const { methods, handleSubmit, onSubmit } = useFilterContractsForm(props);

  return (
    <>
      <CommonDrawer
        footer={true}
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Filters"
        okText="Send"
        isOk
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {filterContractsFormDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
};

export default FilterContractsForm;
