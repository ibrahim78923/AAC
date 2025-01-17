import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertAnnouncement } from './useUpsertAnnouncement';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { AnnouncementPortalComponentsPropsI } from '../Announcement.interface';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

const { EDIT, NEW } = GENERIC_UPSERT_FORM_CONSTANT ?? {};

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
    isLoading,
    isFetching,
    isError,
    refetch,
    apiCallInProgress,
  } = useUpsertAnnouncement(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isUpsert as boolean}
        onClose={handleClose}
        title={`${!!isPortalOpen?.data?._id ? EDIT : NEW} Announcements`}
        submitHandler={handleSubmit(submit)}
        footer
        isOk
        okText={'Announce'}
        isLoading={apiCallInProgress}
        isDisabled={apiCallInProgress}
        disabledCancelBtn={apiCallInProgress}
      >
        <ApiRequestFlow
          showSkeleton={isLoading || isFetching}
          hasError={isError}
          refreshApi={refetch}
        >
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
        </ApiRequestFlow>
      </CommonDrawer>
    </>
  );
};
