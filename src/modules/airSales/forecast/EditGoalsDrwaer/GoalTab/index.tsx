import { FormProvider } from '@/components/ReactHookForm';
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {
  editGoalArray,
  editGoalDefaultValues,
  editGoalValidationSchema,
} from './GoalTab.data';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from '@/assets/icons';
import CommonModal from '@/components/CommonModal';
import { useState } from 'react';

const GoalTab = () => {
  const [isAddTargetModal, setIsAddTargetModal] = useState(false);
  const theme = useTheme();
  const methods: any = useForm({
    resolver: yupResolver(editGoalValidationSchema),
    defaultValues: editGoalDefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async () => {};
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {editGoalArray?.map((item: any, index: any) => (
            <Grid item xs={12} md={item?.md} key={uuidv4()}>
              {item?.componentProps?.type === 'number' && (
                <>
                  <Grid container spacing={1}>
                    <Grid item xs={4}>
                      <Typography variant="body2"> Jan 2023 </Typography>
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
                      <ArrowCircleLeftIcon /> &nbsp; 2023 &nbsp;{' '}
                      <ArrowCircleRightIcon />
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      </FormProvider>

      <CommonModal
        open={isAddTargetModal}
        handleClose={() => setIsAddTargetModal(false)}
        handleCancel={() => setIsAddTargetModal(false)}
        handleSubmit={() => setIsAddTargetModal(false)}
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
              onClick={() => setIsAddTargetModal(false)}
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
