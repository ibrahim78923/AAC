import { FormProvider } from '@/components/ReactHookForm';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { Theme } from '@mui/material';
import { useShareTicket } from './useShareTicket';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';

export const ShareTicket = (props: any) => {
  const { open, handleClose } = props;
  const {
    shareTicketData,
    methods,
    handleSubmit,
    onSubmit,
    portalStyles,
    shareTicketProgress,
  } = useShareTicket();

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={open}
        closePortal={handleClose}
        dialogTitle="Share"
        submitButtonText="Ok"
        showSubmitLoader={shareTicketProgress?.isLoading}
        disabledCancelButton={shareTicketProgress?.isLoading}
        handleSubmitButton={handleSubmit(onSubmit)}
        cancelButtonStyles={(theme: Theme) => ({
          borderColor:
            portalStyles?.btnSecondary ||
            customizePortalDefaultValues(theme)?.btnSecondary,
          color:
            portalStyles?.btnSecondary ||
            customizePortalDefaultValues(theme)?.btnSecondary,
          '&:hover': {
            borderColor:
              portalStyles?.btnSecondary ||
              customizePortalDefaultValues(theme)?.btnSecondary,
            color:
              portalStyles?.btnSecondary ||
              customizePortalDefaultValues(theme)?.btnSecondary,
          },
        })}
        submitButtonStyles={(theme: Theme) => ({
          bgcolor:
            portalStyles?.btnPrimary ||
            customizePortalDefaultValues(theme)?.btnPrimary,
          color: 'common.white',
          '&:hover': {
            bgcolor:
              portalStyles?.btnPrimary ||
              customizePortalDefaultValues(theme)?.btnPrimary,
            color: 'common.white',
          },
          '&.Mui-disabled': {
            bgcolor:
              portalStyles?.btnPrimary ||
              customizePortalDefaultValues(theme)?.btnPrimary,
          },
        })}
      >
        <FormProvider methods={methods}>
          <FormGrid spacing={1} formFieldsList={shareTicketData} />
        </FormProvider>
      </CustomCommonDialog>
    </>
  );
};
