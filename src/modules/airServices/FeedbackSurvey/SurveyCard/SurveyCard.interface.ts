export interface SurveyCardI {
  hasSpinner: boolean;
  data: {
    id: number;
    status: string;
    rate: string;
    hasSpinner?: boolean;
    hasStatusIcon: true;
    statusIcon: () => JSX.Element;
    rateIcon: () => JSX.Element;
    progress?: number | undefined;
    progressColor?: string;
  };
  hasStatusIcon: boolean | undefined;
}
