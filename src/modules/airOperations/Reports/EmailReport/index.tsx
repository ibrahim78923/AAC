import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import React from 'react';
import { useNewEmailDrawer } from './useEmailReport';
import { emailReportFormFields } from './EmailReport.data';

export const EmailReport = (props: any) => {
  const { isPortalOpen } = props;

  const { methods, handleSubmit, onSubmit, onClose, emailReportsStatus } =
    useNewEmailDrawer(props);

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isEmail}
      onClose={() => onClose?.()}
      title={'New Email'}
      isOk
      okText={'Send'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      disabledCancelBtn={emailReportsStatus?.isLoading}
      isDisabled={emailReportsStatus?.isLoading}
      isLoading={emailReportsStatus?.isLoading}
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2}>
          {emailReportFormFields?.map((item: any) => (
            <Grid item xs={12} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};
