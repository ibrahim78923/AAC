import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import { AlertModals } from '@/components/AlertModals';
import { Box, Button, Collapse, Typography } from '@mui/material';
import { useSingleAssociationsTicket } from './useSingleAssociationsTicket';

export const SingleAssociationsTicket = ({ associationsItem }: any) => {
  const {
    setShowDisassociate,
    theme,
    showDisassociate,
    setDisassociateModal,
    disassociateModal,
    handleSubmitDissociate,
  } = useSingleAssociationsTicket();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        boxShadow={'4px 4px 4px rgba(0, 0, 0, 0.1)'}
        borderLeft={`.5rem solid ${theme?.palette?.primary?.main}`}
        borderRadius={'.6rem'}
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
          <Typography>{associationsItem?.title}</Typography>
        </Box>
        <Button
          sx={{
            backgroundColor: theme?.palette?.primary?.light,
            borderRadius: '1rem',
          }}
        >
          {associationsItem?.buttonText}
        </Button>
      </Box>
      <AlertModals
        open={disassociateModal}
        handleClose={() => setDisassociateModal(false)}
        type="Dissociate"
        message="You are about to dissociate this service "
        submitBtnText="Disassociate"
        handleSubmitBtn={handleSubmitDissociate}
      />
    </>
  );
};
