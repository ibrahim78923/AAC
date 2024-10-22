import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { useEmailTicket } from './useEmailTicket';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { sendTicketEmailFormFields } from './EmailTicket.data';

export const EmailTicket = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    onClose,
    apiCallInProgress,
    isPortalOpen,
  } = useEmailTicket();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen}
      onClose={onClose}
      title={'New Email'}
      isOk
      okText={'Send'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      disabledCancelBtn={apiCallInProgress}
      isDisabled={apiCallInProgress}
      isLoading={apiCallInProgress}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {sendTicketEmailFormFields?.map((item: ReactHookFormFieldsI) => (
            <Grid item xs={12} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
