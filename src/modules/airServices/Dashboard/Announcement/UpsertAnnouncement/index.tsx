import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertAnnouncement } from './useUpsertAnnouncement';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { AnnouncementPortalComponentsPropsI } from '../Announcement.interface';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { HeadingFormGrid } from '@/components/Grids/HeadingFormGrid';

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
        title={`${
          !!isPortalOpen?.data?._id
            ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
            : GENERIC_UPSERT_FORM_CONSTANT?.NEW
        } Announcements`}
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
            <HeadingFormGrid formFieldsList={upsertAnnouncementFormFields} />
          </FormProvider>
        </ApiRequestFlow>
      </CommonDrawer>
    </>
  );
};
