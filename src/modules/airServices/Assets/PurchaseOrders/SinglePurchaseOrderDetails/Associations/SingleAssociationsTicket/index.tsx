import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import { AlertModals } from '@/components/AlertModals';
import { Box, Collapse, Typography } from '@mui/material';
import { useSingleAssociationsTicket } from './useSingleAssociationsTicket';
import { CustomChip } from '@/components/Chip/CustomChip';

export const SingleAssociationsTicket = (props: any) => {
  const {
    setShowDisassociate,
    theme,
    showDisassociate,
    setDisassociateModal,
    disassociateModal,
    handleSubmitDissociate,
    associationsItem,
    postRemoveAssociateTicketsStatus,
  } = useSingleAssociationsTicket(props);

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        boxShadow={2}
        borderLeft={`.5rem solid ${theme?.palette?.primary?.main}`}
        borderRadius={'.6rem'}
        my={2}
        padding={'.7rem'}
        onMouseOver={() => setShowDisassociate(true)}
        onMouseOut={() => setShowDisassociate(false)}
      >
        <Box display={'flex'} alignItems={'center'} gap={1.2}>
          <Collapse orientation="horizontal" in={showDisassociate}>
            <Box
              display={'flex'}
              alignItems={'center'}
              sx={{ cursor: 'pointer' }}
              onClick={() => setDisassociateModal(true)}
            >
              <IndeterminateCheckBoxRoundedIcon
                sx={{ color: theme?.palette?.custom?.main }}
              />
            </Box>
          </Collapse>
          <Typography>
            {associationsItem?.ticketIdNumber}-{associationsItem?.subject}
          </Typography>
        </Box>
        <CustomChip
          label={associationsItem?.status}
          color="success"
          textColor="common.white"
        />
      </Box>
      <AlertModals
        open={disassociateModal}
        handleClose={() => setDisassociateModal(false)}
        type="Disassociate"
        message="You are about to disassociate this service "
        submitBtnText="Disassociate"
        handleSubmitBtn={handleSubmitDissociate}
        loading={postRemoveAssociateTicketsStatus?.isLoading}
        disableCancelBtn={postRemoveAssociateTicketsStatus?.isLoading}
      />
    </>
  );
};
