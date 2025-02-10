import {
  FormProvider,
  RHFDropZone,
  RHFEditor,
} from '@/components/ReactHookForm';
import { useReplySingleTicketConversation } from './useReplySingleTicketConversation';
import { Box } from '@mui/material';
import { ReplySingleTicketConversationPropsI } from '../useSingleTicketConversation.interface';
import { pxToRem } from '@/utils/getFontValue';
import { CustomLoadingButton } from '@/components/Buttons/CustomLoadingButton';
import { customizePortalDefaultValues } from '@/layout/CustomerPortal/CustomerPortal.data';

export const ReplySingleTicketConversation = (
  props: ReplySingleTicketConversationPropsI,
) => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    postReplyForCustomerTicketConversationStatus,
    closeReply,
    portalStyles,
  } = useReplySingleTicketConversation(props);

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFEditor
          name="yourReply"
          label="Your Reply"
          style={{ height: pxToRem(150) }}
          required
        />
        <br />
        <RHFDropZone name="attachFile" fullWidth />
        <br />
        <Box justifyContent={'flex-end'} display={'flex'} gap={2}>
          <CustomLoadingButton
            primary={false}
            disabled={postReplyForCustomerTicketConversationStatus?.isLoading}
            onClick={closeReply}
            customStyles={(theme: Theme) => ({
              borderColor:
                portalStyles?.btnSecondary ||
                customizePortalDefaultValues(theme)?.btnSecondary,
              color:
                portalStyles?.btnSecondary ||
                customizePortalDefaultValues(theme)?.btnSecondary,
              '&:hover': {
                borderColor:
                  portalStyles?.btnSecondary ||
                  customizePortalDefaultValues(theme)?.btnSecondary,
                color:
                  portalStyles?.btnSecondary ||
                  customizePortalDefaultValues(theme)?.btnSecondary,
              },
            })}
          >
            Cancel
          </CustomLoadingButton>
          <CustomLoadingButton
            type="submit"
            loading={postReplyForCustomerTicketConversationStatus?.isLoading}
            customStyles={(theme: Theme) => ({
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
            })}
          >
            Send
          </CustomLoadingButton>
        </Box>
      </FormProvider>
    </>
  );
};
