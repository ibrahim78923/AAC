import CommonDrawer from '@/components/CommonDrawer';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { WorkflowConditionData, testingData } from './TestWorkflowDrawer.data';

export const TestWorkflowDrawer = (props: any) => {
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
      okText={''}
      isOk={false}
    >
      <Grid container gap={2}>
        {testingData?.map((item: any) => (
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
            {item?.description?.map((list: any) => (
              <Typography key={list} component="li" variant="body2">
                {list}
              </Typography>
            ))}
          </Grid>
        ))}
        {WorkflowConditionData(testWorkflowResponse, watch)?.map(
          (item: any): any => (
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
              {item?.detail?.map((val: any) => (
                <Box key={val?._id}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p={1}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        p="10px 18px"
                        borderRadius={1.5}
                        color={palette?.common?.white}
                        bgcolor={val?.boxColor}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {val?.conditionNum}
                      </Box>
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
          ),
        )}
      </Grid>
    </CommonDrawer>
  );
};
