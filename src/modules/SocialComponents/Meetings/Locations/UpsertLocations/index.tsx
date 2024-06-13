import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertLocations } from './useUpsertLocations';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import {
  BUTTON_TITLE_FORM_USER,
  TITLE_FORM_USER,
} from './UpsertLocations.data';

export const UpsertLocations = (props: any) => {
  const { isPortalOpen } = props;
  const {
    methods,
    handleSubmit,
    upsertLocationsFormFields,
    closeDrawer,
    submitUpsertLocationForm,
    patchCommonMeetingsLocationsStatus,
    postCommonMeetingsLocationsStatus,
  } = useUpsertLocations(props);

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isUpsert}
      onClose={() => closeDrawer()}
      isOk
      okText={BUTTON_TITLE_FORM_USER?.[isPortalOpen?.type]}
      footer
      title={TITLE_FORM_USER?.[isPortalOpen?.type]}
      submitHandler={() => handleSubmit(submitUpsertLocationForm)()}
      isLoading={
        patchCommonMeetingsLocationsStatus?.isLoading ||
        postCommonMeetingsLocationsStatus?.isLoading
      }
      isDisabled={
        postCommonMeetingsLocationsStatus?.isLoading ||
        patchCommonMeetingsLocationsStatus?.isLoading
      }
      disabledCancelBtn={
        postCommonMeetingsLocationsStatus?.isLoading ||
        patchCommonMeetingsLocationsStatus?.isLoading
      }
    >
      <Box mt={1}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {upsertLocationsFormFields?.map((item: any) => (
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
