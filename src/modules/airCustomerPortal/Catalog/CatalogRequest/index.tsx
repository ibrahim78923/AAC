import useCatalogRequest from './useCatalogRequest';
import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { CatalogRequestI } from './CatalogRequest.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

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
    requestForSomeOne,
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
        <Grid container>
          {catalogRequestFormField?.map((item: ReactHookFormFieldsI) => (
            <Grid item xs={12} md={item?.md} key={item?.id}>
              <item.component
                {...item?.componentProps}
                size={'small'}
                requestForSomeOne={requestForSomeOne}
              />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CustomCommonDialog>
  );
};
