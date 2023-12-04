import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Tab,
  TextField,
  Typography,
} from '@mui/material';
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
import InnerTab from './InnerTab';

const CreateForm = () => {
  const [value, setValue] = useState('1');
  const [showView, setShowView] = useState(true);
  const [editFormName, setEditFormName] = useState(true);
  const [pageName, setPageName] = useState('Profile');

  const router = useRouter();
  const { formData }: any = router.query;

  const formValue = JSON?.parse(formData);
  const [inputValue, setInputValue] = useState(formValue?.Name);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    if (value === '1') {
      setPageName('Success');
    } else {
      setPageName('Profile');
    }
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
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{
              backgroundColor: '#E9EAEF',
              borderRadius: '5px',
              '& input': {
                width: '80px',
                height: '6px',
                color: '#1F305D',
                fontWeight: '500',
              },
            }}
            disabled={editFormName}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setEditFormName(!editFormName);
                    }}
                  >
                    <EditFormIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
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
                  sx={{
                    marginTop: '25px',
                    marginLeft: '30px',
                    '& .MuiTabs-indicator': {
                      display: 'none', // Hides the indicator line
                    },
                  }}
                >
                  <Tab
                    label="Profile"
                    value="1"
                    sx={{
                      backgroundColor: '#F9FAFB',
                      '&.Mui-selected': {
                        backgroundColor: '#e0f7f4',
                        padding: '10px',
                      },
                    }}
                  />
                  <Tab
                    label="Success"
                    value="2"
                    sx={{
                      backgroundColor: '#F9FAFB',
                      '&.Mui-selected': {
                        backgroundColor: '#e0f7f4',
                        padding: '10px',
                      },
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Box
                  sx={{
                    backgroundColor: showView ? 'white' : 'tranparent',
                    height: '75vh',
                    padding: '30px',
                    marginTop: '30px',
                  }}
                >
                  <TextField
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                    sx={{
                      backgroundColor: '#E9EAEF',
                      borderRadius: '5px',
                      '& input': {
                        width: '70px',
                        height: '6px',
                        color: '#1F305D',
                        fontWeight: '500',
                      },
                    }}
                    disabled={editFormName}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              setEditFormName(!editFormName);
                            }}
                          >
                            <EditFormIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box
                    sx={{
                      backgroundColor: '#F9FAFB',
                      borderRadius: '5px',
                      width: 'fit-content',
                      margin: 'auto',
                      padding: '10px',
                      marginTop: '-45px',
                      marginBottom: '35px',
                    }}
                  >
                    <Button
                      startIcon={<MobileFormIcon />}
                      sx={{
                        borderRadius: '5px',
                        marginRight: '10px',
                        height: '26px',
                        padding: '6px 10px',
                        ...(showView
                          ? { backgroundColor: '#D7F4F0', color: '#38CAB5' }
                          : {
                              backgroundColor: 'transparent',
                              color: '#9CA3AF',
                            }),
                      }}
                      onClick={() => setShowView(true)}
                    >
                      {' '}
                      Mobile
                    </Button>
                    <Button
                      startIcon={<MonitorIcon />}
                      sx={{
                        height: '26px',
                        padding: '6px 10px',
                        ...(showView
                          ? { backgroundColor: 'transparent', color: '#9CA3AF' }
                          : { backgroundColor: '#D7F4F0', color: '#38CAB5' }),
                      }}
                      onClick={() => setShowView(false)}
                    >
                      {' '}
                      Desktop
                    </Button>
                  </Box>
                  <InnerTab showView={showView} />
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box
                  sx={{
                    backgroundColor: showView ? 'white' : 'tranparent',
                    height: '75vh',
                    padding: '30px',
                    marginTop: '30px',
                  }}
                >
                  <TextField
                    value={pageName}
                    onChange={(e) => setPageName(e.target.value)}
                    sx={{
                      backgroundColor: '#E9EAEF',
                      borderRadius: '5px',
                      '& input': {
                        width: '70px',
                        height: '6px',
                        color: '#1F305D',
                        fontWeight: '500',
                      },
                    }}
                    disabled={editFormName}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => {
                              setEditFormName(!editFormName);
                            }}
                          >
                            <EditFormIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box
                    sx={{
                      backgroundColor: '#F9FAFB',
                      borderRadius: '5px',
                      width: 'fit-content',
                      margin: 'auto',
                      padding: '10px',
                      marginTop: '-45px',
                      marginBottom: '35px',
                    }}
                  >
                    <Button
                      startIcon={<MobileFormIcon />}
                      sx={{
                        borderRadius: '5px',
                        marginRight: '10px',
                        height: '26px',
                        padding: '6px 10px',
                        ...(showView
                          ? { backgroundColor: '#D7F4F0', color: '#38CAB5' }
                          : {
                              backgroundColor: 'transparent',
                              color: '#9CA3AF',
                            }),
                      }}
                      onClick={() => setShowView(true)}
                    >
                      {' '}
                      Mobile
                    </Button>
                    <Button
                      startIcon={<MonitorIcon />}
                      sx={{
                        height: '26px',
                        padding: '6px 10px',
                        ...(showView
                          ? { backgroundColor: 'transparent', color: '#9CA3AF' }
                          : { backgroundColor: '#D7F4F0', color: '#38CAB5' }),
                      }}
                      onClick={() => setShowView(false)}
                    >
                      {' '}
                      Desktop
                    </Button>
                  </Box>
                  <InnerTab showView={showView} />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}></Grid>
      </Grid>
    </Grid>
  );
};

export default CreateForm;
