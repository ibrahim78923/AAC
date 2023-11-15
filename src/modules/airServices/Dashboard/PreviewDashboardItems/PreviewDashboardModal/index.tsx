import { useState } from 'react';
import { AlertModalCloseIcon, EyeIcon } from '@/assets/icons';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { v4 as uuidv4 } from 'uuid';
import { previewDashboard } from '../../CreateDashboard/CreateDashboard.data';
import { styles } from './PreviewDashboardModal.styles';

export const PreviewDashboardModal = ({
  dashboardItems,
  type = 'Create',
}: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const theme = useTheme();
  return (
    <>
      {type === 'Create' ? (
        <Box onClick={() => setOpen(true)} sx={{ cursor: 'pointer' }}>
          <VisibilityRoundedIcon sx={{ color: 'blue.main' }} />
        </Box>
      ) : (
        <Button
          variant="text"
          sx={styles(theme)?.previewDashboardButton}
          onClick={() => setOpen(true)}
          startIcon={<EyeIcon />}
        >
          Preview Dashboard
        </Button>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        PaperProps={{
          sx: {
            maxWidth: 1175,
            bgcolor: theme?.palette?.custom?.pale_grayish_blue,
          },
        }}
      >
        <DialogTitle>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
            flexWrap={'wrap'}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={1}
              flexWrap={'wrap'}
            >
              <Typography variant="h3">Service</Typography>
            </Box>
            <Box sx={{ cursor: 'pointer' }} onClick={() => setOpen(false)}>
              <AlertModalCloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} mt={1}>
            {dashboardItems?.map((item: any) => (
              <Grid item xs={12} key={uuidv4()}>
                {previewDashboard?.[item as string]}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
