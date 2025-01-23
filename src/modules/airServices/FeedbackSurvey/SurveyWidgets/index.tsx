import { useTheme } from '@mui/material';
import { SurveyCard } from '../SurveyCard';
import { surveyWidgetsData } from './SurveyWidgets.data';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const SurveyWidgets = (props: any) => {
  const { data } = props;
  const theme = useTheme();
  return (
    <CustomGrid isContainer>
      {surveyWidgetsData(data?.data?.surveyResponses, theme)?.map(
        (widget: any) => (
          <CustomGrid md={4} key={widget?.id}>
            <SurveyCard
              data={widget}
              hasSpinner={widget?.hasSpinner}
              hasStatusIcon={widget?.hasStatusIcon}
            />
          </CustomGrid>
        ),
      )}
    </CustomGrid>
  );
};
