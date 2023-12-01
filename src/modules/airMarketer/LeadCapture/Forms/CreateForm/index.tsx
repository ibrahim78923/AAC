import { Box, Button, Grid, Tab, Typography } from '@mui/material';
import { styles } from './CreateForm.style';
import {
  BlackDeleteIcon,
  EditFormIcon,
  MobileFormIcon,
  MonitorIcon,
  PageIcon,
  StyleFormIcon,
} from '@/assets/icons';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useRouter } from 'next/router';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';

const CreateForm = () => {
  const router = useRouter();

  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid sx={styles.mainDiv}>
      <Grid container gap={1} sx={styles.headerBar}>
        <Grid item xs={12} md={6} lg={3}>
          <Button
            className="small"
            sx={{ color: '#374151', marginRight: '20px', fontWeight: '500' }}
            startIcon={<BlackDeleteIcon />}
            onClick={() => router?.back()}
          >
            {' '}
            Back to all forms
          </Button>

          <Typography variant="body3" sx={styles.saveChangesBtn}>
            {' '}
            <FiberManualRecordIcon
              sx={{ fontSize: '12px', marginRight: '5px' }}
            />{' '}
            Changes Saved
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Button
            className="small"
            endIcon={<EditFormIcon />}
            sx={{
              backgroundColor: '#E9EAEF',
              color: '#1F305D',
              borderRadius: '5px',
              fontWeight: '500',
            }}
          >
            New Form
          </Button>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Button
            variant="outlined"
            className="small"
            color="inherit"
            startIcon={<StyleFormIcon />}
            sx={{
              borderRadius: '5px',
              border: '1px solid #D1D5DB',
              fontWeight: '500',
            }}
          >
            Styling
          </Button>
          <Button
            variant="contained"
            className="small"
            sx={{ marginLeft: '10px', fontWeight: '500' }}
          >
            Create Form
          </Button>
        </Grid>
      </Grid>

      <Grid container gap={1}>
        <Grid item xs={12} md={6} lg={8}>
          <Box sx={{ width: '94%', margin: 'auto' }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Button
                  variant="contained"
                  className="small"
                  sx={{
                    marginRight: '10px',
                    fontWeight: '500',
                    marginTop: '25px',
                  }}
                  startIcon={<PageIcon />}
                >
                  All Pages
                </Button>

                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Profile" value="1" />
                  <Tab label="Success" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box
                  sx={{
                    backgroundColor: 'white',
                    height: '75vh',
                    padding: '30px',
                    marginTop: '30px',
                  }}
                >
                  <Button
                    className="small"
                    endIcon={<EditFormIcon />}
                    sx={{
                      backgroundColor: '#E9EAEF',
                      color: '#1F305D',
                      borderRadius: '5px',
                      fontWeight: '500',
                    }}
                  >
                    Profile
                  </Button>

                  <Box
                    sx={{
                      backgroundColor: '#F9FAFB',
                      borderRadius: '5px',
                      width: 'fit-content',
                      margin: 'auto',
                      padding: '10px',
                      marginTop: '-45px',
                    }}
                  >
                    <Button
                      className="small"
                      startIcon={<MobileFormIcon />}
                      sx={{
                        color: '#38CAB5',
                        backgroundColor: '#D7F4F0',
                        borderRadius: '5px',
                      }}
                    >
                      {' '}
                      Mobile
                    </Button>
                    <Button
                      className="small"
                      startIcon={<MonitorIcon />}
                      sx={{ color: '#9CA3AF' }}
                    >
                      {' '}
                      Desktop
                    </Button>
                  </Box>

                  {/* <Box sx={styles.subDiv}>

                    <TabContext value={Innervalue}>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleInnerChange} aria-label="lab API tabs example">
                          <Tab label="Mobile" value="3" />
                          <Tab label="Desktop" value="4" />
                        </TabList>
                      </Box>

                      <TabPanel value="3">
                        <InnerTab />
                      </TabPanel>

                      <TabPanel value="4">
                        Desktop
                      </TabPanel>
                    </TabContext>

                  </Box> */}
                </Box>
              </TabPanel>
              <TabPanel value="2">Success</TabPanel>
            </TabContext>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}></Grid>
      </Grid>
    </Grid>
  );
};

export default CreateForm;
