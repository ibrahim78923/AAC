import useCatalogRequest from './useCatalogRequest';
import { FormProvider } from '@/components/ReactHookForm';
import { CatalogRequestI } from './CatalogRequest.interface';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';

export const CatalogRequest = (props: CatalogRequestI) => {
  const { open } = props;
  const {
    catalogRequestFormField,
    onSubmitRequest,
    handleSubmit,
    methods,
    handleClose,
    postTicketStatus,
    portalStyles,
  } = useCatalogRequest(props);

  return (
    <CustomCommonDialog
      isPortalOpen={open}
      closePortal={handleClose}
      dialogTitle="Item Request"
      submitButtonText="confirm"
      showSubmitLoader={postTicketStatus?.isLoading}
      disabledCancelButton={postTicketStatus?.isLoading}
      handleSubmitButton={handleSubmit(onSubmitRequest)}
      submitButtonStyles={(theme: any) => ({
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
        <FormGrid formFieldsList={catalogRequestFormField} />
      </FormProvider>
    </CustomCommonDialog>
  );
};
