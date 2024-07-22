import { useRouter } from 'next/router';
import { useState } from 'react';
import Describe from './Describe';
import TeamDuration from './TeamDuration';
import Performance from './Performance';
import GoalsSettings from './GoalsSettings';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  goalDetailsDefaultValues,
  goalDetailsValidationSchema,
} from './Describe/Describe.data';
import { useDispatch } from 'react-redux';
import {
  setDescribeFormData,
  setTeamDurationFormData,
} from '@/redux/slices/forecast/forecastSlice';
import {
  teamDurationDefaultValues,
  teamDurationValidationSchema,
} from './TeamDuration/TeamDuration.data';
import { enqueueSnackbar } from 'notistack';
import { GOALS_YEARLY_FORMAT } from '@/constants';

export const useCreateGoal = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [tableRowValues, setTableRowValues] = useState([]);
  const dispatch = useDispatch();

  const router: any = useRouter();
  const hanldeGoBack = () => {
    router?.back();
  };

  // this is describe step
  const describeScratchMethods: any = useForm({
    resolver: yupResolver(goalDetailsValidationSchema),
    defaultValues: goalDetailsDefaultValues,
  });

  const { handleSubmit: describeScratchHandleSubmit } = describeScratchMethods;

  const onSubmitDescribeScratch = async (values: any) => {
    dispatch(setDescribeFormData(values));
    setActiveStep((prev: any) => prev + 1);
  };

  const handleDescribeForm = describeScratchHandleSubmit(
    onSubmitDescribeScratch,
  );
  // this is describe step

  // this is team & duration step
  const teamDurationMethods: any = useForm({
    resolver: yupResolver(teamDurationValidationSchema),
    defaultValues: teamDurationDefaultValues,
  });

  const { handleSubmit: teamDurationHandleSubmit, watch: watchRadioValue } =
    teamDurationMethods;
  const onSubmitTeamDuration = async (values: any) => {
    if (values?.duration === GOALS_YEARLY_FORMAT?.CUSTOM) {
      if (values?.to === undefined || values?.from === undefined) {
        enqueueSnackbar('Please enter date', { variant: 'error' });
        return;
      }
    }
    dispatch(setTeamDurationFormData(values));
    setActiveStep((prev: any) => prev + 1);
  };
  const userTeamValue = watchRadioValue('userTeam');
  const customDateValue = watchRadioValue('duration');

  const handleTeamDurationForm = teamDurationHandleSubmit(onSubmitTeamDuration);
  // this is team & duration step

  const handleNextStep = () => {
    if (activeStep === 0) {
      handleDescribeForm();
    } else if (activeStep === 1) {
      handleTeamDurationForm();
    } else if (activeStep === 2) {
      setActiveStep((prev: any) => prev + 1);
    } else {
      router?.back();
    }
  };

  const handleStepBack = () => {
    if (activeStep === 0) {
      router?.back();
    } else {
      setActiveStep((prev: any) => prev - 1);
    }
  };
  const createGoalsSteps = [
    {
      key: 'describe',
      label: 'Describe',
      component: (
        <>
          {' '}
          <Describe
            methods={describeScratchMethods}
            handleSubmit={handleDescribeForm}
          />
        </>
      ),
    },
    {
      key: 'TeamDuration',
      label: 'Team & Duration',
      component: (
        <TeamDuration
          methods={teamDurationMethods}
          handleSubmit={handleTeamDurationForm}
          userTeamValue={userTeamValue}
          customDateValue={customDateValue}
        />
      ),
    },
    {
      key: 'performance',
      label: 'Performance',
      component: (
        <Performance
          tableRowValues={tableRowValues}
          setTableRowValues={setTableRowValues}
        />
      ),
    },
    {
      key: 'settings',
      label: 'Settings',
      component: <GoalsSettings />,
    },
  ];

  return {
    hanldeGoBack,
    createGoalsSteps,
    activeStep,
    handleNextStep,
    handleStepBack,
  };
};
