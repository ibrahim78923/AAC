import CommonDrawer from '@/components/CommonDrawer';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { softwareEditDrawerArray } from './SoftwareEdit.data';
import { v4 as uuidv4 } from 'uuid';
import useSoftwareEdit from './useSoftwareEdit';

export const SoftwareEdit = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { methods, handleSubmit, onSubmit, submitHandler } =
    useSoftwareEdit(props);

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
