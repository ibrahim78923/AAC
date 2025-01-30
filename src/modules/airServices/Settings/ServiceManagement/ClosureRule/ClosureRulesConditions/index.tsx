import { Box } from '@mui/material';
import { IClosureRuleProps } from '../ClosureRule.interface';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';

export const ClosureRulesConditions = (props: IClosureRuleProps) => {
  const {
    closeIncident,
    closeIncidentData,
    resolveIncident,
    resolveIncidentData,
    serviceResolveIncident,
    serviceResolveData,
    serviceCloseIncident,
    serviceCloseData,
  } = props;

  const renderConditions = (condition: boolean | undefined, data: any[]) => {
    if (!condition || !data) return null;
    return data?.map((item: any) => (
      <CustomGrid md={item?.md} key={item?.id}>
        <item.component {...item?.componentProps} />
      </CustomGrid>
    ));
  };

  return (
    <Box mt={1}>
      <ContainerGrid spacing={0}>
        {renderConditions(closeIncident || false, closeIncidentData)}
      </ContainerGrid>
      <ContainerGrid spacing={0}>
        {renderConditions(resolveIncident || false, resolveIncidentData)}
      </ContainerGrid>
      <ContainerGrid spacing={0}>
        {renderConditions(serviceResolveIncident || false, serviceResolveData)}
      </ContainerGrid>
      <ContainerGrid spacing={0}>
        {renderConditions(serviceCloseIncident || false, serviceCloseData)}
      </ContainerGrid>
    </Box>
  );
};
