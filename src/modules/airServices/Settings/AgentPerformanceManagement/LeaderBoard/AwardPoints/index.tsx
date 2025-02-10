import { Box, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { agentResolveTicketData, receivingAwardData } from './AwardPoints.data';
import { useAwardPoints } from './useAwardPoints';
import AwardCard from './AwardCard';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

const AwardPoints = () => {
  const {
    methods,
    handleSubmit,
    isLoading,
    isFetching,
    addAwardPointsStatus,
    submitAwardForm,
    isError,
    refetch,
    handleCancelBtn,
  } = useAwardPoints();

  return (
    <>
      <Box>
        <Typography fontWeight={600} pb={1.2}>
          Award points
        </Typography>
        <Typography variant="subtitle2" fontWeight={500} color="custom.main">
          Set award points based on different factors for agents
        </Typography>
      </Box>
      <br />
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit?.(submitAwardForm)}
        >
          <ContainerGrid>
            {agentResolveTicketData?.map((item: any) => (
              <CustomGrid lg={item?.md} key={item?.id}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 1,
                  }}
                >
                  <Box>
                    <item.component {...item?.componentProps} size={'small'} />
                  </Box>
                  {item?.component?.name === 'RHFTextField' && (
                    <Typography component="span" pb={1}>
                      Points
                    </Typography>
                  )}
                </Box>
              </CustomGrid>
            ))}
          </ContainerGrid>
          <br />
          <Box>
            <Typography fontWeight={600} pb={1.2}>
              Criteria For Receiving Award
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={500}
              color="custom.main"
            >
              The agent will receive 4 Awards based on different criteria.
            </Typography>
          </Box>
          <br />
          <ContainerGrid>
            <CustomGrid xl={12}>
              <ContainerGrid>
                {receivingAwardData?.map?.((card: any) => (
                  <CustomGrid key={card?._id} lg={5}>
                    <AwardCard
                      icon={card?.icon}
                      title={card?.title}
                      text={card?.text}
                      borderColor={card?.borderColor}
                    />
                  </CustomGrid>
                ))}
              </ContainerGrid>
            </CustomGrid>
          </ContainerGrid>
          <ActionsLoadingButton
            submitButtonText={GENERIC_UPSERT_FORM_CONSTANT?.SAVE}
            showSubmitLoader={addAwardPointsStatus?.isLoading}
            handleCancelButton={handleCancelBtn}
          />
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
};

export default AwardPoints;
