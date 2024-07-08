import dayjs from 'dayjs';
import { SURVEY_WIDGET_IDS } from '../AllResponses/AllResponses.data';
import { DATE_FORMAT } from '@/constants';

export const surveyCompletedData = (data?: any) => {
  return {
    'Total Questions': data?.[SURVEY_WIDGET_IDS?.TOTAL_QUESTIONS] ?? '---',
    'Total Participants': data?.[SURVEY_WIDGET_IDS?.SUBMITTED_COUNT] ?? '---',
    'Total Duration': data?.totalDuration ?? '---',
    Deadline: data?.surveyDuration
      ? dayjs(data?.surveyDuration)?.format(DATE_FORMAT?.UI)
      : '---',
  };
};
