import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { CloseModalIcon } from '@/assets/icons';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import { useState } from 'react';
import Image from 'next/image';
import { UserAvatarImage } from '@/assets/images';

const CallBackModal = () => {
  const [callBackModal, setCallBackModal] = useState(false);
  return (
    <>
      <PhoneCallbackIcon
        sx={{ cursor: 'pointer' }}
        onClick={() => setCallBackModal(true)}
      />
      {callBackModal && (
        <Dialog
          open={callBackModal}
          onClose={() => setCallBackModal(false)}
          aria-labelledby="responsive-dialog-title"
          PaperProps={{
            style: {
              maxWidth: 528,
              width: '100%',
              borderRadius: 12,
            },
          }}
        >
          <DialogTitle
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingBottom={2.4}
          >
            <Typography variant="body2" color="custom.main" fontWeight={500}>
              Call Back
            </Typography>
            <Box
              onClick={() => setCallBackModal(false)}
              sx={{
                cursor: 'pointer',
              }}
            >
              <CloseModalIcon />
            </Box>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="custom.main" fontWeight={500}>
              Requested at: 11 Dec, 2023, 7:48 PM
            </Typography>
            <Box
              bgcolor="primary.light"
              my={1}
              borderRadius={3}
              p={1}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <Box sx={{ width: 40, height: 40, borderRadius: '50%' }}>
                  <Image
                    src={UserAvatarImage}
                    alt="Avatar"
                    width={40}
                    height={40}
                  />
                </Box>
                <Box ml={1}>
                  <Typography
                    variant="body1"
                    color="custom.main"
                    fontWeight={600}
                  >
                    John Doe
                  </Typography>
                  <Typography variant="body2" color="custom.main">
                    +12059904889
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                gap={1}
              >
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  disableElevation
                  sx={{ height: 28, width: 82 }}
                >
                  Callback
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  disableElevation
                  sx={{ height: 28, width: 82 }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
            <Typography variant="body2" color="custom.main" fontWeight={500}>
              Queue: US Support
            </Typography>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default CallBackModal;
