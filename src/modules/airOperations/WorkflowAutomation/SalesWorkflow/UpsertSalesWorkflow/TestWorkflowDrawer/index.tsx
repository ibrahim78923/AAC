import CommonDrawer from '@/components/CommonDrawer';
import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import { WorkflowConditionData, testingData } from './TestWorkflowDrawer.data';
import { TestWorkflowDrawerProps } from './TestWorkflowDrawer.interface';

export const TestWorkflowDrawer = (props: TestWorkflowDrawerProps) => {
  const { isWorkflowDrawer, setIsWorkflowDrawer, testWorkflowResponse, watch } =
    props;
  const { palette } = useTheme();
  return (
    <CommonDrawer
      isDrawerOpen={isWorkflowDrawer}
      onClose={() => setIsWorkflowDrawer(false)}
      title="Test Result For Workflow"
      footer
      isCancel
      cancelText="Close"
      isOk={false}
    >
      <Grid container gap={2}>
        {testingData?.map((item) => (
          <Grid
            item
            key={item?.id}
            border={`1px solid ${palette?.grey?.[700]}`}
            p={1}
            borderRadius={2}
            xs={12}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Typography variant="h4" color="secondary.main">
                {item?.heading}
              </Typography>
            </Box>
            {item?.description?.map((list) => (
              <Typography key={list} component="li" variant="body2">
                {list}
              </Typography>
            ))}
          </Grid>
        ))}
        {WorkflowConditionData(testWorkflowResponse, watch)?.map((item) => (
          <Grid
            item
            xs={12}
            key={item?.id}
            border={`1px solid ${palette?.grey?.[700]}`}
            borderRadius={2}
          >
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={2}
              p={1}
              borderBottom={`1px solid ${palette?.grey?.[700]}`}
            >
              <item.icon sx={{ color: item?.color }} />
              <Typography variant="h4" color={item?.color}>
                {item?.heading}
              </Typography>
            </Box>
            {item?.detail?.map((val) => (
              <Box key={val?._id}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={1}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar variant="rounded" sx={{ bgcolor: val?.boxColor }}>
                      {val?.conditionNum}
                    </Avatar>
                    <Typography
                      color={val?.boxColor}
                      variant="body1"
                      fontWeight={600}
                    >
                      {val?.conditionDetail}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={val?.statusColor}
                  >
                    {val?.conditionStatus}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Grid>
        ))}
      </Grid>
    </CommonDrawer>
  );
};
