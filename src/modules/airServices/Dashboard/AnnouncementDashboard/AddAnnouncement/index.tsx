import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import {
  createAnnouncementDashboardDataArray,
  createAnnouncementDashboardDefaultValues,
  createAnnouncementDashboardValidationSchema,
} from './AddAnnouncement.data';
import { v4 as uuidv4 } from 'uuid';
import CommonDrawer from '@/components/CommonDrawer';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

function AddAnnouncement({ isDrawerOpen, setIsDrawerOpen }: any) {
  const methods: any = useForm({
    resolver: yupResolver(createAnnouncementDashboardValidationSchema),
    defaultValues: createAnnouncementDashboardDefaultValues,
  });

  const { handleSubmit } = methods;

  const submit = () => {};
  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        title="New Announcements"
        submitHandler={() => handleSubmit(submit)()}
        footer={true}
        isOk={true}
        okText="Announce"
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {createAnnouncementDashboardDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select
                      ? item?.options?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
                            {option?.label}
                          </option>
                        ))
                      : item?.componentProps?.value
                      ? item?.componentProps?.value
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

export default AddAnnouncement;
