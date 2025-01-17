import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertTicket } from './useUpsertTicket';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { TicketAttachment } from '../TicketAttachment';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

export const UpsertTicket = () => {
  const {
    handleSubmit,
    submitUpsertTicket,
    methods,
    onClose,
    ticketId,
    upsertTicketFormFields,
    isError,
    form,
    isPortalOpen,
    apiCallInProgress,
    showLoader,
    hasError,
    refetch,
  }: any = useUpsertTicket();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen as boolean}
      onClose={onClose}
      okText={
        !!ticketId
          ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
          : GENERIC_UPSERT_FORM_CONSTANT?.SUBMIT
      }
      title={`${
        !!ticketId
          ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
          : GENERIC_UPSERT_FORM_CONSTANT?.CREATE
      } Ticket`}
      submitHandler={handleSubmit(submitUpsertTicket)}
      isOk
      footer
      isLoading={apiCallInProgress}
      isDisabled={showLoader}
      disabledCancelBtn={apiCallInProgress}
    >
      <ApiRequestFlow
        showSkeleton={showLoader}
        refreshApi={refetch}
        hasError={hasError}
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitUpsertTicket)}
        >
          <Grid container spacing={1.5}>
            {upsertTicketFormFields?.map((item: ReactHookFormFieldsI) => (
              <Grid item xs={12} md={item?.md} key={item?.id}>
                <item.component
                  {...item?.componentProps}
                  size={'small'}
                  disabled={item?.componentProps?.disabled ?? isError}
                />
              </Grid>
            ))}
            {!!!ticketId &&
              form?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  {componentMap[item?.component] &&
                    createElement(componentMap[item?.component], {
                      ...item?.componentProps,
                      name: item?.componentProps?.label,
                      size: 'small',
                    })}
                </Grid>
              ))}
          </Grid>
          <br />
          <TicketAttachment ticketId={ticketId} />
        </FormProvider>
      </ApiRequestFlow>
    </CommonDrawer>
  );
};
