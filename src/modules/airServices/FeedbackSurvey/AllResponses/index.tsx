import { Box } from '@mui/material';
import { SurveyWidgets } from '../SurveyWidgets';
import { SurveyCompleted } from '../SurveyCompleted';
import { TotalSurveyScore } from '../TotalSurveyScore';
import { UserResponsesAnalysis } from '../UserResponsesAnalysis';
import { useAllResponses } from './useAllResponses';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const AllResponses = () => {
  const { data, isLoading, isFetching, isError, refetch } = useAllResponses();

  return (
    <ApiRequestFlow
      showSkeleton={isLoading || isFetching}
      hasError={isError}
      hasNoData={!data?.data?.questionsResponses?.length}
      refreshApi={refetch}
      skeletonType={SKELETON_TYPES?.BARS}
    >
      <Box>
        <SurveyWidgets data={data} />
      </Box>
      <br />
      <ContainerGrid spacing={1}>
        <CustomGrid md={6}>
          <SurveyCompleted data={data} />
        </CustomGrid>
        <CustomGrid md={6}>
          <TotalSurveyScore data={data} />
        </CustomGrid>
      </ContainerGrid>
      <br />
      <UserResponsesAnalysis data={data} />
    </ApiRequestFlow>
  );
};
