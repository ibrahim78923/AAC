import { Box, Typography } from '@mui/material';
import {
  cardRelatedData,
  serviceWorkflowsCardData,
} from './ServicesWorkflow.data';
import { useServiceWorkflow } from './useServiceWorkflow';
import { AIR_OPERATIONS } from '@/constants/routes';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';

export const ServicesWorkflow = () => {
  const { theme, router, activeItem, handleItemClick } = useServiceWorkflow();
  return (
    <>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'grey.700',
          boxShadow: 1,
          p: 2,
        }}
      >
        <PageTitledHeader
          moveBack={() => {
            router?.push({
              pathname: AIR_OPERATIONS?.WORKFLOW_AUTOMATION,
            });
          }}
          title="Services Workflow"
          canMovedBack
        />
        <ContainerGrid
          customStyles={{
            justifyContent: 'center',
          }}
        >
          {serviceWorkflowsCardData?.map((item) => {
            return (
              <CustomGrid key={item?.id} xl={3.7} md={5.5}>
                <Box
                  sx={{
                    px: 2,
                    py: 3,
                    cursor: 'pointer',
                    boxShadow: `${theme?.palette?.custom.off_white_three} 0px 8px 24px`,
                    borderRadius: 2,
                    height: '100%',
                    textAlign: 'center',
                    backgroundColor:
                      activeItem === item?.id ? 'primary.light' : 'inherit',
                    '&:hover': {
                      boxShadow: `0 0 6px 0 ${theme?.palette?.warning?.light}`,
                    },
                  }}
                  onClick={() => handleItemClick?.(item?.id, item?.title)}
                >
                  <Typography variant="h5" color="slateBlue.main" my={1}>
                    {item?.title}
                  </Typography>
                  <Typography color="slateBlue.main">
                    {item?.description}
                  </Typography>
                </Box>
              </CustomGrid>
            );
          })}
        </ContainerGrid>
      </Box>
      <Box mt={2}>{cardRelatedData[activeItem]}</Box>
    </>
  );
};
