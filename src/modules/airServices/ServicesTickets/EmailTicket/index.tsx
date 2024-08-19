import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import React from 'react';
import { addEmailDataArray } from './EmailTicket.data';
import { useEmailTicket } from './useEmailTicket';
import { SingleTicketDetailPortalComponentPropsI } from '../SingleTicketDetail/SingleTicketDetails.interface';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const EmailTicket = (props: SingleTicketDetailPortalComponentPropsI) => {
  const { isPortalOpen } = props;
  const { methods, handleSubmit, onSubmit, onClose, status } =
    useEmailTicket(props);

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen as boolean}
      onClose={onClose}
      title={'New Email'}
      isOk
      okText={'Send'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      disabledCancelBtn={status?.isLoading}
      isDisabled={status?.isLoading}
      isLoading={status?.isLoading}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {addEmailDataArray?.map((item: ReactHookFormFieldsI) => (
            <Grid item xs={12} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
