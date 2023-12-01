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
  drawerTitle,
  urlRedirectType,
} from './CtaEditorDrawer.data';

const CtaEditorDrawer = (props: any) => {
  const {
    openDrawer,
    setOpenDrawer,
    selectedCheckboxes,
    setSelectedCheckboxes,
  } = props;
  const {
    handleSubmit,
    onSubmit,
    methodsdealsTasks,
    onCloseDrawer,
    selectProductSuite,
    setSelectProductSuite,
    buttonStyle,
    setButtonStyle,
    drawerButtonTitleHandler,
    drawerSubmitHandler,
  } = useCtaEditor({
    selectedCheckboxes,
    openDrawer,
    setOpenDrawer,
    setSelectedCheckboxes,
  });

  return (
    <div>
      <CommonDrawer
        isDrawerOpen={openDrawer}
        onClose={onCloseDrawer}
        title={drawerTitle[openDrawer]}
        okText={drawerButtonTitleHandler()}
        isOk={true}
        cancelText={'Back'}
        submitHandler={drawerSubmitHandler}
        footer={openDrawer === 'View' ? false : true}
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
                  setSelectProductSuite('product'), setButtonStyle('1');
                }}
                variant={`${
                  selectProductSuite === 'product' ? 'outlined' : 'text'
                }`}
                color={`${
                  selectProductSuite === 'product' ? 'primary' : 'inherit'
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
                  setSelectProductSuite('CRM'), setButtonStyle('3');
                }}
                variant={`${
                  selectProductSuite === 'CRM' ? 'outlined' : 'text'
                }`}
                color={`${
                  selectProductSuite === 'CRM' ? 'primary' : 'inherit'
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

          <FormProvider
            methods={methodsdealsTasks}
            onSubmit={handleSubmit(onSubmit)}
          >
            {selectProductSuite === 'product' ? (
              <Grid container spacing={4}>
                {buttonStyle === '1' && (
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
                {buttonStyle === '2' && (
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
                        label="Enter Url "
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
            ) : (
              <Grid container spacing={4}>
                {buttonStyle === '3' && (
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

                {buttonStyle === '4' && (
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
