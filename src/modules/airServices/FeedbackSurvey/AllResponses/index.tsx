import { Box, Grid } from '@mui/material';
import { SurveyWidgets } from '../SurveyWidgets';
import { SurveyCompleted } from '../SurveyCompleted';
import { TotalSurveyScore } from '../TotalSurveyScore';
import { UserResponsesAnalysis } from '../UserResponsesAnalysis';
import { useAllResponses } from './useAllResponses';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import NoData from '@/components/NoData';

export const AllResponses = () => {
  const { data, isLoading, isFetching, isError } = useAllResponses();
  if (isLoading || isFetching) return <SkeletonTable />;
  if (isError) return <ApiErrorState />;
  if (!data?.data?.questionsResponses?.length) return <NoData />;

  return (
    <>
      <Box>
        <SurveyWidgets data={data} />
      </Box>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <SurveyCompleted data={data} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TotalSurveyScore data={data} />
        </Grid>
      </Grid>
      <br />
      <UserResponsesAnalysis data={data} />
    </>
  );
};
