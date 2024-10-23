import { SURVEY_WIDGET_IDS } from '../AllResponses/AllResponses.data';
import { diffMinutesFormate, uiDateFormat } from '@/lib/date-time';

const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 24 * MINUTES_IN_HOUR;
const MINUTES_IN_MONTH = 30 * MINUTES_IN_DAY;
const MINUTES_IN_YEAR = 365 * MINUTES_IN_DAY;

export const formatTimeDifference = (
  baseDate: string,
  isoDateString: string,
) => {
  const diffMinutes = diffMinutesFormate(isoDateString, baseDate);

  if (diffMinutes < MINUTES_IN_HOUR) {
    return formatTimeUnit(diffMinutes, 'minute');
  }
  if (diffMinutes < MINUTES_IN_DAY) {
    return formatTimeUnit(diffMinutes, 'hour', MINUTES_IN_HOUR);
  }
  if (diffMinutes < MINUTES_IN_MONTH) {
    return formatTimeUnit(diffMinutes, 'day', MINUTES_IN_DAY);
  }
  if (diffMinutes < MINUTES_IN_YEAR) {
    return formatTimeUnit(diffMinutes, 'month', MINUTES_IN_MONTH);
  }

  return formatTimeUnit(diffMinutes, 'year', MINUTES_IN_YEAR);
};

export const formatTimeUnit = (
  diff: number,
  unit: string,
  base: number = 1,
) => {
  const value = Math?.floor(diff / base);
  return `${value > 0 ? value : 0} ${unit}${value !== 1 ? 's' : ''}`;
};

export const surveyCompletedData = (data?: any) => {
  return {
    'Total Questions': data?.[SURVEY_WIDGET_IDS?.TOTAL_QUESTIONS] ?? '---',
    'Total Participants': data?.[SURVEY_WIDGET_IDS?.SUBMITTED_COUNT] ?? '---',
    'Total Duration': !!data?.surveyDuration
      ? formatTimeDifference(data?.createdAt, data?.surveyDuration)
      : '---',
    Deadline: !!data?.surveyDuration
      ? uiDateFormat(data?.surveyDuration)
      : '---',
  };
};
