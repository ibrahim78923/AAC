import { Attachments } from '@/components/Attachments';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography } from '@mui/material';
import { useUpsertConversation } from './useUpsertConversation';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { CONVERSATION_TYPE_MODIFY } from '../Conversations.data';

export const UpsertConversation = (props: any) => {
  const { isDrawerOpen, selectedConversationType } = props;

  const {
    submitUpsertConversation,
    handleSubmit,
    postConversationStatus,
    closeConversationDrawer,
    methods,
    upsertConversationFormFields,
    selectedResponseType,
    openResponseTypeModal,
    editTicketConversationNoteStatus,
    postAttachmentsStatus,
  } = useUpsertConversation(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => closeConversationDrawer?.()}
        title={
          CONVERSATION_TYPE_MODIFY?.[selectedConversationType?.conversationType]
            ?.label
        }
        okText={
          !!selectedConversationType?._id
            ? `${CONVERSATION_TYPE_MODIFY?.[
                selectedConversationType?.conversationType
              ]?.edit}`
            : `${CONVERSATION_TYPE_MODIFY?.[
                selectedConversationType?.conversationType
              ]?.add}`
        }
        footer
        isOk
        submitHandler={() => handleSubmit(submitUpsertConversation)()}
        isLoading={
          postConversationStatus?.isLoading ||
          editTicketConversationNoteStatus?.isLoading ||
          postAttachmentsStatus?.isLoading
        }
        isDisabled={
          postConversationStatus?.isLoading ||
          editTicketConversationNoteStatus?.isLoading ||
          postAttachmentsStatus?.isLoading
        }
        disabledCancelBtn={
          postConversationStatus?.isLoading ||
          editTicketConversationNoteStatus?.isLoading ||
          postAttachmentsStatus?.isLoading
        }
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {upsertConversationFormFields?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.children ? item?.children : null}
                  </item.component>
                </Grid>
              ))}
            </Grid>
            {!!selectedConversationType?._id && (
              <>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color="slateBlue.main"
                  my={2}
                >
                  Attachments
                </Typography>
                <Box maxHeight={'20vh'}>
                  <Attachments
                    recordId={selectedConversationType?._id}
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
      {selectedResponseType?.isOpen && openResponseTypeModal?.()}
    </>
  );
};
