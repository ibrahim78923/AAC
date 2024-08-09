import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Tab,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import LaptopIcon from '@mui/icons-material/Laptop';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { mobilePhoneImg } from '@/assets/images';
import { SCREENS } from '@/constants/strings';

const PreviewModal = (props: any) => {
  const { openDialog, setOpenDialog, value, handleChange, editorData } = props;
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        PaperProps={{
          sx: {
            maxHeight: '100vh',
          },
        }}
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography variant="h5">Preview</Typography>
              <Typography>Your Preview will appear here</Typography>
            </Box>
            <IconButton onClick={() => setOpenDialog(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TabContext value={value}>
            <Box>
              <TabList
                onChange={handleChange}
                sx={{
                  width: 'fit-content',
                  backgroundColor: 'primary.lighter',
                  borderRadius: '7px',
                  border: `1px solid grey[300]`,
                  margin: 'auto',
                  marginBottom: '10px',
                }}
              >
                <Tab
                  label={
                    value === SCREENS?.LAPTOP ? (
                      <LaptopMacIcon />
                    ) : (
                      <LaptopIcon />
                    )
                  }
                  value="laptop"
                  sx={{
                    marginRight: '10px !important',
                    backgroundColor:
                      value === SCREENS?.LAPTOP && 'primary.main',
                    margin: '6px',
                    borderRadius: '7px',
                  }}
                />
                <Tab
                  label={
                    value === SCREENS?.MOBILE ? (
                      <SmartphoneIcon />
                    ) : (
                      <SmartphoneIcon />
                    )
                  }
                  value="mobile"
                  sx={{
                    backgroundColor:
                      value === SCREENS?.MOBILE && 'primary.main',
                    margin: '6px',
                    borderRadius: '7px',
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="laptop">
              <Box
                sx={{
                  padding: '20px',
                }}
                dangerouslySetInnerHTML={{ __html: editorData }}
              />
            </TabPanel>
            <TabPanel
              value="mobile"
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Box
                sx={{
                  padding: '15px',
                  width: '60%',
                  backgroundImage: `url(${mobilePhoneImg.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '70vh',
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ margin: '60px 0 10px 20px' }}
                  dangerouslySetInnerHTML={{ __html: editorData }}
                />
              </Box>
            </TabPanel>
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreviewModal;
