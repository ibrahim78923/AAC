import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertAnnouncement } from './useUpsertAnnouncement';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { AnnouncementPortalComponentsPropsI } from '../Announcement.interface';

export const UpsertAnnouncement = (
  props: AnnouncementPortalComponentsPropsI,
) => {
  const { isPortalOpen } = props;
  const {
    upsertAnnouncementFormFields,
    submit,
    methods,
    handleClose,
    handleSubmit,
    postAnnouncementStatus,
    updateServicesAnnouncementOnDashboardStatus,
    isLoading,
    isFetching,
    isError,
    refetch,
    sendServiceDashboardViaEmailOnceStatus,
  } = useUpsertAnnouncement(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isUpsert as boolean}
        onClose={handleClose}
        title={`${
          !!isPortalOpen?.data?._id
            ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
            : GENERIC_UPSERT_FORM_CONSTANT?.NEW
        } Announcements`}
        submitHandler={() => handleSubmit(submit)()}
        footer
        isOk
        okText={'Announce'}
        isLoading={
          postAnnouncementStatus?.isLoading ||
          updateServicesAnnouncementOnDashboardStatus?.isLoading ||
          sendServiceDashboardViaEmailOnceStatus?.isLoading
        }
        isDisabled={
          postAnnouncementStatus?.isLoading ||
          updateServicesAnnouncementOnDashboardStatus?.isLoading ||
          sendServiceDashboardViaEmailOnceStatus?.isLoading
        }
        disabledCancelBtn={
          postAnnouncementStatus?.isLoading ||
          updateServicesAnnouncementOnDashboardStatus?.isLoading ||
          sendServiceDashboardViaEmailOnceStatus?.isLoading
        }
      >
        <Box mt={1}>
          {isLoading || isFetching ? (
            <SkeletonForm />
          ) : isError ? (
            <ApiErrorState canRefresh refresh={() => refetch?.()} />
          ) : (
            <FormProvider methods={methods}>
              <Grid container spacing={1}>
                {upsertAnnouncementFormFields?.map((item: any) => (
                  <Grid
                    item
                    xs={12}
                    md={item?.md}
                    key={item?.id}
                    sx={item?.gridSx}
                  >
                    <item.component {...item?.componentProps} size={'small'}>
                      {item?.heading ? item?.heading : null}
                    </item.component>
                  </Grid>
                ))}
              </Grid>
            </FormProvider>
          )}
        </Box>
      </CommonDrawer>
    </>
  );
};
