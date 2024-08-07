export interface CardPropsI {
  title: string;
  value: string;
  isLoading?: boolean;
}

export interface FilterParamsI {
  dateFilterType: 'TODAY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY' | 'CUSTOM';
  startDate?: string;
  endDate?: string;
}
