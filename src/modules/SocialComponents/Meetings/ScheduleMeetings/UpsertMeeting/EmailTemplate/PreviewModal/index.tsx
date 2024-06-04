import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
  Tab,
  Divider,
  Button,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import LaptopIcon from '@mui/icons-material/Laptop';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Image from 'next/image';
import {
  FacebookTemplateIcon,
  InstagramTemplateIcon,
  LinkedinTemplateIcon,
  TwitterTemplateIcon,
} from '@/assets/icons';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { LogoImage, mobilePhoneImg } from '@/assets/images';
import { previewData } from '../EmailTemplate.data';
import { SCREENS } from '@/constants/strings';

const SocialIcons = () => (
  <Box display="flex" alignItems="center" sx={{ marginTop: '10px' }}>
    {[
      FacebookTemplateIcon,
      InstagramTemplateIcon,
      LinkedinTemplateIcon,
      TwitterTemplateIcon,
    ]?.map((Icon: any, idx: number) => (
      <Box
        key={Icon}
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: 'primary.main',
          borderRadius: '20px',
          padding: '5px',
          width: '24px',
          height: '24px',
          marginLeft: idx > 0 ? '6px' : 0,
        }}
      >
        <Icon />
      </Box>
    ))}
  </Box>
);

const DataList = ({ data }: any) => (
  <>
    {data?.map((item: any, index: number) => (
      <Box key={item?.id} sx={{ marginBottom: '15px' }}>
        <Typography
          variant="body2"
          sx={{ display: 'block', marginBottom: '5px', color: 'blue.main' }}
        >
          {index + 1}- {item?.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'custom.cadetColor' }}>
          {item?.content}
        </Typography>
      </Box>
    ))}
  </>
);

const PreviewModal = (props: any) => {
  const { openDialog, setOpenDialog, value, handleChange } = props;
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
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ marginBottom: '15px' }}
                >
                  <Image
                    src={LogoImage}
                    alt="logo"
                    style={{
                      marginRight: '15px',
                      borderRadius: '25px',
                      border: '1px solid black',
                    }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: 'text.slateBlue', fontWeight: '700' }}
                    >
                      NatureFreek
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'custom.main', fontWeight: '500' }}
                    >
                      5 min
                    </Typography>
                  </Box>
                </Box>
                <DataList data={previewData} />
                <Divider sx={{ border: '1px solid black', my: '15px' }} />
                <Image
                  src={LogoImage}
                  alt="logo"
                  style={{
                    marginRight: '15px',
                    borderRadius: '25px',
                    border: '1px solid black',
                  }}
                />
                <Typography variant="body2" sx={{ color: 'blue.main' }}>
                  Thanks,
                </Typography>
                <Typography variant="body2" sx={{ color: 'blue.main' }}>
                  Best Regards,
                </Typography>
                <Typography variant="body2" sx={{ color: 'blue.main' }}>
                  Hycholic.ltd
                </Typography>
                <SocialIcons />
                <Box sx={{ textAlign: 'center', pt: 0.5 }}>
                  <Button variant="contained" className="small" disabled>
                    Click here to continue
                  </Button>
                </Box>
              </Box>
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
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{ margin: '50px 0 10px 20px' }}
                >
                  <Image
                    src={LogoImage}
                    alt="logo"
                    style={{
                      marginRight: '15px',
                      borderRadius: '25px',
                      border: '1px solid black',
                    }}
                  />
                  <Box display={'flex'} flexDirection={'column'}>
                    <Typography
                      variant="body3"
                      sx={{ color: 'text.slateBlue', fontWeight: '700' }}
                    >
                      NatureFreek
                    </Typography>
                    <Typography
                      variant="body4"
                      sx={{ color: 'custom.main', fontWeight: '500' }}
                    >
                      5 min
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  {previewData?.map((item: any, index: number) => (
                    <Box
                      key={item?.id}
                      sx={{ marginBottom: '15px', px: '20px' }}
                    >
                      <Typography
                        variant="body2"
                        fontFamily={'500'}
                        sx={{
                          display: 'block',
                          marginBottom: '5px',
                          color: 'blue.main',
                        }}
                      >
                        {index + 1}- {item?.title}
                      </Typography>
                      <Typography
                        variant="body3"
                        sx={{ color: 'custom.cadetColor' }}
                      >
                        {item?.content}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ border: '1px solid black', my: '15px' }} />
                <Box px={'20px'}>
                  <Image
                    src={LogoImage}
                    alt="logo"
                    style={{
                      marginRight: '15px',
                      borderRadius: '25px',
                      border: '1px solid black',
                    }}
                  />
                  <Typography variant="body2" sx={{ color: 'blue.main' }}>
                    Thanks,
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'blue.main' }}>
                    Best Regards,
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'blue.main' }}>
                    Hycholic.ltd
                  </Typography>
                  <SocialIcons />
                  <Box sx={{ textAlign: 'center', padding: '25px 0' }}>
                    <Button variant="contained" className="small" disabled>
                      Click here to continue
                    </Button>
                  </Box>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreviewModal;
