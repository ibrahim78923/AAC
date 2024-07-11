import { Box, Typography } from '@mui/material';
import { CustomChart } from '@/components/Chart';
import { pieChartDataOptions, pieChartHeader } from './AgentAvailability.data';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_DASHBOARD_PERMISSIONS } from '@/constants/permission-keys';
import { useAgentAvailability } from './useAgentAvailability';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';

export const AgentAvailability = (props: any) => {
  const { data, isPreviewMode } = props;
  const { departmentDropdown, methods, theme, pieChartSeries } =
    useAgentAvailability(props);

  return (
    <Box
      borderRadius={3}
      p={2}
      border={`1px solid`}
      borderColor="custom.off_white"
      height="100%"
    >
      <>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          marginBottom={1.5}
          gap={1}
          flexWrap={'wrap'}
        >
          <Typography variant="h5">Agent Availability</Typography>
          <PermissionsGuard
            permissions={[AIR_SERVICES_DASHBOARD_PERMISSIONS?.VIEW_DASHBOARD]}
          >
            <FormProvider methods={methods}>
              <RHFAutocompleteAsync
                disabled={isPreviewMode}
                name="departmentId"
                size="small"
                sx={{
                  minWidth: 200,
                  '& .MuiInputBase-input': {
                    p: '0 0 0 8px !important',
                  },
                }}
                placeholder="All Departments"
                apiQuery={departmentDropdown}
              />
            </FormProvider>
          </PermissionsGuard>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          gap={1}
          flexWrap={'wrap'}
        >
          {pieChartHeader(theme, data?.agentAvailabilty?.data)?.map(
            (department) => (
              <Box key={department?.title}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {department?.icon}
                  <Typography variant="body3">{department?.title}</Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="h5">
                    {department?.titleNumber}
                  </Typography>
                </Box>
              </Box>
            ),
          )}
        </Box>
      </>
      <Box sx={{ marginTop: 2 }}>
        {
          <>
            {pieChartHeader(theme, data?.agentAvailabilty?.data).every(
              (department) => department?.titleNumber === 0,
            ) ? (
              <NoData
                image={NoAssociationFoundImage}
                message={'No data is available'}
                height={'100%'}
              />
            ) : (
              pieChartSeries?.length > 0 && (
                <CustomChart
                  options={{
                    ...pieChartDataOptions(theme),
                    legend: { show: false },
                  }}
                  series={pieChartSeries}
                  type="pie"
                  height={212}
                />
              )
            )}
          </>
        }
      </Box>
    </Box>
  );
};
