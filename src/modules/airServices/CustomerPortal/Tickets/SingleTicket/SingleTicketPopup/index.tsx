import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { v4 as uuidv4 } from 'uuid';
import { singleTicketPopupDataArray } from './SingleTicketPopup.data';
import { AlertModalCloseIcon } from '@/assets/icons';
import { useSingleTicketPopup } from './useSingleTicketPopup';

export const SingleTicketPopup = (props: any) => {
  const { openPopup, setOpenPopup } = props;
  const { methods, handleSubmit, onSubmit } = useSingleTicketPopup(props);

  return (
    <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
      <DialogTitle>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          paddingBottom={'1rem'}
        >
          <Typography variant="h5">Share</Typography>
          <AlertModalCloseIcon
            onClick={() => {
              setOpenPopup(false);
            }}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {singleTicketPopupDataArray?.map((item: any) => (
            <item.component {...item?.componentProps} key={uuidv4()}>
              {item?.componentProps?.select &&
                item?.options?.map((option: any) => (
                  <option key={uuidv4()} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
            </item.component>
          ))}
        </FormProvider>
      </DialogContent>
      <DialogActions sx={{ height: '2rem' }}>
        <Box
          display={'flex'}
          justifyContent={'flex-end'}
          marginBottom={'2rem'}
          gap={'1rem'}
        >
          <Button variant="outlined" onClick={() => setOpenPopup(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onSubmit}>
            OK
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
