import CommonDrawer from '@/components/CommonDrawer';

import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import useSoftwareActionEdit from './useSoftwareActionEdit';
import { defaultValues, softwareEditDrawerArray } from './SoftwareEdit.data';
import { v4 as uuidv4 } from 'uuid';
import { enqueueSnackbar } from 'notistack';
export const SoftwareEdit = ({ isDrawerOpen, setIsDrawerOpen }: any) => {
  const { methods, handleSubmit, onSubmit } = useSoftwareActionEdit();
  const submitHandler = methods.handleSubmit(() => {
    enqueueSnackbar('Software Updated Successfully', {
      variant: 'success',
    });
    setIsDrawerOpen(false);
    methods.reset(defaultValues);
  });
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      title="Edit Software"
      submitHandler={submitHandler}
      footer={true}
      isOk={true}
      okText="Update"
    >
      <>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {softwareEditDrawerArray?.map((item: any) => (
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
      </>
    </CommonDrawer>
  );
};
