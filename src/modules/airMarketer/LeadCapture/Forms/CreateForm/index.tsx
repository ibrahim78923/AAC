import {
  Box,
  Button,
  Divider,
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
import { TabContext, TabList, TabPanel } from '@mui/lab';
import InnerTab from './InnerTab';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import {
  customersAttributesArray,
  sideBarMenuArray,
  styleFormArray,
} from './CreateForm.data';
import { v4 as uuidv4 } from 'uuid';
import useCreateForm from './useCreateForm';
import Export from './Export';
import { AIR_MARKETER } from '@/routesConstants/paths';

const CreateForm = () => {
  const {
    setIsDraweropen,
    isDraweropen,
    handleCloseDrawer,
    handleSubmit,
    onSubmit,
    styleFormMethods,
    value,
    handleChange,
    editFormName,
    setEditFormName,
    showView,
    setShowView,
    inputValue,
    setInputValue,
    openAlert,
    setOpenAlert,
    showExportText,
    setShowExportText,
    router,
    addField,
    dynamicFields,
    deleteField,
    setDynamicFields,
    theme,
  } = useCreateForm();

  return (
    <Grid sx={styles.mainDiv}>
      <Grid container sx={styles.headerBar}>
        <Grid item xs={12} md={4} lg={3}>
          <Button
            className="small"
            sx={{ color: '#374151', marginRight: '20px', fontWeight: '500' }}
            startIcon={<BlackDeleteIcon />}
            onClick={() => router?.push(AIR_MARKETER.ALL_TABLE)}
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
        <Grid item xs={12} md={4} lg={3}>
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
              '@media (max-width:900px)': {
                marginY: '20px',
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
        <Grid item xs={12} md={4} lg={3}>
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
            onClick={() => setIsDraweropen(true)}
          >
            Styling
          </Button>
          <Button
            variant="contained"
            className="small"
            sx={{ marginLeft: '10px', fontWeight: '500' }}
            onClick={() => setOpenAlert(true)}
          >
            Create Form
          </Button>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={6} lg={8}>
          <Box sx={{ width: '94%', margin: 'auto' }}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: 'divider',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
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
                    '@media (max-width:700px)': {
                      height: 'fit-content',
                      marginBottom: '30px',
                    },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#F9FAFB',
                      borderRadius: '5px',
                      width: 'fit-content',
                      margin: 'auto',
                      padding: '10px',
                      marginBottom: '35px',
                      '@media (max-width:700px)': {
                        marginTop: '45px',
                      },
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
                  <InnerTab
                    showView={showView}
                    dynamicFields={dynamicFields}
                    deleteField={deleteField}
                    setDynamicFields={setDynamicFields}
                  />
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box
                  sx={{
                    backgroundColor: showView ? 'white' : 'tranparent',
                    height: '75vh',
                    padding: '30px',
                    marginTop: '30px',
                    '@media (max-width:700px)': {
                      height: 'fit-content',
                      marginBottom: '30px',
                    },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#F9FAFB',
                      borderRadius: '5px',
                      width: 'fit-content',
                      margin: 'auto',
                      padding: '10px',
                      marginBottom: '35px',
                      '@media (max-width:700px)': {
                        marginTop: '45px',
                      },
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
                  <InnerTab
                    showView={showView}
                    dynamicFields={dynamicFields}
                    deleteField={deleteField}
                    setDynamicFields={setDynamicFields}
                  />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Box sx={styles.formSideBar}>
            <Typography variant="h4">Form Block</Typography>
            <Typography variant="body2">
              Add blocks to your form by dragging them into place.
            </Typography>
            <Divider sx={{ marginY: '20px' }} />
            <Typography variant="body2" sx={{ fontWeight: '600' }}>
              Static Blocks
            </Typography>
            <Typography variant="body2">
              Add text or an image to your form page.
            </Typography>

            {sideBarMenuArray?.map((item: any) => (
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'10px'}
                padding={'12px'}
                sx={styles.customField}
                key={uuidv4()}
                onClick={() => addField(item?.type, item?.name)}
              >
                {item?.icon}
                <Typography
                  variant="h6"
                  sx={{ color: theme?.palette?.secondary?.main }}
                >
                  {item?.name}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ marginY: '20px' }} />

            <Typography variant="body2" sx={{ fontWeight: '600' }}>
              Customers Attributes
            </Typography>
            <Typography variant="body2">
              Request information from your customers
            </Typography>

            {customersAttributesArray?.map((item: any) => (
              <Box
                display={'flex'}
                alignItems={'center'}
                gap={'10px'}
                padding={'12px'}
                sx={styles.customField}
                key={uuidv4()}
                onClick={() => addField(item?.type, item?.name)}
              >
                {item?.icon}
                <Typography
                  variant="h6"
                  sx={{ color: theme?.palette?.secondary?.main }}
                >
                  {item?.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>

      <CommonDrawer
        isDrawerOpen={isDraweropen}
        onClose={handleCloseDrawer}
        title={'Styling'}
        okText={'Done'}
        footer={true}
        isOk={true}
        submitHandler={handleSubmit(onSubmit)}
      >
        <Box sx={{ paddingTop: '1rem' }}>
          <FormProvider methods={styleFormMethods}>
            <Grid container spacing={4}>
              {styleFormArray?.map((item: any) => (
                <Grid
                  item
                  xs={12}
                  md={item?.md}
                  key={uuidv4()}
                  sx={{
                    paddingTop: [
                      item?.componentProps?.paragraph
                        ? '0px !important'
                        : '20px !important',
                    ],
                  }}
                >
                  {item?.componentProps?.heading && (
                    <Typography variant="h5">
                      {item?.componentProps?.heading}
                    </Typography>
                  )}
                  {item?.componentProps?.paragraph && (
                    <Typography variant="body2">
                      {item?.componentProps?.paragraph}
                    </Typography>
                  )}
                  <item.component {...item?.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>

      <Export
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        showExportText={showExportText}
        setShowExportText={setShowExportText}
      />
    </Grid>
  );
};

export default CreateForm;
