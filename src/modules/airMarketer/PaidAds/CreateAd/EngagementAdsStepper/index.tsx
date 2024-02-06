import { Button, Card, Grid, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import { v4 as uuidv4 } from 'uuid';
import { FormProvider } from '@/components/ReactHookForm';
import { stepperArray } from './EngagementAdsStepper.data';
import useTempStepper from './useEngagementAdsStepper';
import { AIR_MARKETER } from '@/routesConstants/paths';
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import { AudienceMockImage } from '@/assets/images';
import { styles } from './EngagementAds.style';

const EngagementAdsStepper = () => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme?.breakpoints?.down('sm'));
  const {
    activeStep,
    initialStep,
    stepThree,
    router,
    handleBack,
    handleNext,
    methods,
    handleSubmit,
    isNewAd,
    stepperImages,
  } = useTempStepper();

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleNext)}>
      <Typography variant="h4" mb={3} color={theme?.palette?.blue?.dull_blue}>
        Engagement Ad
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8} xl={5}>
          <Stepper
            sx={styles?.stepper}
            activeStep={activeStep}
            orientation={isMobileScreen ? 'vertical' : 'horizontal'}
          >
            {stepperArray?.map((item) => (
              <Step key={item?.name}>
                <StepButton color="inherit">{item?.name}</StepButton>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} md={6} lg={5}>
          <Grid container spacing={1}>
            {stepperArray
              ?.filter((_, step) => step == activeStep)
              ?.map(
                (item: any) =>
                  item?.formFields?.map((item: any) => {
                    return (
                      (activeStep === initialStep
                        ? item?.isNewAdFields?.includes(isNewAd)
                        : item) && (
                        <Grid item xs={12} md={item?.md} key={uuidv4()}>
                          <Typography
                            variant={item?.componentProps?.varient}
                            fontWeight={500}
                            color={
                              item?.componentProps?.heading === 'Age Range'
                                ? theme?.palette?.grey[600]
                                : theme?.palette?.blue?.dull_blue
                            }
                          >
                            {item?.componentProps?.heading}
                            {(item?.componentProps?.heading === 'Age Range' ||
                              item?.componentProps?.heading ===
                                'Ad Creative') && (
                              <Typography
                                component="span"
                                color={theme?.palette?.error?.main}
                              >
                                *
                              </Typography>
                            )}
                          </Typography>
                          <item.component
                            {...item?.componentProps}
                            size={'small'}
                          >
                            {item?.componentProps?.select &&
                              item?.options?.map((option: any) => (
                                <option
                                  key={option?.value}
                                  value={option?.value}
                                >
                                  {option?.label}
                                </option>
                              ))}
                          </item.component>
                          {item?.componentProps?.name === 'contactsList' && (
                            <Typography
                              variant="body3"
                              color={theme?.palette?.grey[600]}
                            >
                              When a contact interacts with your ads, add them
                              to an active list so you can market to them later.
                            </Typography>
                          )}
                        </Grid>
                      )
                    );
                  }),
              )}
          </Grid>
          {activeStep === stepThree && (
            <Grid container spacing={2} mt={1}>
              <Grid item xs={12}>
                <Card>
                  <Box p={'24px'}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" fontWeight={500}>
                        Create your own automated follow-ups
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ maxWidth: '477px', margin: 'auto' }}
                      >
                        Use simple workflows to take care of your follow-ups
                        after contacts engage with your ad. For example, adding
                        those contacts to an audience, or sending them an email.
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        color={theme?.palette?.primary?.main}
                      >
                        {`What's a simple workflow?`}
                      </Typography>
                    </Box>
                  </Box>
                  <Grid
                    item
                    container
                    spacing={1}
                    sx={{
                      alignItems: 'center',
                      borderTop: `1px solid ${theme?.palette?.grey[700]}`,
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      md={4}
                      sx={{ paddingTop: '0px !important' }}
                    >
                      <Box
                        sx={{
                          background: theme?.palette?.grey[100],
                          p: 1,
                          justifyContent: 'center',
                          display: 'flex',
                        }}
                      >
                        <Image src={AudienceMockImage} alt="mock" />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6">Ad to ads audience</Typography>
                      <Typography variant="body3">
                        When a contact interacts with this ad, they will be
                        added to this audience
                      </Typography>
                      <Button
                        variant="contained"
                        className="small"
                        sx={{ mt: 1 }}
                      >
                        Select this workflow
                      </Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item md={12}>
                <Box
                  sx={{
                    background: theme?.palette?.grey[100],
                    borderRadius: '6px',
                    padding: '12px 16px',
                  }}
                >
                  <Typography variant="body2">
                    Need more powerful workflows? Get extra actions, triggers,
                    and if/then branching in the workflows tool
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs-={12} md={6} lg={7}>
          <Card
            sx={{
              height: '70vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image src={stepperImages(activeStep)} alt="eng-img" />
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() =>
                activeStep === initialStep
                  ? router?.push(AIR_MARKETER?.CREATE_AD)
                  : handleBack()
              }
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep === stepThree ? (
              <Button
                variant="contained"
                onClick={() => router?.push(AIR_MARKETER?.PAID_ADS)}
              >
                Publish
              </Button>
            ) : (
              <Button type="submit" sx={{ mr: 1 }} variant="contained">
                Next
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default EngagementAdsStepper;
