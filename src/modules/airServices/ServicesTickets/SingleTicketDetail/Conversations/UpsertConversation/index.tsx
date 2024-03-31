import { Attachments } from '@/components/Attachments';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography } from '@mui/material';
import { useUpsertConversation } from './useUpsertConversation';
import { AIR_SERVICES_TICKETS_TICKETS_DETAILS } from '@/constants/permission-keys';
import { CONVERSATION_TYPE_MODIFY } from '../Conversations.data';
import { ArticleModalIcon, CannedResponseModalIcon } from '@/assets/icons';
import { ArticlesList } from '../ArticlesList';
import { CannedResponsesList } from '../CannedResponsesList';
import { TICKET_CONVERSATIONS_RESPONSE_TYPE } from '@/constants/strings';

export const UpsertConversation = (props: any) => {
  const { isDrawerOpen, selectedConversationType, singleConversation } = props;

  const {
    submitUpsertConversation,
    handleSubmit,
    postConversationStatus,
    closeConversationDrawer,
    methods,
    upsertConversationFormFields,
    selectedResponseType,
    setSelectedResponseType,
    openResponseTypeModal,
  } = useUpsertConversation(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => closeConversationDrawer?.()}
        title={
          CONVERSATION_TYPE_MODIFY?.[selectedConversationType?.type]?.label
        }
        okText={
          !!singleConversation?._id
            ? `${CONVERSATION_TYPE_MODIFY?.[selectedConversationType?.type]
                ?.edit}`
            : `${CONVERSATION_TYPE_MODIFY?.[selectedConversationType?.type]
                ?.add}`
        }
        footer
        isOk
        submitHandler={() => handleSubmit(submitUpsertConversation)()}
        isLoading={postConversationStatus?.isLoading}
        isDisabled={postConversationStatus?.isLoading}
        disabledCancelBtn={postConversationStatus?.isLoading}
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={2}>
              {upsertConversationFormFields?.map((item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                </Grid>
              ))}
            </Grid>
            <Box
              display={'flex'}
              gap={1}
              my={1}
              flexWrap={'wrap'}
              alignItems={'center'}
              justifyContent={'flex-end'}
            >
              <Box
                onClick={() =>
                  setSelectedResponseType?.({
                    type: TICKET_CONVERSATIONS_RESPONSE_TYPE?.CANNED_RESPONSES,
                    isOpen: true,
                  })
                }
                sx={{ cursor: 'pointer' }}
              >
                <CannedResponseModalIcon />
              </Box>
              <Box
                onClick={() =>
                  setSelectedResponseType?.({
                    type: TICKET_CONVERSATIONS_RESPONSE_TYPE?.ARTICLE,
                    isOpen: true,
                  })
                }
                sx={{ cursor: 'pointer' }}
              >
                <ArticleModalIcon />
              </Box>
            </Box>
            <ArticlesList isModalOpen={false} />
            <CannedResponsesList isModalOpen />
            {!!singleConversation?._id && (
              <>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color="slateBlue.main"
                  mb={2}
                >
                  Attachments
                </Typography>
                <Box maxHeight={'20vh'}>
                  <Attachments
                    recordId={singleConversation?._id}
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
