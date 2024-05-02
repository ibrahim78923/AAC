import { Box, Button, Grid, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import {
  FormProvider,
  // RHFSelect,
  // RHFTextField,
} from '@/components/ReactHookForm';

// import { v4 as uuidv4 } from 'uuid';
// import useCtaEditor from './useCtaEditor';
// import {
//   CTADataArray,
//   CTAImageDataArray,
//   urlRedirectType,
// } from './CtaEditorDrawer.data';
// import useCta from '../useCta';
// import { CTA_FORM, FORM_STEP } from '../Cta.data';
import StepCustomizedButton from './StepCustomizedButton';
import StepButtonInfo from './StepButtonInfo';
import StepCopyCode from './StepCopyCode';
import StepImageButton from './StepImageButton';

const CtaEditorDrawer = (props: any) => {
  const {
    handleSwitchButtonType,
    toggleButtonType,
    activeStep,
    title,
    okText,
    isOpen,
    onClose,
    handleBack,
    methods,
    onSubmit,
    isLoading,
    // buttonStyle,
  } = props;

  const steps = [
    {
      label: 'FirstStep',
      component: toggleButtonType ? (
        <StepCustomizedButton />
      ) : (
        <StepImageButton />
      ),
    },
    { label: 'SecondStep', component: <StepButtonInfo /> },
    { label: 'ThirdStep', component: <StepCopyCode /> },
  ];

  // const { handleFormSwitcher, setButtonStyle } = useCta();

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={isOpen}
        onClose={onClose}
        cancelBtnHandler={handleBack}
        title={`${title} CTA`}
        okText={okText}
        isOk={true}
        cancelText={'Back'}
        submitHandler={onSubmit}
        footer={title === 'View' ? false : true}
        isLoading={isLoading}
      >
        <Box sx={{ pt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '20px',
            }}
          >
            <Box
              sx={{
                padding: '8px 11px',
                borderRadius: '6px',
                border: '1px solid  #F3F4F6',
                background: '#F9FAFB',
                boxShadow: '0px 9px 16px 0px rgba(245, 250, 255, 0.04)',
              }}
            >
              <Button
                onClick={handleSwitchButtonType}
                variant={toggleButtonType ? 'outlined' : 'text'}
                color={toggleButtonType ? 'primary' : 'inherit'}
                sx={{
                  height: '25px',
                  borderRadius: '10px',
                  boxShadow: 'none',
                }}
              >
                <Typography variant="body3">Customized Button </Typography>
              </Button>
              <Button
                onClick={handleSwitchButtonType}
                variant={!toggleButtonType ? 'outlined' : 'text'}
                color={!toggleButtonType ? 'primary' : 'inherit'}
                sx={{
                  height: '25px',
                  borderRadius: '10px',
                  boxShadow: 'none',
                }}
              >
                <Typography variant="body3"> Image Button</Typography>
              </Button>
            </Box>
          </Box>

          <FormProvider methods={methods}>
            <Grid container spacing={'22px'}>
              {steps[activeStep].component}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default CtaEditorDrawer;
