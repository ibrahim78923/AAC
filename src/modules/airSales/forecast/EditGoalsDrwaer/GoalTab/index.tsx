import { FormProvider } from '@/components/ReactHookForm';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { editGoalArray } from './GoalTab.data';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@/assets/icons';
import CommonModal from '@/components/CommonModal';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ARRAY_INDEX } from '@/constants/strings';

const GoalTab = ({
  getOneGoal,
  isLoading,
  submitHandler,
  setValue,
  methods,
}: any) => {
  const [isAddTargetModal, setIsAddTargetModal] = useState(false);
  const [targetValue, setTargetValue] = useState('');
  const theme = useTheme();

  useEffect(() => {
    if (getOneGoal?.data) {
      const { goalName, teamDetails, contributorDetails, duration, targets } =
        getOneGoal?.data;

      const teamNames = teamDetails.map((team) => team.name).join(', ');
      const userFullNames = contributorDetails
        ?.map((user) => `${user.firstName} ${user.lastName}`)
        .join(', ');
      setValue('name', goalName);
      setValue('user', teamNames || userFullNames);
      setValue('duration', duration);
      setValue(
        'dealPipelines',
        targets[ARRAY_INDEX?.ZERO]?.pipelines
          ?.map((pipeline: any) => pipeline?.name)
          .join(', '),
      );
      if (targets?.length > 0) {
        const targetMonths = targets[ARRAY_INDEX?.ZERO]?.months;
        Object?.keys(targetMonths)?.forEach((monthKey) => {
          setValue(monthKey, targetMonths[monthKey]);
        });
      }
    }
  }, [getOneGoal?.data]);

  const showMonth = getOneGoal?.data?.targets[0]?.months
    ? Object.keys(getOneGoal.data.targets[0].months)
    : [];

  const formFields = editGoalArray(showMonth);

  // Handle modal submit
  const handleModalSubmit = () => {
    const numericTargetValue = Number(targetValue);
    showMonth?.forEach((month) => {
      setValue(month, numericTargetValue);
    });
    setIsAddTargetModal(false);
  };

  return (
    <>
      {isLoading ? (
        <Box
          display={'flex'}
          alignItems={'center'}
          height={'70vh'}
          justifyContent={'center'}
        >
          {' '}
          <CircularProgress />{' '}
        </Box>
      ) : (
        <FormProvider methods={methods} onSubmit={submitHandler}>
          <Grid container spacing={1}>
            {formFields?.map((item: any, index: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                {item?.componentProps?.type === 'number' && (
                  <>
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <Typography variant="body2">
                          {' '}
                          {item?.componentProps?.text} {dayjs().year()}{' '}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body2"> £ </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <item.component {...item.componentProps} size={'small'}>
                          {' '}
                        </item.component>
                      </Grid>
                    </Grid>
                    <Divider />
                  </>
                )}
                {item?.componentProps?.type != 'number' && (
                  <item.component {...item.componentProps} size={'small'}>
                    {item?.componentProps?.select &&
                      item?.options?.map((option: any) => (
                        <option key={uuidv4()} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                  </item.component>
                )}

                {index === 3 && (
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    mt={2}
                    mb={2}
                  >
                    <Typography variant="body1" fontWeight={'600'}>
                      Target
                    </Typography>
                    <Box>
                      <Button
                        variant="contained"
                        className="small"
                        onClick={() => setIsAddTargetModal(true)}
                      >
                        Apply Target
                      </Button>
                      <Button
                        variant="outlined"
                        className="small"
                        sx={{
                          marginLeft: '10px',
                          border: `1px solid ${theme?.palette?.grey[0]}`,
                          color: theme?.palette?.custom?.main,
                        }}
                      >
                        <ArrowCircleLeftIcon /> &nbsp; {dayjs().year()} &nbsp;{' '}
                        <ArrowCircleRightIcon />
                      </Button>
                    </Box>
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      )}
      <CommonModal
        open={isAddTargetModal}
        handleClose={() => setIsAddTargetModal(false)}
        handleCancel={() => setIsAddTargetModal(false)}
        handleSubmit={handleModalSubmit}
        title="Apply this value to all targets in this row."
      >
        <Box>
          <Typography variant="body2" fontWeight={'500'}>
            Enter Amount
          </Typography>
          <TextField
            type="number"
            fullWidth
            placeholder=" £"
            sx={{
              '& input': {
                height: '12px',
              },
            }}
            value={targetValue}
            onChange={(e) => setTargetValue(e.target.value)}
          />
          <Box
            mt={2}
            display={'flex'}
            justifyContent={'end'}
            alignItems={'center'}
          >
            <Button
              variant="outlined"
              onClick={() => setIsAddTargetModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              onClick={handleModalSubmit}
              sx={{ marginLeft: '10px' }}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </CommonModal>
    </>
  );
};

export default GoalTab;
