import { Box, Typography } from '@mui/material';
import { CustomChart } from '@/components/Chart';
import { pieChartDataOptions, pieChartHeader } from './AgentAvailability.data';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { useAgentAvailability } from './useAgentAvailability';
import NoData from '@/components/NoData';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';
import { pxToRem } from '@/utils/getFontValue';

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
          gap={1}
          flexWrap={'wrap'}
          alignItems={'center'}
        >
          <Typography variant="h5" color={'slateBlue.main'}>
            Agent Availability
          </Typography>
          <FormProvider methods={methods}>
            <RHFAutocompleteAsync
              disabled={isPreviewMode}
              name="departmentId"
              size="small"
              sx={{
                minWidth: pxToRem(200),
                '.MuiInputBase-input': {
                  padding: `${pxToRem(2)} !important`,
                },
                '.MuiFormHelperText-root': {
                  display: 'none',
                },
                '& .MuiOutlinedInput-root ': {
                  height: pxToRem(36),
                },
              }}
              placeholder="All Departments"
              apiQuery={departmentDropdown}
            />
          </FormProvider>
        </Box>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          gap={1}
          flexWrap={'wrap'}
          my={2}
        >
          {pieChartHeader(theme, data?.agentAvailability?.data)?.map(
            (department) => (
              <Box key={department?.title}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {department?.icon}
                  <Typography variant="body3" color={'slateBlue.main'}>
                    {department?.title}
                  </Typography>
                </Box>
                <Typography variant="h4" color={'slateBlue.main'}>
                  {department?.titleNumber}
                </Typography>
              </Box>
            ),
          )}
        </Box>
      </>
      <Box>
        {pieChartHeader(theme, data?.agentAvailability?.data)?.every(
          (department) => department?.titleNumber === 0,
        ) ? (
          <NoData message={'No data is available'} height={'100%'} />
        ) : (
          pieChartSeries?.length > SELECTED_ARRAY_LENGTH?.ZERO && (
            <CustomChart
              options={{
                ...pieChartDataOptions(theme),
                labels: ['Available', 'Not Available'],
              }}
              series={pieChartSeries}
              type="pie"
              height={212}
            />
          )
        )}
      </Box>
    </Box>
  );
};
