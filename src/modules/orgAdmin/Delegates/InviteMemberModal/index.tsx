import CommonModal from '@/components/CommonModal';
import { Grid } from '@mui/material';
import useInviteMemberModal from './useInviteMemberModal';
import { FormProvider } from '@/components/ReactHookForm';
import { inviteMemberArray } from './InviteMemberModal.data';

const InviteMemberModal = (props: any) => {
  const { setIsInviteModalOpen, isInviteModalOpen } = props;
  const { postInviteMemberLoading, handleSubmit, onSubmit, methods } =
    useInviteMemberModal(setIsInviteModalOpen);

  return (
    <CommonModal
      open={isInviteModalOpen}
      handleClose={() =>
        setIsInviteModalOpen({ ...isInviteModalOpen, invite: false })
      }
      handleCancel={() =>
        setIsInviteModalOpen({ ...isInviteModalOpen, invite: false })
      }
      handleSubmit={handleSubmit(onSubmit)}
      title={'Invite New Member'}
      okText="Send Invite"
      cancelText="Cancel"
      footer
      isLoading={postInviteMemberLoading}
    >
      <FormProvider methods={methods}>
        <Grid container mt={1}>
          {inviteMemberArray?.map((item: any) => {
            return (
              <Grid item xs={12} md={item?.md} key={item?.name}>
                <item.component {...item.componentProps} size={'small'} />
              </Grid>
            );
          })}
        </Grid>
      </FormProvider>
    </CommonModal>
  );
};

export default InviteMemberModal;
