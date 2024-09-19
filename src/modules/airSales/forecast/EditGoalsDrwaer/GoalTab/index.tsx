import { FormProvider } from '@/components/ReactHookForm';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { editGoalArray } from './GoalTab.data';
import { createElement, useEffect } from 'react';
import dayjs from 'dayjs';
import { componentMap, dynamicFormInitialValue } from '@/utils/dynamic-forms';

const GoalTab = ({
  getOneGoal,
  isLoading,
  submitHandler,
  setValue,
  methods,
  form,
  getDynamicFieldsStatus,
}: any) => {
  useEffect(() => {
    const initialValues: any = dynamicFormInitialValue(getOneGoal?.data, form);

    if (initialValues) {
      Object.keys(initialValues).forEach((name) => {
        const value = initialValues[name];
        setValue(name, value);
      });
    }
    if (getOneGoal?.data) {
      const {
        goalName,
        teamDetails,
        collaboratorDetails,
        duration,
        pipelines,
        target,
      } = getOneGoal?.data;

      const teamNames = teamDetails?.map((team) => team.name).join(', ');
      const userFullNames = `${collaboratorDetails[0]?.firstName} ${collaboratorDetails[0]?.lastName}`;
      setValue('name', goalName);
      setValue('user', teamNames || userFullNames);
      setValue('duration', duration);
      setValue('target', target);
      setValue(
        'dealPipelines',
        pipelines?.map((pipeline: any) => pipeline?.name).join(', '),
      );
    }
  }, [getOneGoal?.data]);

  const formFields = editGoalArray();

  return (
    <>
      {isLoading ||
      getDynamicFieldsStatus?.isLoading ||
      getDynamicFieldsStatus?.isFetching ? (
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
            {formFields?.map((item: any) => (
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
              </Grid>
            ))}
            {form?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                {componentMap[item?.component] &&
                  createElement(componentMap[item?.component], {
                    ...item?.componentProps,
                    name: item?.componentProps?.label,
                    size: 'small',
                  })}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      )}
    </>
  );
};

export default GoalTab;
