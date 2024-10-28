import { Box, Typography } from '@mui/material';
import { CustomChart } from '@/components/Chart';
import { FormProvider } from '@/components/ReactHookForm';
import { useAgentAvailability } from './useAgentAvailability';
import NoData from '@/components/NoData';
import { DepartmentFieldDropdown } from '../DashboardFormFields/DepartmentsFieldDropdown';
import { pxToRem } from '@/utils/getFontValue';

export const AgentAvailability = (props: any) => {
  const { isPreviewMode } = props;
  const {
    methods,
    pieChartOptions,
    pieChartSeries,
    agentAvailabilityCount,
    onChangeHandler,
  } = useAgentAvailability(props);

  return (
    <Box
      borderRadius={3}
      border={`1px solid`}
      borderColor="custom.off_white_three"
      height="100%"
      overflow={'auto'}
    >
      <Box minWidth={pxToRem(300)}>
        <>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            gap={1}
            px={2}
            py={1}
            flexWrap={'wrap'}
            alignItems={'center'}
            borderBottom={`1px solid`}
            borderColor="custom.off_white_three"
          >
            <Typography variant="h5" color={'slateBlue.main'}>
              Agent Availability
            </Typography>
            <FormProvider methods={methods}>
              <DepartmentFieldDropdown
                disabled={isPreviewMode}
                onChangeHandler={onChangeHandler}
              />
            </FormProvider>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            gap={1}
            flexWrap={'wrap'}
            p={2}
          >
            {agentAvailabilityCount?.map((department) => (
              <Box key={department?.title}>
                <Box display="flex" alignItems="center" gap={1}>
                  {department?.icon}
                  <Typography variant="body3" color={'slateBlue.main'}>
                    {department?.title}
                  </Typography>
                </Box>
                <Typography variant="h4" color={'slateBlue.main'}>
                  {department?.count}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
        <Box p={2}>
          {!!pieChartSeries?.length ? (
            <CustomChart
              options={pieChartOptions}
              series={pieChartSeries}
              type="pie"
              height={212}
            />
          ) : (
            <NoData message={'No agent is available'} height={'100%'} />
          )}
        </Box>
      </Box>
    </Box>
  );
};
