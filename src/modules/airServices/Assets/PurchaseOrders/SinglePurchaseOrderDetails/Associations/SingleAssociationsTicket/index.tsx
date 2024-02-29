import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import { AlertModals } from '@/components/AlertModals';
import { Box, Chip, Collapse, Typography } from '@mui/material';
import { useSingleAssociationsTicket } from './useSingleAssociationsTicket';

export const SingleAssociationsTicket = (props: any) => {
  const {
    setShowDisassociate,
    theme,
    showDisassociate,
    setDisassociateModal,
    disassociateModal,
    handleSubmitDissociate,
    associationsItem,
    deleteAssociationStatus,
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
        <Chip
          label={associationsItem?.status}
          color="success"
          sx={{ color: 'common.white' }}
        />
      </Box>
      <AlertModals
        open={disassociateModal}
        handleClose={() => setDisassociateModal(false)}
        type="Dissociate"
        message="You are about to dissociate this service "
        submitBtnText="Disassociate"
        handleSubmitBtn={handleSubmitDissociate}
        loading={deleteAssociationStatus?.isLoading}
      />
    </>
  );
};
