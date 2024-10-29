import CommonModal from '@/components/CommonModal';
import { Box, Button, TextField, Typography, useTheme } from '@mui/material';

const InviteMemberModal = (props: any) => {
  const { setIsInviteModalOpen, isInviteModalOpen } = props;
  const theme = useTheme();
  return (
    <CommonModal
      open={isInviteModalOpen}
      handleClose={() => setIsInviteModalOpen(false)}
      handleCancel={() => setIsInviteModalOpen(false)}
      handleSubmit={function (): void {
        throw new Error('Function not implemented.');
      }}
      title={'Invite New Member'}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: `${theme?.palette?.grey[600]}`,
          paddingBottom: '5px',
        }}
      >
        Email
      </Typography>
      <TextField type="text" placeholder="Enter Name" fullWidth />
      <Box
        sx={{
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '1rem',
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setIsInviteModalOpen(false)}
          className="small"
          sx={{
            border: `1px solid ${theme?.palette?.grey[700]}`,
            color: theme?.palette?.custom?.main,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() => setIsInviteModalOpen(false)}
          className="small"
        >
          Send Invite
        </Button>
      </Box>
    </CommonModal>
  );
};

export default InviteMemberModal;
