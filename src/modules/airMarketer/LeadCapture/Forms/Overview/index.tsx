import {
  AlertModalCloseIcon,
  CopyIcon,
  EmbedCodeIcon,
  EmbedcodeTickIcon,
} from '@/assets/icons';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { styles } from './Overview.style';
import { useState } from 'react';

const Overview = () => {
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <Box>
      <Typography variant="h5" sx={{ marginBottom: '25px', color: '#374151' }}>
        Basic Info
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={8} md={4}>
          <Typography
            variant="body2"
            sx={{ fontWeight: '500', color: '#4B5563' }}
          >
            Name
          </Typography>
          <TextField
            placeholder="Sign up loyalty program"
            sx={styles.inputStyle}
          />
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <Typography
            variant="body2"
            sx={{ fontWeight: '500', color: '#4B5563' }}
          >
            URL
          </Typography>
          <TextField
            disabled
            value="https://forms.activitytok.eu/forms/"
            sx={styles.inputStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <CopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Button
        variant="outlined"
        startIcon={<EmbedCodeIcon />}
        onClick={() => setOpenAlert(true)}
        sx={{ background: '#EBFAF8', marginTop: '25px' }}
        className="medium"
      >
        Embed Code
      </Button>
      <Dialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        fullWidth
        maxWidth={'sm'}
      >
        <DialogTitle sx={{ padding: '20px 20px 0px' }}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={1}
          >
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <EmbedcodeTickIcon />
              <Typography variant="h3">Embed Code</Typography>
            </Box>

            <Box sx={{ cursor: 'pointer' }} onClick={() => setOpenAlert(false)}>
              <AlertModalCloseIcon />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ padding: '20px' }}>
          <Box
            sx={{
              marginTop: '1rem',
              border: '1px solid #D1D5DB',
              padding: '15px',
              borderRadius: '8px',
              position: 'relative',
            }}
          >
            <Typography variant="body2" sx={{ color: '#9CA3AF', width: '80%' }}>
              Script Embed Code Script text Embed Code Script text Embed Code
              Script text Embed Code Script text Embed Code Script text Embed
              Code Script text Script
            </Typography>

            <Box
              sx={{
                position: 'absolute',
                right: '13px',
                top: '13px',
                cursor: 'pointer',
              }}
            >
              <CopyIcon />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Overview;
