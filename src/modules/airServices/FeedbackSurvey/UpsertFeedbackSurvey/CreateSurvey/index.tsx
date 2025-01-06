import { Button, Grid, Typography } from '@mui/material';
import { createSurveyFields, surveyConditions } from './CreateSurvey.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { LoadingButton } from '@mui/lab';
import { useCreateSurvey } from './useCreateSurvey';
import { ShareModal } from './ShareModal';
import { AIR_SERVICES } from '@/constants/routes';
import { CreateSurveyI } from './CreateSurvey.interface';

export const CreateSurvey: React.FC<CreateSurveyI> = (props) => {
  const {
    setValue,
    isLoading,
    linkRef,
    router,
    customerSupportLinkType,
    displayWatch,
    setSubmitType,
    openShare,
    setOpenShare,
    watch,
  } = useCreateSurvey(props);
  return (
    <>
      <PageTitledHeader
        title={
          router?.query?.id
            ? surveyConditions?.editSurveyTitle
            : surveyConditions?.createSurveyTitle
        }
        moveBack={() =>
          router?.push({
            pathname: AIR_SERVICES?.FEEDBACK_SURVEY,
            query: { type: router?.query?.type },
          })
        }
        canMovedBack
      />
      <Grid container spacing={2}>
        {createSurveyFields(watch, setOpenShare)?.map((field: any) => {
          if (
            field?.conditionalComponent &&
            customerSupportLinkType === surveyConditions?.email
          ) {
            return null;
          }
          if (
            field?.componentProps?.name ===
              surveyConditions?.sendSurveyPeople &&
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
                display: !field?.type?.includes(router?.query?.type as string)
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
                field?.component && (
                  <field.component {...field?.componentProps} size="small" />
                )
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
          gap={1}
          mt={4}
        >
          <Button
            variant="outlined"
            color="secondary"
            className="small"
            disabled={isLoading}
            onClick={() =>
              router?.push({
                pathname: AIR_SERVICES?.FEEDBACK_SURVEY,
                query: { type: router?.query?.type },
              })
            }
          >
            Cancel
          </Button>
          <LoadingButton
            variant="contained"
            className="small"
            onClick={() => setSubmitType(surveyConditions?.createSurvey)}
            type="submit"
            loading={isLoading}
          >
            Next
          </LoadingButton>
        </Grid>
      </Grid>
      {openShare && (
        <ShareModal openShare={openShare} setOpenShare={setOpenShare} />
      )}
    </>
  );
};
