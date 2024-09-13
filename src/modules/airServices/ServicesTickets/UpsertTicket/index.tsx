import { Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { useUpsertTicket } from './useUpsertTicket';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { TicketAttachment } from '../TicketAttachment';

export const UpsertTicket = () => {
  const {
    handleSubmit,
    submitUpsertTicket,
    methods,
    isFetching,
    onClose,
    isLoading,
    ticketId,
    upsertTicketFormFields,
    putTicketStatus,
    postTicketStatus,
    isError,
    form,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    isPortalOpen,
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
      cancelText={GENERIC_UPSERT_FORM_CONSTANT?.CANCEL}
      footer
      isLoading={
        putTicketStatus?.isLoading ||
        postTicketStatus?.isLoading ||
        postAttachmentStatus?.isLoading
      }
      isDisabled={
        postTicketStatus?.isLoading ||
        putTicketStatus?.isLoading ||
        postAttachmentStatus?.isLoading
      }
      disabledCancelBtn={
        postTicketStatus?.isLoading ||
        putTicketStatus?.isLoading ||
        postAttachmentStatus?.isLoading
      }
    >
      <Box mt={1}>
        {isLoading ||
        isFetching ||
        getDynamicFieldsStatus?.isLoading ||
        getDynamicFieldsStatus?.isFetching ? (
          <SkeletonForm />
        ) : isError && getDynamicFieldsStatus?.isError ? (
          <ApiErrorState />
        ) : (
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(submitUpsertTicket)}
          >
            <Grid container spacing={2}>
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
        )}
      </Box>
    </CommonDrawer>
  );
};
