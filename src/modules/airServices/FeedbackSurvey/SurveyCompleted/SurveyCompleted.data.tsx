export const surveyCompletedData = (data?: any) => {
  return {
    'Total Questions': data?.totalQuestions ?? 62,
    'Total Participants': data?.totalParticipants ?? 100,
    'Total Duration': data?.totalDuration ?? '3 days',
    Deadline: data?.deadline ?? '22/03/2022',
  };
};
