import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  Theme,
  Divider,
  Tab,
  Modal,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { styles } from '../CreateTemplatesForm.style';
import {
  dynamicallyFormDefaultValues,
  dynamicallyFormValidationSchema,
} from '../CreateTemplatesForm.data';
import { useState } from 'react';
import {
  BackArrowIcon,
  CloseDrawerIcon,
  DeleteIcon,
  DragSharedIcon,
  FacebookTemplateIcon,
  InstagramTemplateIcon,
  LaptopIcon,
  LaptopWhiteIcon,
  LinkedinTemplateIcon,
  MobileTabIcon,
  MobileWhiteIcon,
  TwitterTemplateIcon,
} from '@/assets/icons';
import { isNullOrEmpty } from '@/utils';

import { AIR_MARKETER } from '@/routesConstants/paths';
import { useRouter } from 'next/router';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Link from 'next/link';
import Image from 'next/image';
import { LogoImage } from '@/assets/images';

const InnerTab = ({ dynamicFields, deleteField }: any) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const theme = useTheme<Theme>();
  const dynamicallyFormForm = useForm({
    resolver: yupResolver(dynamicallyFormValidationSchema),
    defaultValues: dynamicallyFormDefaultValues,
  });

  const onSubmit = async () => {};

  const { handleSubmit } = dynamicallyFormForm;

  const [value, setValue] = useState('laptop');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={styles?.subDiv}>
      <Grid container sx={styles.headerBar}>
        <Grid item xs={12} md={4} lg={6}>
          <Box display={'flex'} alignContent={'center'}>
            <Button
              className="small"
              sx={{ color: '#374151', fontWeight: '500' }}
              startIcon={<BackArrowIcon />}
              onClick={() => router?.push(AIR_MARKETER.EMAIL_TEMPLATES)}
            ></Button>
            <Typography variant="h5"> Employee Email</Typography>
          </Box>
        </Grid>
        <Grid
          item
          lg={6}
          xs={12}
          sx={{ paddingTop: '0px !important', textAlign: 'end' }}
        >
          <Button
            variant="outlined"
            className="small"
            sx={{
              marginLeft: '15px',
              color: theme?.palette?.custom?.main,
              border: `1px solid ${theme?.palette?.custom?.dark}`,
            }}
            onClick={() => setOpenModal(true)}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            className="small"
            sx={{ marginLeft: '15px' }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
      {isNullOrEmpty(dynamicFields) && (
        <Box
          sx={{
            border: '3px dotted #b9b9b9',
            marginTop: '60px',
            padding: '50px',
            borderRadius: '5px',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: theme?.palette?.custom?.dark_grey,
            }}
          >
            Please Create your Form from side bar menu selection.
          </Typography>
        </Box>
      )}
      <FormProvider
        methods={dynamicallyFormForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={4} sx={{ marginTop: '0px' }}>
          {dynamicFields?.map((item: any, index: any) => (
            <Grid
              item
              xs={12}
              md={item?.md}
              key={uuidv4()}
              sx={{
                padding: '30px !important',
                marginLeft: '40px !important',
                position: 'relative',
                cursor: 'pointer',
                border: `1px solid ${
                  hoveredIndex === index
                    ? theme?.palette?.primary?.main
                    : 'white'
                }`,
                borderRadius: '5px',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <Box sx={styles?.hoverEffect}>
                  <DragSharedIcon />
                  <Box
                    onClick={() => {
                      deleteField(index);
                    }}
                  >
                    {' '}
                    <DeleteIcon />
                  </Box>
                </Box>
              )}
              {item?.componentProps?.button && (
                <Button variant="contained">
                  {item?.componentProps?.text}
                </Button>
              )}
              {item?.componentProps?.Divider && (
                <Divider
                  sx={{
                    border: `1px solid ${theme?.palette?.custom?.light_gray_color}`,
                  }}
                />
              )}
              <item.component
                {...item?.componentProps}
                size={'small'}
              ></item.component>
            </Grid>
          ))}
        </Grid>
      </FormProvider>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          backgroundColor: '#00000038 !important',
        }}
      >
        <Box sx={styles?.parentBox}>
          <Box
            sx={{
              marginBottom: '20px',
              display: 'flex',
              gap: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="h5">Preview</Typography>
              <Typography>Your Preview will appear here</Typography>
            </Box>
            <Box
              onClick={() => setOpenModal(false)}
              sx={{ width: '30px', height: '40px', cursor: 'pointer' }}
            >
              <CloseDrawerIcon />
            </Box>
          </Box>

          <TabContext value={value}>
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                  width: 'fit-content',
                  backgroundColor: '#8DFAEA1F',
                  borderRadius: '7px',
                  border: '1px solid #E9EBF0',
                  margin: 'auto',
                  marginBottom: '10px',
                }}
              >
                <Tab
                  label={
                    value === 'laptop' ? <LaptopWhiteIcon /> : <LaptopIcon />
                  }
                  value="laptop"
                  sx={{
                    marginRight: '10px !important',
                    backgroundColor:
                      value === 'laptop' && theme?.palette?.primary?.main,
                    margin: '6px',
                    borderRadius: '7px',
                  }}
                />
                <Tab
                  label={
                    value === 'mobile' ? <MobileWhiteIcon /> : <MobileTabIcon />
                  }
                  value="mobile"
                  sx={{
                    backgroundColor:
                      value === 'mobile' && theme?.palette?.primary?.main,
                    margin: '6px',
                    borderRadius: '7px',
                  }}
                />
              </TabList>
            </Box>
            <TabPanel value="laptop">
              <Box sx={{ padding: '20px' }}>
                <Box
                  display={'flex'}
                  alignItems={'center'}
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
                      sx={{
                        color: theme?.palette?.custom?.text_slate_blue,
                        fontWeight: '700',
                      }}
                    >
                      NatureFreek
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme?.palette?.custom?.main,
                        fontWeight: '500',
                      }}
                    >
                      5 min
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ padding: '20px', backgroundColor: '#F9FAFB' }}>
                  <Typography
                    variant="body3"
                    sx={{ display: 'block', marginBottom: '15px' }}
                  >
                    Welcome friend, thank the reader for signing up to your
                    newsletter and welcome them on board, Below your
                    introduction, add a few links to some popular pages or posts
                    on your website to give the reader an idea of what’s to
                    come.
                  </Typography>
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.blue?.main, display: 'block' }}
                  >
                    1- Showcase your best stories
                  </Typography>
                  <Typography
                    variant="body3"
                    sx={{
                      color: theme?.palette?.custom?.cadet_color,
                      display: 'block',
                    }}
                  >
                    Give an overview of an existing blog post or a popular story
                    from a previousNewsletter. Be sure to add link so the reader
                    can learn more.
                  </Typography>

                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.blue?.main, display: 'block' }}
                  >
                    2- Showcase your best stories
                  </Typography>
                  <Typography
                    variant="body3"
                    sx={{
                      color: theme?.palette?.custom?.cadet_color,
                      display: 'block',
                    }}
                  >
                    Give an overview of an existing blog post or a popular story
                    from a previousNewsletter. Be sure to add link so the reader
                    can learn more.
                  </Typography>

                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.blue?.main, display: 'block' }}
                  >
                    3- Showcase your best stories
                  </Typography>
                  <Typography
                    variant="body3"
                    sx={{
                      color: theme?.palette?.custom?.cadet_color,
                      display: 'block',
                    }}
                  >
                    Give an overview of an existing blog post or a popular story
                    from a previousNewsletter. Be sure to add link so the reader
                    can learn more.
                  </Typography>

                  <Typography
                    variant="body3"
                    sx={{
                      color: theme?.palette?.blue?.main,
                      display: 'block',
                      marginY: '15px',
                    }}
                  >
                    Welcome friend, thank the reader for signing up to your
                    newsletter and welcome them on board, Below your
                    introduction, add a few links.
                  </Typography>
                  <Typography variant="body3">
                    {' '}
                    Go to my account{' '}
                    <Link href="/" style={{ color: '#D1D5DB' }}>
                      Wellness.thyrocare.com
                    </Link>
                  </Typography>
                  <Divider
                    sx={{ border: '1px solid #000000', marginY: '15px' }}
                  />
                  <Image src={LogoImage} alt="logo" />
                  <Typography
                    variant="body2"
                    sx={{ color: theme?.palette?.blue?.main, display: 'block' }}
                  >
                    Thanks,
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme?.palette?.blue?.main, display: 'block' }}
                  >
                    Best Regards,
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme?.palette?.blue?.main, display: 'block' }}
                  >
                    Hycholic.ltd
                  </Typography>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    sx={{ marginTop: '10px' }}
                  >
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      sx={{
                        backgroundColor: theme?.palette?.primary?.main,
                        borderRadius: '20px',
                        padding: '5px',
                        width: '24px',
                        height: '24px',
                      }}
                    >
                      <FacebookTemplateIcon />
                    </Box>
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      sx={{
                        backgroundColor: theme?.palette?.primary?.main,
                        borderRadius: '20px',
                        padding: '5px',
                        width: '24px',
                        height: '24px',
                        marginLeft: '6px',
                      }}
                    >
                      <InstagramTemplateIcon />
                    </Box>
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      sx={{
                        backgroundColor: theme?.palette?.primary?.main,
                        borderRadius: '20px',
                        padding: '5px',
                        width: '24px',
                        height: '24px',
                        marginLeft: '6px',
                      }}
                    >
                      <LinkedinTemplateIcon />
                    </Box>
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      sx={{
                        backgroundColor: theme?.palette?.primary?.main,
                        borderRadius: '20px',
                        padding: '5px',
                        width: '24px',
                        height: '24px',
                        marginLeft: '6px',
                      }}
                    >
                      <TwitterTemplateIcon />
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button variant="contained" className="small">
                      Click here to continue
                    </Button>{' '}
                  </Box>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value="mobile">
              <Box
                sx={{
                  padding: '20px',
                  width: '50%',
                  margin: 'auto',
                  border: '10px solid black',
                  borderRadius: '20px',
                }}
              >
                <Box
                  display={'flex'}
                  alignItems={'center'}
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
                      sx={{
                        color: theme?.palette?.custom?.text_slate_blue,
                        fontWeight: '700',
                      }}
                    >
                      NatureFreek
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme?.palette?.custom?.main,
                        fontWeight: '500',
                      }}
                    >
                      5 min
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="body3"
                    sx={{ display: 'block', marginBottom: '15px' }}
                  >
                    Welcome friend, thank the reader for signing up to your
                    newsletter and welcome them on board, Below your
                    introduction, add a few links to some popular pages or posts
                    on your website to give the reader an idea of what’s to
                    come.
                  </Typography>
                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.blue?.main, display: 'block' }}
                  >
                    1- Showcase your best stories
                  </Typography>
                  <Typography
                    variant="body3"
                    sx={{
                      color: theme?.palette?.custom?.cadet_color,
                      display: 'block',
                    }}
                  >
                    Give an overview of an existing blog post or a popular story
                    from a previousNewsletter. Be sure to add link so the reader
                    can learn more.
                  </Typography>

                  <Typography
                    variant="body3"
                    sx={{ color: theme?.palette?.blue?.main, display: 'block' }}
                  >
                    2- Showcase your best stories
                  </Typography>
                  <Typography
                    variant="body3"
                    sx={{
                      color: theme?.palette?.custom?.cadet_color,
                      display: 'block',
                    }}
                  >
                    Give an overview of an existing blog post or a popular story
                    from a previousNewsletter. Be sure to add link so the reader
                    can learn more.
                  </Typography>

                  <Image src={LogoImage} alt="logo" />
                  <Typography
                    variant="body2"
                    sx={{ color: theme?.palette?.blue?.main, display: 'block' }}
                  >
                    Thanks,
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme?.palette?.blue?.main, display: 'block' }}
                  >
                    Best Regards,
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme?.palette?.blue?.main, display: 'block' }}
                  >
                    Hycholic.ltd
                  </Typography>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    sx={{ marginTop: '10px' }}
                  >
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      sx={{
                        backgroundColor: theme?.palette?.primary?.main,
                        borderRadius: '20px',
                        padding: '5px',
                        width: '24px',
                        height: '24px',
                      }}
                    >
                      <FacebookTemplateIcon />
                    </Box>
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      sx={{
                        backgroundColor: theme?.palette?.primary?.main,
                        borderRadius: '20px',
                        padding: '5px',
                        width: '24px',
                        height: '24px',
                        marginLeft: '6px',
                      }}
                    >
                      <InstagramTemplateIcon />
                    </Box>
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      sx={{
                        backgroundColor: theme?.palette?.primary?.main,
                        borderRadius: '20px',
                        padding: '5px',
                        width: '24px',
                        height: '24px',
                        marginLeft: '6px',
                      }}
                    >
                      <LinkedinTemplateIcon />
                    </Box>
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      sx={{
                        backgroundColor: theme?.palette?.primary?.main,
                        borderRadius: '20px',
                        padding: '5px',
                        width: '24px',
                        height: '24px',
                        marginLeft: '6px',
                      }}
                    >
                      <TwitterTemplateIcon />
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'center', marginTop: '10px' }}>
                    <Button variant="contained" className="small">
                      Click here to continue
                    </Button>{' '}
                  </Box>
                </Box>
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Modal>
    </Box>
  );
};

export default InnerTab;
