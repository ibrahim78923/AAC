import { Attachments } from '@/components/Attachments';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
import { useUpsertConversation } from './useUpsertConversation';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { FormGrid } from '@/components/Grids/FormGrid';

export const UpsertConversation = () => {
  const {
    submitUpsertConversation,
    handleSubmit,
    closePortal,
    methods,
    upsertConversationFormFields,
    isPortalOpen,
    apiCallInProgress,
    isResponsePortalOpen,
    ticketsConversationResponsePortalActionComponent,
  } = useUpsertConversation();

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isPortalOpen?.isOpen}
        onClose={closePortal}
        title={isPortalOpen?.action}
        okText={isPortalOpen?.action}
        footer
        isOk
        submitHandler={handleSubmit(submitUpsertConversation)}
        isLoading={apiCallInProgress}
        isDisabled={apiCallInProgress}
        disabledCancelBtn={apiCallInProgress}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <FormGrid formFieldsList={upsertConversationFormFields} />
            {!!isPortalOpen?.data?._id && (
              <>
                <Typography
                  variant="body1"
                  fontWeight={'fontWeightSmall'}
                  color="slateBlue.main"
                  my={2}
                >
                  Attachments
                </Typography>
                <Box maxHeight={'20vh'}>
                  <Attachments
                    recordId={isPortalOpen?.data?._id}
                    permissionKey={[
                      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_FARWARD,
                      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_NOTE,
                      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_REPLY,
                      AIR_SERVICES_TICKETS_TICKETS_DETAILS?.ADD_CONVERSATION_DISCUSSIONS,
                    ]}
                    colSpan={{ sm: 12, lg: 12 }}
                  />
                </Box>
              </>
            )}
          </FormProvider>
        </Box>
      </CommonDrawer>
      {isResponsePortalOpen?.isOpen &&
        ticketsConversationResponsePortalActionComponent?.[
          isResponsePortalOpen?.action
        ]}
    </>
  );
};
