import { Box, Button, Grid, Typography } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';

import { v4 as uuidv4 } from 'uuid';
import useCtaEditor from './useCtaEditor';
import {
  CTADataArray,
  CTAImageDataArray,
  urlRedirectType,
} from './CtaEditorDrawer.data';
import useCta from '../useCta';
import { CTA_FORM, FORM_STEP } from '../Cta.data';

const CtaEditorDrawer = (props: any) => {
  const {
    title,
    okText,
    isOpen,
    onClose,
    methods,
    onSubmit,
    selectedForm,
    buttonStyle,
  } = props;

  const {
    // handleSubmit,
    // methodsdealsTasks,
    // onCloseDrawer,
    // selectedForm,
    // setselectedForm,
    // buttonStyle,
    // setButtonStyle,
    // drawerButtonTitleHandler,
    // drawerSubmitHandler,
  } = useCtaEditor();

  const { handleFormSwitcher, setButtonStyle } = useCta();

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={isOpen}
        onClose={onClose}
        title={`${title} CTA`}
        okText={okText}
        isOk={true}
        cancelText={'Back'}
        submitHandler={onSubmit}
        footer={title === 'View' ? false : true}
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
                onClick={() => {
                  handleFormSwitcher(CTA_FORM?.CUSTOMIZED_BUTTON),
                    setButtonStyle(FORM_STEP?.CUSTOM_ACTION);
                }}
                variant={`${
                  selectedForm === CTA_FORM?.CUSTOMIZED_BUTTON
                    ? 'outlined'
                    : 'text'
                }`}
                color={`${
                  selectedForm === CTA_FORM?.CUSTOMIZED_BUTTON
                    ? 'primary'
                    : 'inherit'
                }`}
                sx={{
                  height: '25px',
                  borderRadius: '10px',
                  boxShadow: 'none',
                }}
              >
                <Typography variant="body3">Customized Button </Typography>
              </Button>
              <Button
                onClick={() => {
                  handleFormSwitcher(CTA_FORM?.IMAGE_BUTTON),
                    setButtonStyle(FORM_STEP?.IMAGE_ACTION);
                }}
                variant={`${
                  selectedForm === CTA_FORM?.IMAGE_BUTTON ? 'outlined' : 'text'
                }`}
                color={`${
                  selectedForm === CTA_FORM?.IMAGE_BUTTON
                    ? 'primary'
                    : 'inherit'
                }`}
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
            {selectedForm === CTA_FORM?.CUSTOMIZED_BUTTON ? (
              <Grid container spacing={4}>
                {buttonStyle === FORM_STEP?.CUSTOM_ACTION && (
                  <>
                    <Grid item xs={12}>
                      <Button variant="outlined" fullWidth>
                        {' '}
                        New Call-To-Action
                      </Button>
                    </Grid>
                    {CTADataArray?.map((item: any) => (
                      <Grid item xs={12} md={item?.md} key={uuidv4()}>
                        <item.component
                          {...item?.componentProps}
                          size={'small'}
                        >
                          {item?.componentProps?.select
                            ? item?.options?.map((option: any) => (
                                <option
                                  key={option?.value}
                                  value={option?.value}
                                >
                                  {option?.label}
                                </option>
                              ))
                            : null}
                        </item.component>
                      </Grid>
                    ))}
                  </>
                )}
                {buttonStyle === FORM_STEP?.CTA_INTERNAL && (
                  <>
                    <Grid item xs={12}>
                      <RHFTextField
                        name="ctaInternalName"
                        label="CTA Internal Name "
                        size="small"
                        placeholder="Left18px"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RHFSelect
                        name="urlRedirectType"
                        label="URL Redirect Type"
                        size="small"
                      >
                        {urlRedirectType?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                      </RHFSelect>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <RHFTextField
                        name="url"
                        label="Enter Url "
                        size="small"
                        placeholder="Left"
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box sx={{ paddingTop: { md: '22px' } }}>
                        <Button variant="outlined" fullWidth>
                          Test URL
                        </Button>
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
            ) : (
              <Grid container spacing={4}>
                {buttonStyle === FORM_STEP?.IMAGE_ACTION && (
                  <>
                    {' '}
                    {CTAImageDataArray?.map((item: any) => (
                      <Grid item xs={12} md={item?.md} key={uuidv4()}>
                        <item.component
                          {...item?.componentProps}
                          size={'small'}
                        >
                          {item?.componentProps?.select
                            ? item?.options?.map((option: any) => (
                                <option
                                  key={option?.value}
                                  value={option?.value}
                                >
                                  {option?.label}
                                </option>
                              ))
                            : null}
                        </item.component>
                      </Grid>
                    ))}
                  </>
                )}

                {buttonStyle === FORM_STEP?.IMAGE_CTA_INTERNAL && (
                  <>
                    <Grid item xs={12}>
                      <RHFTextField
                        name="ctaInternalName"
                        label="CTA Internal Name "
                        size="small"
                        placeholder="Left"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <RHFSelect
                        name="URL Redirect Type"
                        label="URL Redirect Type"
                        size="small"
                      >
                        {urlRedirectType?.map((option: any) => (
                          <option key={uuidv4()} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                      </RHFSelect>
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <RHFTextField
                        name="ctaInternalName"
                        label=" Enter Url"
                        size="small"
                        placeholder="Left"
                        required
                      />
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box sx={{ paddingTop: { md: '22px' } }}>
                        <Button variant="outlined" fullWidth>
                          Text URL
                        </Button>
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
            )}
          </FormProvider>
        </Box>
      </CommonDrawer>
    </div>
  );
};

export default CtaEditorDrawer;
