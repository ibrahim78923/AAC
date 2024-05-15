import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function ViewEnquiry({ isModalOpen, onClose }: any) {
  return (
    <Dialog open={isModalOpen?.viewOpen} onClose={() => onClose?.()} fullWidth>
      <DialogTitle
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={1}
      >
        <Typography variant={'h3'} component={'div'}>
          Enquiry Comment
        </Typography>
        <CloseIcon sx={{ cursor: 'pointer' }} onClick={() => onClose?.()} />
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Typography variant={'h6'}>{isModalOpen?.data?.[0]?.query}</Typography>
      </DialogContent>
    </Dialog>
  );
}
