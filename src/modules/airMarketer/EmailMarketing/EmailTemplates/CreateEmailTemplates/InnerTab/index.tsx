import {
  Box,
  Button,
  Grid,
  Typography,
  useTheme,
  Theme,
  Divider,
  Tab,
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
  DeleteIcon,
  DragSharedIcon,
  LaptopIcon,
  LaptopWhiteIcon,
  MobileTabIcon,
  MobileWhiteIcon,
} from '@/assets/icons';
import { isNullOrEmpty } from '@/utils';

import { AIR_MARKETER } from '@/routesConstants/paths';
import { useRouter } from 'next/router';
import CommonModal from '@/components/CommonModal';
import { TabContext, TabList, TabPanel } from '@mui/lab';

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

      <CommonModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleCancel={() => setOpenModal(false)}
        handleSubmit={() => setOpenModal(false)}
        title="Preview"
      >
        <Box sx={{ margin: '20px 0' }}>
          <Typography>Your Preview will appear here</Typography>

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
              <Typography
                variant="body3"
                sx={{ display: 'block', marginY: '20px' }}
              >
                Welcome friend, thank the reader for signing up to your
                newsletter and welcome them on board, Below your introduction,
                add a few links to some popular pages or posts on your website
                to give the reader an idea of what’s to come.
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
                from a previousNewsletter. Be sure to add link so the reader can
                learn more.
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
                from a previousNewsletter. Be sure to add link so the reader can
                learn more.
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
                from a previousNewsletter. Be sure to add link so the reader can
                learn more.
              </Typography>
            </TabPanel>
            <TabPanel value="mobile">Mobile</TabPanel>
          </TabContext>
        </Box>
      </CommonModal>
    </Box>
  );
};

export default InnerTab;
