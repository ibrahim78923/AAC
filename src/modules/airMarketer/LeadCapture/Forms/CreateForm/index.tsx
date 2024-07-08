import {
  Box,
  Button,
  // Divider,
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
  // MobileFormIcon,
  // MonitorIcon,
  StyleFormIcon,
} from '@/assets/icons';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
// import InnerTab from './InnerTab';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import {
  // customersAttributesArray,
  // sideBarMenuArray,
  styleFormArray,
} from './CreateForm.data';
import { v4 as uuidv4 } from 'uuid';
import useCreateForm from './useCreateForm';
import DialogFormCreated from './DialogFormCreated';
import Loader from '@/components/Loader';
import FormBuilder from './FormBuilder';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { formMode } from '@/utils/form-builder';

const CreateForm = () => {
  const {
    // theme,
    fields,
    setFields,
    formName,
    setFormName,
    isEditFormName,
    handleEditForm,
    // dataGetManageFieldById,
    loadingGetField,
    // dataGetFormById,
    handlePostManageLeadForm,
    loadingDraft,
    loadingPublished,

    isStylingDrawerOpen,
    handleOpenStylingDrawer,
    handleCloseStylingDrawer,
    styleFormMethods,
    handleStylingSubmit,
    openAlertCreatedForm,
    handleCloseAlertCreatedForm,
    showExportText,
    setShowExportText,

    formHtml,
    handleBackToAllForms,
    mode,
  } = useCreateForm();

  return (
    <>
      <Box sx={styles.mainDiv}>
        <Box sx={styles.headerBar}>
          <Grid container justifyContent="space-between">
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
              {mode === formMode?.edit && (
                <Typography variant="body3" sx={styles.saveChangesBtn}>
                  {' '}
                  <FiberManualRecordIcon
                    sx={{ fontSize: '12px', marginRight: '5px' }}
                  />{' '}
                  Changes Saved
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4} lg={3} sx={{ textAlign: 'center' }}>
              <TextField
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                sx={styles?.formTitle}
                disabled={isEditFormName || mode === formMode?.view}
                InputProps={{
                  endAdornment: (
                    <>
                      {mode === formMode?.edit ? (
                        <InputAdornment position="end">
                          <IconButton onClick={handleEditForm}>
                            <EditFormIcon />
                          </IconButton>
                        </InputAdornment>
                      ) : (
                        <></>
                      )}
                    </>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={4} lg={3} sx={{ textAlign: 'right' }}>
              {mode === formMode?.edit && (
                <>
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
                    onClick={() => handlePostManageLeadForm('DRAFT')}
                    loading={loadingDraft}
                  >
                    Save as draft
                  </LoadingButton>
                  <LoadingButton
                    variant="contained"
                    className="small"
                    sx={{ marginLeft: '10px', fontWeight: '500' }}
                    onClick={() => handlePostManageLeadForm('PUBLISHED')}
                    loading={loadingPublished}
                  >
                    Save as published
                  </LoadingButton>
                </>
              )}
            </Grid>
          </Grid>
        </Box>

        {/* Form Builder Starts */}
        <DndProvider backend={HTML5Backend}>
          <FormBuilder fields={fields} setFields={setFields} mode={mode} />
        </DndProvider>
        {/* Form Builder Ends */}

        <Loader isLoading={loadingGetField} />
      </Box>

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
        formHtml={formHtml}
      />
    </>
  );
};

export default CreateForm;
