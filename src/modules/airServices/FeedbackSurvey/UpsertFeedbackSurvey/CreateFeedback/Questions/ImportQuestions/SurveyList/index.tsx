import { Box, Grid, Typography } from '@mui/material';
import { capitalizeFirstLetter } from '@/utils/api';
import CustomPagination from '@/components/CustomPagination';
import {
  feedbackStatusColor,
  feedbackStatusTextColor,
  surveyTypes,
} from './SurveyList.data';
import { useSurveyList } from './useSurveyList';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import NoData from '@/components/NoData';
import { SurveyListI } from './SurveyList.interface';
import { FeedbackSurveyListI } from '@/types/modules/AirServices/FeedbackSurvey';
import { CustomChip } from '@/components/Chip/CustomChip';

export const SurveyList: React.FC<SurveyListI> = (props) => {
  const {
    data,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    setLimit,
    setPage,
    handleSurveyClick,
  } = useSurveyList(props);
  if (isError) return <ApiErrorState />;
  if (isLoading || isFetching) return <SkeletonTable />;
  if (isSuccess && !data?.data?.feedbackSurvey?.length) return <NoData />;
  return (
    <>
      <Grid container spacing={1}>
        {data?.data?.feedbackSurvey?.map((item: FeedbackSurveyListI) => (
          <Grid item xs={12} key={item?._id}>
            <Box
              sx={{
                border: 1,
                borderColor: 'grey.700',
                p: 1,
                borderRadius: 2,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              onClick={() => handleSurveyClick(item?._id)}
            >
              <Box>
                <Typography variant="h6">{item?.surveyTitle}</Typography>
                <Typography variant="body3" color="grey.500">
                  {surveyTypes?.[item?.surveyType]}
                </Typography>
              </Box>
              <Box>
                <CustomChip
                  color={feedbackStatusColor(item?.status)}
                  label={capitalizeFirstLetter(item?.status)}
                  textColor={feedbackStatusTextColor(item?.status)}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <br />
      <CustomPagination
        count={data?.data?.meta?.pages}
        pageLimit={data?.data?.meta?.limit}
        currentPage={data?.data?.meta?.page}
        totalRecords={data?.data?.meta?.total}
        onPageChange={(page: number) => setPage?.(page)}
        setPage={setPage}
        setPageLimit={setLimit}
      />
    </>
  );
};
