import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import CommonDrawer from '@/components/CommonDrawer';
import { useCreateRelatedTickets } from './useCreateRelatedTickets';
import { useEffect } from 'react';
const timeValues = ['updatedAt', 'createdAt', 'plannedEndDate'];
const RHFSelectValues = ['requester', 'createdAt', 'plannedEndDate'];
function CreateRelatedTickets({
  isDrawerOpen,
  setIsDrawerOpen,
  drawerType,
  data,
}: any) {
  const { methods, submit, createTicketDataArray } = useCreateRelatedTickets(
    setIsDrawerOpen,
    data,
  );
  useEffect(() => {
    !!data?.length &&
      Object?.entries(data?.[0] ?? {})?.map(([key, value]: any) => {
        if (timeValues?.includes(key)) {
          return methods?.setValue(key, new Date(value));
        }
        if (RHFSelectValues?.includes(key)) {
          return methods?.setValue(key, { value });
        }

        methods?.setValue(key, value);
      });
  }, [data]);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        title={`${drawerType} child ticket`}
        submitHandler={() => methods?.handleSubmit(submit)()}
        footer={true}
        isOk={true}
        okText={`${drawerType} child ticket`}
      >
        <Box mt={1}>
          <FormProvider
            methods={methods}
            onSubmit={methods?.handleSubmit?.(submit)}
          >
            <Grid container spacing={4}>
              {createTicketDataArray?.map((item: any) => (
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
}

export default CreateRelatedTickets;
