import CommonDrawer from '@/components/CommonDrawer';
import { useContractsDrawerForm } from './useContractsDrawerForm';
import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { ContractsDrawerFormDataArray } from './ContractsDrawerForm.data';
import { v4 as uuidv4 } from 'uuid';

const ContractsDrawerForm = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { methodsDrawerFormForm } = useContractsDrawerForm();

  return (
    <>
      <CommonDrawer
        // footer={true}
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Filters"
        okText="Send"
        isOk
        // isOk={true}
      >
        <Box mt={1}>
          <FormProvider
            methods={methodsDrawerFormForm}
            onSubmit={methodsDrawerFormForm.handleSubmit}
          >
            <Grid container spacing={4}>
              {ContractsDrawerFormDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={option?.value} value={option?.value}>
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

export default ContractsDrawerForm;
