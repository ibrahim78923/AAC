import { Button, Grid, Typography } from '@mui/material';
import { createSurveyFields, surveyConditions } from './CreateSurvey.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { AIR_SERVICES } from '@/constants';
import { LoadingButton } from '@mui/lab';
import { useCreateSurvey } from './useCreateSurvey';

export const CreateSurvey = (props: any) => {
  const {
    setValue,
    isLoading,
    linkRef,
    router,
    customerSupportLinkType,
    displayWatch,
    setSubmitType,
  } = useCreateSurvey(props);
  return (
    <>
      <PageTitledHeader
        title="Create Survey"
        moveBack={() => router?.push(AIR_SERVICES?.FEEDBACK_SURVEY)}
        canMovedBack
      />
      <Grid container spacing={2}>
        {createSurveyFields?.map((field: any) => {
          if (
            field?.conditionalComponent &&
            customerSupportLinkType === surveyConditions?.email
          ) {
            return null;
          }
          if (
            (field?.componentProps?.name === surveyConditions?.surveyDuration ||
              field?.componentProps?.name ===
                surveyConditions?.sendSurveyPeople) &&
            customerSupportLinkType === surveyConditions?.link
          ) {
            return null;
          }
          if (
            field?.componentProps?.name === surveyConditions?.displayName &&
            !displayWatch
          ) {
            return null;
          }
          return (
            <Grid
              item
              key={field?.id}
              xs={12}
              md={7}
              sx={{
                display: !field?.type?.includes(router?.query?.type)
                  ? 'none'
                  : 'block',
              }}
            >
              {field?.conditionalComponent ? (
                field?.conditionalComponent(linkRef, setValue)
              ) : field?.id === 7 ? (
                <Typography variant="h6" mb={-2}>
                  Configure what to display in the survey email or Portal
                  against tickets
                </Typography>
              ) : (
                <field.component {...field?.componentProps} size="small" />
              )}
            </Grid>
          );
        })}
        <Grid
          item
          md={7}
          xs={12}
          display="flex"
          justifyContent="flex-end"
          gap={2}
          mt={4}
        >
          <Button
            variant="outlined"
            color="secondary"
            disabled={isLoading}
            onClick={() => router?.push(AIR_SERVICES?.FEEDBACK_SURVEY)}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            onClick={() => setSubmitType(surveyConditions?.createSurvey)}
            type="submit"
            loading={isLoading}
          >
            Next
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};
