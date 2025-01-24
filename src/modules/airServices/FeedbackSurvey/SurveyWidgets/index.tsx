import { useTheme } from '@mui/material';
import { SurveyCard } from '../SurveyCard';
import { surveyWidgetsData } from './SurveyWidgets.data';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

export const SurveyWidgets = (props: any) => {
  const { data } = props;
  const theme = useTheme();
  return (
    <ContainerGrid>
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
    </ContainerGrid>
  );
};
