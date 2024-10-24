import { Box, Button, Grid, Tooltip } from '@mui/material';
import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import StepCustomizedButton from './StepCustomizedButton';
import StepButtonInfo from './StepButtonInfo';
import StepCopyCode from './StepCopyCode';
import { DRAWER_TITLE, BUTTON_TYPE } from './CtaEditorDrawer.data';
import CtaViewComponent from './CtaViewComponent';
import useCreateCTA from './useCreateCTA';
import SwitchCTAType from './SwitchCTAType';
import { isNullOrEmpty } from '@/utils';
import Image from 'next/image';
import { generateImage } from '@/utils/avatarUtils';

const CreateCTADrawer = (props: any) => {
  const { title, isOpen, onClose, data } = props;

  const {
    ctaType,
    handleSwitchCtaType,
    ctaStyles,
    watchValues,
    imagePreview,
    activeStep,
    handleBack,
    okText,
    methods,
    handleDrawerSubmit,
    loadingCreateCTA,
    loadingUpdateCTA,
    handleCopyIframeCode,
    isCodeCopied,
  } = useCreateCTA(data, onClose, isOpen, title);

  const steps = [
    {
      label: 'FirstStep',
      component: (
        <StepCustomizedButton data={data} buttonType={ctaType} title={title} />
      ),
    },
    { label: 'SecondStep', component: <StepButtonInfo /> },
    { label: 'ThirdStep', component: <StepCopyCode /> },
  ];

  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      onClose={onClose}
      cancelBtnHandler={handleBack}
      title={`${title} CTA`}
      okText={okText}
      isOk={true}
      cancelText={'Back'}
      submitHandler={handleDrawerSubmit}
      footer={title === DRAWER_TITLE?.view ? false : true}
      isLoading={loadingCreateCTA || loadingUpdateCTA}
    >
      <Box sx={{ pt: 2 }}>
        {title !== DRAWER_TITLE?.view && (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '20px',
              }}
            >
              <SwitchCTAType
                handleSwitch={handleSwitchCtaType}
                ctaType={ctaType}
                disabled={title === DRAWER_TITLE?.edit || activeStep !== 0}
              />
            </Box>

            <Box sx={{ pb: '22px' }}>
              <Box component={'button'} sx={ctaStyles}>
                {ctaType === BUTTON_TYPE?.customized &&
                  (!isNullOrEmpty(watchValues?.buttonContent)
                    ? watchValues?.buttonContent
                    : 'New Call-To-Actiotn')}
                {ctaType === BUTTON_TYPE?.image &&
                  (!isNullOrEmpty(watchValues?.buttonImage) ? (
                    <Image
                      src={
                        (watchValues?.buttonImage instanceof File
                          ? imagePreview
                          : generateImage(watchValues?.buttonImage?.url)) || ''
                      }
                      alt={watchValues?.imageAltText}
                      width={watchValues?.imageWidth || 100}
                      height={watchValues?.imageHeight || 44}
                    />
                  ) : (
                    'New Call-To-Actionn'
                  ))}
              </Box>
            </Box>
          </>
        )}

        {title === DRAWER_TITLE?.view && (
          <Box>
            <CtaViewComponent data={data} />
            <Tooltip
              open={isCodeCopied}
              title="Copied"
              placement="top"
              arrow
              key="copy-code"
            >
              <Button
                sx={{ mt: '32px' }}
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCopyIframeCode}
              >
                Copy iframe Code
              </Button>
            </Tooltip>
          </Box>
        )}
        {title !== DRAWER_TITLE?.view && (
          <FormProvider methods={methods}>
            <Grid container spacing={'22px'}>
              {steps[activeStep].component}
            </Grid>
          </FormProvider>
        )}
      </Box>
    </CommonDrawer>
  );
};

export default CreateCTADrawer;
