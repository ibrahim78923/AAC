import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { styles } from './CreateForm.style';
import {
  BlackDeleteIcon,
  EditFormIcon,
  MobileFormIcon,
  MonitorIcon,
  StyleFormIcon,
} from '@/assets/icons';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
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
import DialogFormCreated from './DialogFormCreated';

const CreateForm = () => {
  const {
    isStylingDrawerOpen,
    handleOpenStylingDrawer,
    handleCloseStylingDrawer,
    styleFormMethods,
    handleStylingSubmit,
    // resetStylingForm,
    // createFormStyling,
    editFormName,
    setEditFormName,
    showView,
    setShowView,
    inputValue,
    setInputValue,
    openAlertCreatedForm,
    handleCloseAlertCreatedForm,
    loadingAddForm,
    handleSubmitAddForm,
    showExportText,
    setShowExportText,
    addField,
    dynamicFields,
    deleteField,
    setDynamicFields,
    theme,
    createdFormResponse,
    handleBackToAllForms,
  } = useCreateForm();

  return (
    <Grid sx={styles.mainDiv}>
      <Grid container sx={styles.headerBar}>
        <Grid item xs={12} md={4} lg={3}>
          <Button
            className="small"
            sx={styles?.backBtn}
            startIcon={<BlackDeleteIcon />}
            onClick={handleBackToAllForms}
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
            sx={styles?.formTitle}
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
            sx={styles?.btnStyling}
            onClick={handleOpenStylingDrawer}
          >
            Styling
          </Button>
          <LoadingButton
            variant="contained"
            className="small"
            sx={{ marginLeft: '10px', fontWeight: '500' }}
            onClick={handleSubmitAddForm}
            disabled={dynamicFields?.length === 0}
            loading={loadingAddForm}
          >
            Create Form
          </LoadingButton>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={6} lg={8}>
          <Box sx={styles?.formWrapper}>
            <Box sx={styles?.formContainer}>
              <Box sx={styles?.viewSwitcher}>
                <Button
                  startIcon={<MobileFormIcon />}
                  sx={{
                    borderRadius: '5px',
                    marginRight: '10px',
                    height: '26px',
                    padding: '6px 10px',
                    ...(showView
                      ? {
                          backgroundColor: theme?.palette?.primary?.light,
                          color: theme?.palette?.primary?.main,
                        }
                      : {
                          backgroundColor: 'transparent',
                          color: theme?.palette?.grey[900],
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
                      ? {
                          backgroundColor: 'transparent',
                          color: theme?.palette?.grey[900],
                        }
                      : {
                          backgroundColor: theme?.palette?.primary?.light,
                          color: theme?.palette?.primary?.main,
                        }),
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
        isDrawerOpen={isStylingDrawerOpen}
        onClose={handleCloseStylingDrawer}
        title={'Styling'}
        okText={'Done'}
        footer={true}
        isOk={true}
        submitHandler={handleStylingSubmit}
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

      <DialogFormCreated
        open={openAlertCreatedForm}
        onClose={handleCloseAlertCreatedForm}
        showExportText={showExportText}
        setShowExportText={setShowExportText}
        createdFormResponse={createdFormResponse}
      />
    </Grid>
  );
};

export default CreateForm;
