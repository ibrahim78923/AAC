import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { useUpsertRelatedTicket } from './useUpsertRelatedTicket';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import ApiErrorState from '@/components/ApiErrorState';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';

export const UpsertRelatedTicket = () => {
  const {
    handleSubmit,
    submitUpsertTicket,
    methods,
    onClose,
    upsertTicketFormFields,
    isError,
    refetch,
    isPortalOpen,
    childTicketId,
    apiCallInProgress,
    showLoader,
  } = useUpsertRelatedTicket();

  return (
    <CommonDrawer
      isDrawerOpen={isPortalOpen?.isOpen as boolean}
      onClose={onClose}
      okText={
        !!childTicketId
          ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
          : GENERIC_UPSERT_FORM_CONSTANT?.ADD
      }
      title={`${
        !!childTicketId
          ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
          : GENERIC_UPSERT_FORM_CONSTANT?.ADD
      } Child Ticket`}
      submitHandler={handleSubmit(submitUpsertTicket)}
      isOk
      cancelText={'Cancel'}
      footer
      isLoading={apiCallInProgress}
      isDisabled={showLoader}
      disabledCancelBtn={apiCallInProgress}
    >
      {showLoader ? (
        <SkeletonForm />
      ) : isError ? (
        <ApiErrorState canRefresh refresh={refetch} />
      ) : (
        <>
          <Box mt={1}>
            <FormProvider methods={methods}>
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
              </Grid>
              <br />
              {!!childTicketId && (
                <>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    color="slateBlue.main"
                    mb={2}
                  >
                    {' '}
                    Attachments{' '}
                  </Typography>
                  <Box maxHeight={'20vh'}>
                    <Attachments
                      recordId={childTicketId}
                      permissionKey={[
                        AIR_SERVICES_TICKETS_TICKETS_DETAILS?.EDIT_CHILD_TICKETS,
                      ]}
                      colSpan={{ sm: 12, lg: 12 }}
                    />
                  </Box>
                </>
              )}
            </FormProvider>
          </Box>
        </>
      )}
      <br />
    </CommonDrawer>
  );
};
