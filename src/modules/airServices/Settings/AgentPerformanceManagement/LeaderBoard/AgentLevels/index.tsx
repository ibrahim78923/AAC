import { Box, Typography } from '@mui/material';
import AgentLevelCard from './AgentLevelCard';
import { agentLevelCardData } from './AgentLevel.data';
import { FormProvider } from '@/components/ReactHookForm';
import { useAgentLevelsPoints } from './useAgentLevelsPoints';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

const AgentLevels = () => {
  const {
    methods,
    onSubmit,
    handleSubmit,
    isLoading,
    isFetching,
    addAgentLevelsPointsStatus,
    isError,
    refetch,
    handleCancelBtn,
  } = useAgentLevelsPoints();

  return (
    <>
      <Typography fontWeight={600} pb={1.2}>
        Agent Levels
      </Typography>
      <Typography variant="subtitle2" fontWeight={500} color="custom.main">
        Set points to be achieved by an agent to reach a level
      </Typography>
      <br />
      <ApiRequestFlow
        showSkeleton={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
        skeletonType={SKELETON_TYPES?.BASIC_CARD}
        cardSkeletonType={SKELETON_TYPES?.THREE_LAYER_BIG_LARGE_CARD}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit?.(onSubmit)}>
          <ContainerGrid>
            <CustomGrid md={10} lg={7}>
              <Box>
                {agentLevelCardData?.map?.((card: any) => (
                  <Box sx={{ mt: 2 }} key={card?._id}>
                    <AgentLevelCard title={card?.title} />
                  </Box>
                ))}
              </Box>
            </CustomGrid>
          </ContainerGrid>
          <ActionsLoadingButton
            submitButtonText={GENERIC_UPSERT_FORM_CONSTANT?.SAVE}
            showSubmitLoader={addAgentLevelsPointsStatus?.isLoading}
            handleCancelButton={handleCancelBtn}
          />
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
};

export default AgentLevels;
